import { describe, expect, it } from "vitest";
import {
  advance,
  depthOf,
  GLOBE_LINES,
  lineRuns,
  pointOnLine,
  randomFlagMotion,
} from "@/components/hero-globe/globe-path";

const length = ([x, y, z]: readonly [number, number, number]) => Math.hypot(x, y, z);

describe("pointOnLine", () => {
  it("stays on the unit sphere for every line", () => {
    for (const line of GLOBE_LINES) {
      for (let u = 0; u < Math.PI * 2; u += 0.37) {
        expect(length(pointOnLine(line, u))).toBeCloseTo(1, 10);
      }
    }
  });

  it("returns to its start after a full turn", () => {
    for (const line of GLOBE_LINES) {
      const start = pointOnLine(line, 0.8);
      const end = pointOnLine(line, 0.8 + Math.PI * 2);
      start.forEach((value, i) => expect(end[i]).toBeCloseTo(value, 10));
    }
  });
});

describe("lineRuns", () => {
  const radii = { x: 4, y: 4, z: 4 };

  it("alternates between the near and far side", () => {
    for (const line of GLOBE_LINES) {
      const runs = lineRuns(line, radii);
      runs.forEach((run, i) => {
        if (i > 0) expect(run.front).toBe(!runs[i - 1].front);
      });
    }
  });

  it("keeps each point on the side its run says", () => {
    for (const line of GLOBE_LINES) {
      for (const run of lineRuns(line, radii)) {
        for (const [, , z] of run.points) {
          if (run.front) expect(z).toBeGreaterThanOrEqual(-1e-9);
          else expect(z).toBeLessThanOrEqual(1e-9);
        }
      }
    }
  });

  it("shares the crossing point between neighbouring runs, so the line has no gap", () => {
    for (const line of GLOBE_LINES) {
      const runs = lineRuns(line, radii);
      for (let i = 1; i < runs.length; i++) {
        const before = runs[i - 1].points.at(-1)!;
        const after = runs[i].points[0];
        expect(after).toEqual(before);
        expect(after[2]).toBeCloseTo(0, 10);
      }
    }
  });

  it("draws both sides of the equator", () => {
    const equator = GLOBE_LINES.find((line) => line.kind === "lat" && line.degrees === 0)!;
    const sides = new Set(lineRuns(equator, radii).map((run) => run.front));
    expect(sides).toEqual(new Set([true, false]));
  });

  it("places points at the requested radius", () => {
    const [line] = GLOBE_LINES;
    const [first] = lineRuns(line, radii);
    expect(length(first.points[1])).toBeCloseTo(4, 10);
  });

  it("draws an ellipsoid when the radii differ, so the globe can hug a tall phone", () => {
    const tall = { x: 3, y: 5, z: 2.5 };
    for (const line of GLOBE_LINES) {
      for (const run of lineRuns(line, tall)) {
        for (const [x, y, z] of run.points) {
          // The point where a line changes side lies on a chord, a hair inside the surface.
          expect((x / tall.x) ** 2 + (y / tall.y) ** 2 + (z / tall.z) ** 2).toBeCloseTo(1, 2);
        }
      }
    }
  });
});

describe("depthOf", () => {
  it("is 0 at the back, 0.5 in the middle and 1 at the front", () => {
    expect(depthOf(-4, 4)).toBe(0);
    expect(depthOf(0, 4)).toBe(0.5);
    expect(depthOf(4, 4)).toBe(1);
  });
});

describe("randomFlagMotion", () => {
  it("picks a real line and an angle within one turn", () => {
    for (let i = 0; i < 200; i++) {
      const motion = randomFlagMotion();
      expect(GLOBE_LINES[motion.line]).toBeDefined();
      expect(motion.u).toBeGreaterThanOrEqual(0);
      expect(motion.u).toBeLessThan(Math.PI * 2);
    }
  });

  it("keeps the speed between 0.1 and 0.3 radians a second, in either direction", () => {
    for (let i = 0; i < 200; i++) {
      const { speed } = randomFlagMotion();
      expect(Math.abs(speed)).toBeGreaterThanOrEqual(0.1);
      expect(Math.abs(speed)).toBeLessThanOrEqual(0.3);
    }
  });

  it("uses the random source it is given", () => {
    const motion = randomFlagMotion(() => 0);
    expect(motion).toEqual({ line: 0, u: 0, speed: -0.1 });
    const last = randomFlagMotion(() => 0.999999);
    expect(last.line).toBe(GLOBE_LINES.length - 1);
    expect(last.speed).toBeGreaterThan(0);
  });
});

describe("advance", () => {
  it("moves along the line and wraps past a full turn", () => {
    expect(advance(1, 0.5, 2)).toBeCloseTo(2, 10);
    expect(advance(Math.PI * 2 - 0.1, 0.5, 1)).toBeCloseTo(0.4, 10);
  });

  it("wraps backwards motion into the range 0 to one turn", () => {
    const next = advance(0.1, -0.5, 1);
    expect(next).toBeGreaterThanOrEqual(0);
    expect(next).toBeLessThan(Math.PI * 2);
    expect(next).toBeCloseTo(Math.PI * 2 - 0.4, 10);
  });

  it("does not run time backwards for a negative step", () => {
    expect(advance(1, 0.5, -3)).toBe(1);
  });
});
