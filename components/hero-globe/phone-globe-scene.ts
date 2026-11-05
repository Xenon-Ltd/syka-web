import * as THREE from "three";
import {
  advance,
  depthOf,
  GLOBE_LINES,
  lineRuns,
  pointOnLine,
  randomFlagMotion,
  type FlagMotion,
  type Radii,
} from "./globe-path";
import { GLOBE_DEPTH, GLOBE_MARGIN, NARROW_LIFT, PAIR_HEIGHT, PHONE_IMAGE_ASPECT, PHONE_PAIR } from "./phone-layout";

export type GlobeFlag = { code: string; icon: string };

type SceneOptions = {
  flags: GlobeFlag[];
  phones: { home: string; transfer: string };
  /** Draw one still frame instead of animating. */
  reduced: boolean;
  /** Moved next to the flag under the pointer; the caller shows and hides it. */
  label: HTMLElement | null;
  onHover: (code: string | null) => void;
  onReady: () => void;
};

type Flag = {
  code: string;
  sprite: THREE.Sprite;
  material: THREE.SpriteMaterial;
  motion: FlagMotion;
  wobble: number;
  size: number;
};

const VIEW_H = 10; // world units shown top to bottom
const FOV = 30;
const FEW_FLAGS = 8; // on small stages
const SMALL_STAGE_PX = 520;

// Back lines and flags draw first, then the phones, then the near side.
const ORDER = { back: 1, home: 2, transfer: 3, frontLine: 4, frontFlag: 5 } as const;

const PARALLAX = 0.18;
const PHONE_TURN = { x: 0.09, y: 0.16 };
const HOVER_SLOW = 0.1;
const HOVER_GROW = 1.3;

