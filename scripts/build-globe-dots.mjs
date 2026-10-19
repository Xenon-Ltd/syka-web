// Builds public/globe/dots.json for the business hero globe.
//
// Lays an evenly spaced grid of dots over the world and keeps the ones that
// fall on land, tagging each with its country's ISO 3166-1 alpha-2 code. The
// browser only draws the result, so it never does point-in-polygon work.
//
// Usage: node scripts/build-globe-dots.mjs [path-or-url-to-countries.geojson]
// Defaults to Natural Earth 1:50m admin-0 countries.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SOURCE =
  process.argv[2] ??
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson";
const OUT = path.join(process.cwd(), "public/globe/dots.json");

// Degrees between rows of dots. Each row spaces its dots by the same ground
// distance, so dots don't bunch up towards the poles.
const STEP = 0.9;

async function loadGeoJson(source) {
  if (/^https?:/.test(source)) {
    const res = await fetch(source);
    if (!res.ok) throw new Error(`Failed to fetch ${source}: ${res.status}`);
    return res.json();
  }
  return JSON.parse(await readFile(source, "utf8"));
}

// Natural Earth marks France and Norway as -99 in ISO_A2; ISO_A2_EH fixes them.
function isoCode(props) {
  for (const key of ["ISO_A2_EH", "ISO_A2", "WB_A2"]) {
    const code = props[key];
    if (code && code !== "-99") return code;
  }
  return null;
}

function polygonsOf(geometry) {
  if (geometry.type === "Polygon") return [geometry.coordinates];
  if (geometry.type === "MultiPolygon") return geometry.coordinates;
  return [];
}

function bboxOf(polygon) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of polygon[0]) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return [minX, minY, maxX, maxY];
}

// Even-odd ray casting across the outer ring and its holes.
function contains(polygon, x, y) {
  let inside = false;
  for (const ring of polygon) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
        inside = !inside;
      }
    }
  }
  return inside;
}

const round1 = (n) => Math.round(n * 10) / 10;

const geo = await loadGeoJson(SOURCE);

const shapes = [];
const labelPoints = new Map();
for (const feature of geo.features) {
  const code = isoCode(feature.properties);
  if (!code) continue;
  const { LABEL_X, LABEL_Y } = feature.properties;
  if (LABEL_X != null && LABEL_Y != null) labelPoints.set(code, [LABEL_Y, LABEL_X]);
  for (const polygon of polygonsOf(feature.geometry)) {
    shapes.push({ code, polygon, bbox: bboxOf(polygon) });
  }
}

const codes = [];
const codeIndex = new Map();
const indexFor = (code) => {
  if (!codeIndex.has(code)) {
    codeIndex.set(code, codes.length);
    codes.push(code);
  }
  return codeIndex.get(code);
};

const dots = [];
const seen = new Set();

for (let lat = -90 + STEP / 2; lat < 90; lat += STEP) {
  const lngStep = STEP / Math.max(Math.cos((lat * Math.PI) / 180), 0.01);
  const count = Math.max(1, Math.floor(360 / lngStep));
  for (let i = 0; i < count; i++) {
    const lng = -180 + (i + 0.5) * (360 / count);
    for (const { code, polygon, bbox } of shapes) {
      if (lng < bbox[0] || lng > bbox[2] || lat < bbox[1] || lat > bbox[3]) continue;
      if (contains(polygon, lng, lat)) {
        dots.push(round1(lat), round1(lng), indexFor(code));
        seen.add(code);
        break;
      }
    }
  }
}

// Countries too small to catch a grid dot (Malta, Luxembourg, …) still get one
// at their label point, so they can light up and be hovered.
for (const [code, [lat, lng]] of labelPoints) {
  if (seen.has(code)) continue;
  dots.push(round1(lat), round1(lng), indexFor(code));
}

await mkdir(path.dirname(OUT), { recursive: true });
// dots is a flat [lat, lng, codeIndex, …] list; codes maps codeIndex to ISO.
await writeFile(OUT, JSON.stringify({ step: STEP, codes, dots }));
console.log(`Wrote ${dots.length / 3} dots across ${codes.length} countries to ${OUT}`);
