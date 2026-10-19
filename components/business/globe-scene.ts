import * as THREE from "three";

/** Output of scripts/build-globe-dots.mjs. */
export type GlobeDots = {
  step: number;
  codes: string[];
  /** Flat [lat, lng, codeIndex, …] list. */
  dots: number[];
};

export type GlobeHover = { code: string; x: number; y: number } | null;

type GlobeOptions = {
  /** ISO codes whose dots light up and respond to hover. */
  highlighted: Set<string>;
  /** Pairs of ISO codes joined by an animated payment arc. */
  arcs: [string, string][];
  onHover: (hover: GlobeHover) => void;
  onReady: () => void;
  /** "cap" shows the top of a large globe; "full" fits the whole sphere. */
  framing?: GlobeFraming;
};

export type GlobeFraming = "cap" | "full";

// Cap framing: share of the globe's radius that shows above the container's
// bottom edge. The container's height sets the globe's size: radius = height / VISIBLE.
export const VISIBLE = 0.62;
// Gap above the globe, as a share of its radius, so the glow isn't cut off.
export const TOP_PAD = 0.06;
// The rendered frame is a square of this many radii, centred on the globe.
const FRAME = 2.4;
const FOV = 30;

// Full framing: the sphere's radius against half the container's shorter
// side, leaving room for the atmosphere glow (1.14 radii).
const FULL_FIT = 1.18;

// Latitude and longitude turned towards the viewer at rest: Africa. The cap
// tilts back so Europe sits on the visible top; the full sphere needs less.
const FACE_LAT: Record<GlobeFraming, number> = { cap: -22, full: 5 };
const FACE_LNG = 10;

const AUTO_SPIN = 0.045; // rad/s
const DRAG_SPIN = 0.005; // rad per px
const FRICTION = 3.5; // per second

const COLORS = {
  land: new THREE.Color("#2f66dc"),
  supported: new THREE.Color("#5fd0ff"),
  hover: new THREE.Color("#ffffff"),
  bodyCore: new THREE.Color("#03070f"),
  bodyRim: new THREE.Color("#0c2a6b"),
  atmosphere: new THREE.Color("#1f6fff"),
  arc: new THREE.Color("#8ecbee"),
};

const toRad = (deg: number) => (deg * Math.PI) / 180;

function toVector(lat: number, lng: number, radius = 1) {
  const phi = toRad(lat);
  const lambda = toRad(lng);
  return new THREE.Vector3(
    radius * Math.cos(phi) * Math.sin(lambda),
    radius * Math.sin(phi),
    radius * Math.cos(phi) * Math.cos(lambda),
  );
}

const DOT_VERTEX = /* glsl */ `
  attribute float aSupported;
  attribute float aCode;
  uniform float uSize;
  uniform float uHover;
  uniform vec3 uLand;
  uniform vec3 uSupported;
  uniform vec3 uHoverColor;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vSupported;

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    float facing = dot(normalize(world.xyz), normalize(cameraPosition - world.xyz));
    float hovered = aSupported * (1.0 - step(0.5, abs(aCode - uHover)));

    gl_Position = projectionMatrix * viewMatrix * world;
    // Supported dots get a bigger sprite to make room for their glow.
    gl_PointSize = facing < 0.0 ? 0.0 : uSize * mix(1.0, 3.0, aSupported) * (1.0 + hovered * 0.2);

    vColor = mix(mix(uLand, uSupported, aSupported), uHoverColor, hovered);
    vAlpha = smoothstep(0.0, 0.3, facing) * mix(0.7, 1.0, aSupported);
    vSupported = aSupported;
  }
`;