function circleTexture(image: HTMLImageElement) {
  const size = 192;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const radius = size / 2 - 10;

  ctx.shadowColor = "rgba(37, 32, 92, 0.3)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 3;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, radius + 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowColor = "transparent";
  ctx.save();
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(image, size / 2 - radius, size / 2 - radius, radius * 2, radius * 2);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/**
 * Two app screens inside a wireframe globe. Country circles travel along the
 * globe's lines, passing behind and in front of the phones.
 */
export function createPhoneGlobeScene(
  container: HTMLElement,
  { flags, phones, reduced, label, onHover, onReady }: SceneOptions,
) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.setAttribute("aria-hidden", "true");
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
  camera.position.set(0, 0, VIEW_H / 2 / Math.tan(THREE.MathUtils.degToRad(FOV / 2)));

  const globe = new THREE.Group();
  const pair = new THREE.Group();
  globe.add(pair);
  scene.add(globe);

  let disposed = false;
  const disposables: { dispose(): void }[] = [];
  const track = <T extends { dispose(): void }>(item: T) => {
    disposables.push(item);
    return item;
  };

  /* Phones */
  const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
  const loader = new THREE.TextureLoader();
  let phonesLoaded = 0;

  function addPhone(url: string, order: number) {
    const material = track(
      new THREE.MeshBasicMaterial({ transparent: true, depthTest: false, depthWrite: false, toneMapped: false }),
    );
    const mesh = new THREE.Mesh(track(new THREE.PlaneGeometry(1, 1)), material);
    mesh.renderOrder = order;
    pair.add(mesh);
    loader.load(url, (texture) => {
      if (disposed) {
        texture.dispose();
        return;
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(8, maxAnisotropy);
      track(texture);
      material.map = texture;
      material.needsUpdate = true;
      phonesLoaded += 1;
      if (phonesLoaded === 2) onReady();
      if (reduced) render(0);
    });
    return mesh;
  }
  const home = addPhone(phones.home, ORDER.home);
  const transfer = addPhone(phones.transfer, ORDER.transfer);

  /* Globe lines */
  const backLine = track(
    new THREE.LineBasicMaterial({ color: 0x1377bc, transparent: true, opacity: 0.12, depthTest: false, depthWrite: false }),
  );
  const frontLine = track(
    new THREE.LineBasicMaterial({ color: 0x1377bc, transparent: true, opacity: 0.32, depthTest: false, depthWrite: false }),
  );
  let lineObjects: THREE.Line[] = [];

  function buildLines(radii: Radii) {
    for (const line of lineObjects) {
      globe.remove(line);
      line.geometry.dispose();
    }
    lineObjects = [];
    for (const line of GLOBE_LINES) {
      for (const run of lineRuns(line, radii)) {
        const geometry = new THREE.BufferGeometry().setFromPoints(run.points.map((p) => new THREE.Vector3(...p)));
        const object = new THREE.Line(geometry, run.front ? frontLine : backLine);
        object.renderOrder = run.front ? ORDER.frontLine : ORDER.back;
        globe.add(object);
        lineObjects.push(object);
      }
    }
  }

  /* Country circles */
  const visible = container.clientWidth < SMALL_STAGE_PX ? flags.slice(0, FEW_FLAGS) : flags;
  const circles: Flag[] = visible.map(({ code, icon }) => {
    const material = track(new THREE.SpriteMaterial({ transparent: true, depthTest: false, depthWrite: false }));
    const sprite = new THREE.Sprite(material);
    sprite.userData.code = code;
    globe.add(sprite);

    const image = new Image();
    image.onload = () => {
      if (disposed) return;
      const texture = circleTexture(image);
      if (!texture) return;
      track(texture);
      material.map = texture;
      material.needsUpdate = true;
      if (reduced) render(0);
    };
    image.src = icon;

    return { code, sprite, material, motion: randomFlagMotion(), wobble: Math.random() * Math.PI * 2, size: 1 };
  });
  const sprites = circles.map((flag) => flag.sprite);

  /* Layout */
  const layout = { radii: { x: 3.6, y: 4.4, z: 3.2 }, flagSize: 0.6, centerY: 0 };

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const viewW = VIEW_H * camera.aspect;
    const narrow = camera.aspect < 1;
    const boxH = VIEW_H * (narrow ? PAIR_HEIGHT.narrow : PAIR_HEIGHT.wide);
    const boxW = boxH * PHONE_PAIR.aspect;

    for (const [mesh, rect] of [[home, PHONE_PAIR.home], [transfer, PHONE_PAIR.transfer]] as const) {
      const h = rect.h * boxH;
      mesh.scale.set(h * PHONE_IMAGE_ASPECT, h, 1);
      mesh.position.set((rect.x + rect.w / 2 - 0.5) * boxW, (0.5 - rect.y - rect.h / 2) * boxH, 0);
    }

    // The globe hugs the phone pair: a small margin all round, kept inside the stage.
    const margin = narrow ? GLOBE_MARGIN.narrow : GLOBE_MARGIN.wide;
    layout.centerY = narrow ? VIEW_H * NARROW_LIFT : 0;
    layout.flagSize = narrow ? 0.5 : 0.62;
    layout.radii.x = Math.min(boxW / 2 + margin.x, viewW / 2 - layout.flagSize * 0.6);
    layout.radii.y = Math.min(boxH / 2 + margin.y, VIEW_H / 2 - layout.flagSize * 0.6 - layout.centerY);
    layout.radii.z = layout.radii.x * GLOBE_DEPTH;
    buildLines(layout.radii);
    if (reduced) render(0);
  }

  /* Pointer: parallax, and hover on a country circle. Touch is left to page scrolling. */
  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };
  const pointer = new THREE.Vector2(9, 9);
  const raycaster = new THREE.Raycaster();
  let hovered: Flag | null = null;
  let hoverSlow = 1;

  function onPointerMove(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    const rect = container.getBoundingClientRect();
    const inside =
      event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) {
      target.x = target.y = 0;
      pointer.set(9, 9);
      return;
    }
    const nx = (event.clientX - rect.left) / rect.width;
    const ny = (event.clientY - rect.top) / rect.height;
    target.x = (nx - 0.5) * 2;
    target.y = (ny - 0.5) * 2;
    pointer.set(nx * 2 - 1, -(ny * 2 - 1));
  }
  document.addEventListener("pointermove", onPointerMove);

  /* Frame */
  const worldPoint = new THREE.Vector3();
  let clock = 0;

  function render(dt: number) {
    const ease = 1 - Math.pow(0.001, dt);
    current.x += (target.x - current.x) * ease;
    current.y += (target.y - current.y) * ease;
    clock += dt;

    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(sprites, false)[0];
    const next = hit ? (circles.find((flag) => flag.sprite === hit.object) ?? null) : null;
    if (next?.code !== hovered?.code) onHover(next?.code ?? null);
    hovered = next;
    hoverSlow += ((hovered ? HOVER_SLOW : 1) - hoverSlow) * ease;

    pair.rotation.set(current.y * PHONE_TURN.x, current.x * PHONE_TURN.y, 0);
    globe.position.set(current.x * PARALLAX, layout.centerY + Math.sin(clock * 0.8) * 0.1, 0);

    for (const flag of circles) {
      // The wobble keeps each circle's speed uneven.
      const pace = 0.75 + 0.25 * Math.sin(clock * 0.5 + flag.wobble);
      flag.motion.u = advance(flag.motion.u, flag.motion.speed * hoverSlow * pace, dt);

      const [x, y, z] = pointOnLine(GLOBE_LINES[flag.motion.line], flag.motion.u);
      const { radii } = layout;
      flag.sprite.position.set(x * radii.x, y * radii.y, z * radii.z);

      const depth = depthOf(z * radii.z, radii.z);
      // Near circles stay small, so they cover little of the app screens.
      const wanted = layout.flagSize * (0.62 + depth * 0.38) * (flag === hovered ? HOVER_GROW : 1);
      flag.size += (wanted - flag.size) * ease;
      flag.sprite.scale.set(flag.size, flag.size, 1);
      flag.material.opacity = 0.45 + depth * 0.55;
      flag.sprite.renderOrder = z >= 0 ? ORDER.frontFlag : ORDER.back;
    }

    if (label && hovered) {
      hovered.sprite.getWorldPosition(worldPoint).project(camera);
      label.style.left = `${((worldPoint.x + 1) / 2) * container.clientWidth}px`;
      label.style.top = `${((1 - worldPoint.y) / 2) * container.clientHeight}px`;
    }

    renderer.render(scene, camera);
  }

  let frameId = 0;
  let onScreen = true;
  let last = 0;

  function tick(now: number) {
    frameId = 0;
    // A frame time can be older than `last`; a negative step must not run time backwards.
    render(Math.max(0, Math.min((now - last) / 1000, 0.05)));
    last = now;
    start();
  }
  function start() {
    if (reduced || frameId || !onScreen || document.hidden) return;
    frameId = requestAnimationFrame(tick);
  }
  function stop() {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (onScreen) {
      last = performance.now();
      start();
    } else stop();
  });
  visibilityObserver.observe(container);
  const onVisibilityChange = () => {
    if (document.hidden) stop();
    else {
      last = performance.now();
      start();
    }
  };
  document.addEventListener("visibilitychange", onVisibilityChange);

  resize();
  last = performance.now();
  if (reduced) render(0);
  else start();

  return {
    dispose() {
      disposed = true;
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("pointermove", onPointerMove);
      for (const line of lineObjects) line.geometry.dispose();
      for (const item of disposables) item.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
