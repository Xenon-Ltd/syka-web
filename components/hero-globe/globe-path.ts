export type Vec3 = readonly [number, number, number];

/** A latitude ring or a meridian (a great circle through both poles). */
export type GlobeLine = { kind: "lat" | "lon"; degrees: number };

export const GLOBE_LINES: readonly GlobeLine[] = [
  ...[-50, -25, 0, 25, 50].map((degrees): GlobeLine => ({ kind: "lat", degrees })),
  ...[0, 36, 72, 108, 144].map((degrees): GlobeLine => ({ kind: "lon", degrees })),
];

/** The north pole leans toward the viewer by this angle, in radians, so rings read as ellipses. */
export const GLOBE_TILT = 0.32;

const TAU = Math.PI * 2;
const toRad = (degrees: number) => (degrees * Math.PI) / 180;

function tilt([x, y, z]: Vec3): Vec3 {
  const cos = Math.cos(GLOBE_TILT);
  const sin = Math.sin(GLOBE_TILT);
  return [x, y * cos - z * sin, y * sin + z * cos];
}

/** Position on the unit sphere, after the tilt, for angle `u` along the line. */
export function pointOnLine(line: GlobeLine, u: number): Vec3 {
  const angle = toRad(line.degrees);
  if (line.kind === "lat") {
    return tilt([Math.cos(angle) * Math.sin(u), Math.sin(angle), Math.cos(angle) * Math.cos(u)]);
  }
  return tilt([Math.sin(u) * Math.sin(angle), Math.cos(u), Math.sin(u) * Math.cos(angle)]);
}

/** Half-width, half-height and half-depth of the globe. Unequal values give an ellipsoid. */
export type Radii = { x: number; y: number; z: number };

export type LineRun = { front: boolean; points: Vec3[] };

/**
 * Splits a line into runs on the near and far side of the globe, so each side
 * can draw behind or in front of the phones. Neighbouring runs share the exact
 * point where the line crosses the middle, so the line has no gap.
 */
export function lineRuns(line: GlobeLine, radii: Radii, segments = 96): LineRun[] {
  const runs: LineRun[] = [];
  let previous: Vec3 | null = null;

  for (let i = 0; i <= segments; i++) {
    const unit = pointOnLine(line, (i / segments) * TAU);
    const point: Vec3 = [unit[0] * radii.x, unit[1] * radii.y, unit[2] * radii.z];
    const front = point[2] >= 0;
    let run = runs[runs.length - 1];

    if (!run || run.front !== front) {
      const next: LineRun = { front, points: [] };
      if (previous && run) {
        const t = previous[2] / (previous[2] - point[2]);
        const crossing: Vec3 = [
          previous[0] + (point[0] - previous[0]) * t,
          previous[1] + (point[1] - previous[1]) * t,
          0,
        ];
        run.points.push(crossing);
        next.points.push(crossing);
      }
      runs.push(next);
      run = next;
    }

    run.points.push(point);
    previous = point;
  }

  return runs;
}

/** 0 at the back of the globe, 1 at the front. `radiusZ` is the globe's half-depth. */
export function depthOf(z: number, radiusZ: number): number {
  return (z / radiusZ + 1) / 2;
}

export type FlagMotion = { line: number; u: number; speed: number };

const MIN_SPEED = 0.1;
const SPEED_RANGE = 0.2;

/** A random start on a random line, in a random direction, at a random speed (radians per second). */
export function randomFlagMotion(random: () => number = Math.random): FlagMotion {
  const direction = random() < 0.5 ? -1 : 1;
  return {
    line: Math.floor(random() * GLOBE_LINES.length) % GLOBE_LINES.length,
    u: random() * TAU,
    speed: direction * (MIN_SPEED + random() * SPEED_RANGE),
  };
}

/** Moves `u` along the line. A step below zero would run the motion backwards, so it counts as zero. */
export function advance(u: number, speed: number, seconds: number): number {
  const next = u + speed * Math.max(0, seconds);
  return ((next % TAU) + TAU) % TAU;
}