const DOT_FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vSupported;

  void main() {
    vec2 p = gl_PointCoord - 0.5;
    // Rounded square core, shrunk inside the larger supported sprite.
    float edge = mix(0.42, 0.19, vSupported);
    float box = max(abs(p.x), abs(p.y));
    float core = 1.0 - smoothstep(edge - 0.06, edge, box);
    float glow = vSupported * pow(max(0.0, 1.0 - length(p) * 2.0), 1.6) * 0.7;
    float alpha = max(core, glow) * vAlpha;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

const BODY_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const BODY_FRAGMENT = /* glsl */ `
  uniform vec3 uCore;
  uniform vec3 uRim;
  varying vec3 vNormal;
  void main() {
    float rim = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 2.4);
    gl_FragColor = vec4(mix(uCore, uRim, rim), 1.0);
  }
`;

const ATMOSPHERE_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  void main() {
    // Back faces of a larger shell: brightest just outside the globe's edge,
    // fading to nothing at the shell's own silhouette.
    float glow = pow(clamp(-dot(vNormal, vec3(0.0, 0.0, 1.0)) / 0.48, 0.0, 1.0), 2.5);
    gl_FragColor = vec4(uColor, glow * 0.85);
  }
`;

const ARC_VERTEX = /* glsl */ `
  varying float vT;
  void main() {
    vT = uv.x;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ARC_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uHead;
  varying float vT;
  void main() {
    // A comet: bright head at uHead, tail fading out behind it, and a faint
    // trace of the whole route.
    float tail = smoothstep(uHead - 0.35, uHead, vT) * step(vT, uHead);
    float alpha = max(tail, 0.07);
    gl_FragColor = vec4(mix(uColor, vec3(1.0), tail * tail), alpha);
  }
`;

export function createGlobeScene(
  container: HTMLElement,
  data: GlobeDots,
  { highlighted, arcs, onHover, onReady, framing = "cap" }: GlobeOptions,
) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.display = "block";
  canvas.style.touchAction = "pan-y";
  canvas.style.cursor = "grab";
  canvas.setAttribute("aria-hidden", "true");
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
  // Distance at which the globe's silhouette spans 2 / FRAME of the frame.
  const distance = 1 / Math.sin(Math.atan(Math.tan(toRad(FOV / 2)) * (2 / FRAME)));
  camera.position.set(0, 0, distance);

  // tilt turns FACE_LAT to the front; spin turns the globe on its own axis.
  const tilt = new THREE.Group();
  tilt.rotation.x = toRad(FACE_LAT[framing]);
  const spin = new THREE.Group();
  spin.rotation.y = -toRad(FACE_LNG);
  tilt.add(spin);
  scene.add(tilt);

  // Globe body hides the dots on the far side.
  const bodyMaterial = new THREE.ShaderMaterial({
    vertexShader: BODY_VERTEX,
    fragmentShader: BODY_FRAGMENT,
    uniforms: { uCore: { value: COLORS.bodyCore }, uRim: { value: COLORS.bodyRim } },
  });
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.995, 96, 96), bodyMaterial);
  spin.add(body);

  const atmosphereMaterial = new THREE.ShaderMaterial({
    vertexShader: BODY_VERTEX,
    fragmentShader: ATMOSPHERE_FRAGMENT,
    uniforms: { uColor: { value: COLORS.atmosphere } },
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
  });
  const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(1.14, 64, 64), atmosphereMaterial);
  scene.add(atmosphere);

  // Dots
  const count = data.dots.length / 3;
  const positions = new Float32Array(count * 3);
  const supported = new Float32Array(count);
  const codeIndex = new Float32Array(count);
  const centroids = new Map<string, THREE.Vector3>();
  // Dots bucketed by whole degree, for hover lookups.
  const buckets = new Map<string, number[]>();

  for (let i = 0; i < count; i++) {
    const lat = data.dots[i * 3];
    const lng = data.dots[i * 3 + 1];
    const index = data.dots[i * 3 + 2];
    const code = data.codes[index];
    const v = toVector(lat, lng, 1.001);
    v.toArray(positions, i * 3);
    supported[i] = highlighted.has(code) ? 1 : 0;
    codeIndex[i] = index;

    const sum = centroids.get(code) ?? new THREE.Vector3();
    centroids.set(code, sum.add(v));

    const key = `${Math.floor(lat)},${Math.floor(lng)}`;
    const bucket = buckets.get(key) ?? [];
    bucket.push(i);
    buckets.set(key, bucket);
  }

  const dotGeometry = new THREE.BufferGeometry();
  dotGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  dotGeometry.setAttribute("aSupported", new THREE.BufferAttribute(supported, 1));
  dotGeometry.setAttribute("aCode", new THREE.BufferAttribute(codeIndex, 1));
  const dotMaterial = new THREE.ShaderMaterial({
    vertexShader: DOT_VERTEX,
    fragmentShader: DOT_FRAGMENT,
    uniforms: {
      uSize: { value: 3 },
      uHover: { value: -1 },
      uLand: { value: COLORS.land },
      uSupported: { value: COLORS.supported },
      uHoverColor: { value: COLORS.hover },
    },
    transparent: true,
    depthWrite: false,
  });
  spin.add(new THREE.Points(dotGeometry, dotMaterial));

  // Arcs between supported countries
  const arcMaterials: THREE.ShaderMaterial[] = [];
  const arcGeometries: THREE.BufferGeometry[] = [];
  arcs.forEach(([from, to]) => {
    const a = centroids.get(from)?.clone().normalize();
    const b = centroids.get(to)?.clone().normalize();
    if (!a || !b) return;
    const angle = a.angleTo(b);
    const lift = 0.015 + angle * 0.05;
    const points = Array.from({ length: 48 }, (_, i) => {
      const t = i / 47;
      // Slerp along the great circle, raised off the surface in the middle.
      const p = a.clone().multiplyScalar(Math.sin((1 - t) * angle))
        .add(b.clone().multiplyScalar(Math.sin(t * angle)))
        .divideScalar(Math.sin(angle));
      return p.multiplyScalar(1 + Math.sin(Math.PI * t) * lift);
    });
    const geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 64, 0.0035, 6, false);
    const material = new THREE.ShaderMaterial({
      vertexShader: ARC_VERTEX,
      fragmentShader: ARC_FRAGMENT,
      uniforms: { uColor: { value: COLORS.arc }, uHead: { value: 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    arcGeometries.push(geometry);
    arcMaterials.push(material);
    spin.add(new THREE.Mesh(geometry, material));
  });

  // Layout: the container shows the top cap of a globe sized by its height.
  let width = 0;
  let height = 0;
  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    const radius = framing === "full" ? Math.min(width, height) / 2 / FULL_FIT : height / VISIBLE;
    const frame = radius * FRAME;
    const offsetY = framing === "full" ? frame / 2 - height / 2 : frame / 2 - radius - radius * TOP_PAD;
    renderer.setSize(width, height, false);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    camera.setViewOffset(frame, frame, frame / 2 - width / 2, offsetY, width, height);
    camera.updateProjectionMatrix();
    dotMaterial.uniforms.uSize.value = Math.max(2, (radius / 800) * 3.2) * renderer.getPixelRatio();
  }
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  // Hover and tap
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const local = new THREE.Vector3();
  const hitSphere = new THREE.Sphere(new THREE.Vector3(), 1);
  let hoverCode: string | null = null;

  function countryAt(clientX: number, clientY: number) {
    const rect = canvas.getBoundingClientRect();
    pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    if (!raycaster.ray.intersectSphere(hitSphere, local)) return null;
    spin.worldToLocal(local);
    const lat = (Math.asin(THREE.MathUtils.clamp(local.y, -1, 1)) * 180) / Math.PI;
    const lng = (Math.atan2(local.x, local.z) * 180) / Math.PI;

    let best = -1;
    let bestDistance = (data.step * 1.4) ** 2;
    for (let dLat = -1; dLat <= 1; dLat++) {
      for (let dLng = -1; dLng <= 1; dLng++) {
        const bucket = buckets.get(`${Math.floor(lat) + dLat},${Math.floor(lng) + dLng}`);
        for (const i of bucket ?? []) {
          const dy = data.dots[i * 3] - lat;
          const dx = (data.dots[i * 3 + 1] - lng) * Math.cos(toRad(lat));
          const d = dx * dx + dy * dy;
          if (d < bestDistance) {
            bestDistance = d;
            best = i;
          }
        }
      }
    }
    if (best < 0 || !supported[best]) return null;
    return data.codes[data.dots[best * 3 + 2]];
  }

  function setHover(code: string | null, clientX = 0, clientY = 0) {
    if (code !== hoverCode) {
      hoverCode = code;
      dotMaterial.uniforms.uHover.value = code ? data.codes.indexOf(code) : -1;
    }
    const rect = container.getBoundingClientRect();
    onHover(code ? { code, x: clientX - rect.left, y: clientY - rect.top } : null);
  }

  // Drag to spin, with inertia
  let dragging = false;
  let dragMoved = false;
  let lastX = 0;
  let velocity = 0;

  function onPointerDown(event: PointerEvent) {
    dragging = true;
    dragMoved = false;
    lastX = event.clientX;
    velocity = 0;
    canvas.setPointerCapture(event.pointerId);
    canvas.style.cursor = "grabbing";
  }

  function onPointerMove(event: PointerEvent) {
    if (dragging) {
      const dx = event.clientX - lastX;
      lastX = event.clientX;
      if (Math.abs(dx) > 0) dragMoved = true;
      spin.rotation.y += dx * DRAG_SPIN;
      velocity = (dx * DRAG_SPIN) / (1 / 60);
      if (dragMoved) setHover(null);
      return;
    }
    if (event.pointerType !== "mouse") return;
    const code = countryAt(event.clientX, event.clientY);
    canvas.style.cursor = code ? "pointer" : "grab";
    setHover(code, event.clientX, event.clientY);
  }

  function onPointerUp(event: PointerEvent) {
    if (!dragging) return;
    dragging = false;
    canvas.style.cursor = "grab";
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    // A tap (no drag) shows the country under the finger, or clears it.
    if (!dragMoved) setHover(countryAt(event.clientX, event.clientY), event.clientX, event.clientY);
  }

  function onPointerLeave(event: PointerEvent) {
    if (event.pointerType === "mouse" && !dragging) {
      canvas.style.cursor = "grab";
      setHover(null);
    }
  }

  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerUp);
  canvas.addEventListener("pointerleave", onPointerLeave);

  // Render loop: runs only while the globe is on screen and the tab is visible.
  let lastTime = performance.now();
  let frameId = 0;
  let onScreen = true;
  let firstFrame = true;
  let elapsed = 0;

  function tick() {
    frameId = 0;
    const now = performance.now();
    const delta = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;
    elapsed += delta;

    if (!dragging) {
      if (Math.abs(velocity) > 0.001) {
        spin.rotation.y += velocity * delta;
        velocity *= Math.exp(-FRICTION * delta);
      } else if (!hoverCode) {
        spin.rotation.y += AUTO_SPIN * delta;
      }
    }

    arcMaterials.forEach((material, i) => {
      // Each arc fires in turn, with a pause before it repeats.
      const cycle = (elapsed / 3.2 + i / arcMaterials.length) % 1;
      material.uniforms.uHead.value = cycle * 1.8;
    });

    renderer.render(scene, camera);
    if (firstFrame) {
      firstFrame = false;
      onReady();
    }
    schedule();
  }

  function schedule() {
    if (!frameId && onScreen && !document.hidden) frameId = requestAnimationFrame(tick);
  }

  function pause() {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
  }

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (onScreen) {
      lastTime = performance.now();
      schedule();
    } else {
      pause();
    }
  });
  visibilityObserver.observe(container);

  function onVisibilityChange() {
    if (document.hidden) {
      pause();
    } else {
      lastTime = performance.now();
      schedule();
    }
  }
  document.addEventListener("visibilitychange", onVisibilityChange);

  schedule();

  return {
    dispose() {
      pause();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      dotGeometry.dispose();
      dotMaterial.dispose();
      body.geometry.dispose();
      bodyMaterial.dispose();
      atmosphere.geometry.dispose();
      atmosphereMaterial.dispose();
      arcGeometries.forEach((geometry) => geometry.dispose());
      arcMaterials.forEach((material) => material.dispose());
      renderer.dispose();
      canvas.remove();
    },
  };
}
