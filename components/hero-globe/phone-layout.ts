/**
 * The two app screens sit side by side and overlap, inside one box.
 * Every value is a fraction of that box, so the still image and the WebGL
 * scene place the phones the same way.
 */
export const PHONE_PAIR = {
  /** Width over height of the whole box. */
  aspect: 678 / 860,
  home: { x: 0, y: 0, w: 375 / 678, h: 784 / 860 },
  transfer: { x: 300 / 678, y: 71 / 860, w: 375 / 678, h: 786 / 860 },
} as const;

/** Width over height of each screen image. */
export const PHONE_IMAGE_ASPECT = 1004 / 2080;

/** How far the globe's lines stand off the phone pair, in world units (10 fill the stage's height). */
export const GLOBE_MARGIN = { wide: { x: 0.9, y: 0.55 }, narrow: { x: 0.7, y: 0.45 } } as const;
/** The globe's depth as a share of its half-width. */
export const GLOBE_DEPTH = 0.9;

/** Height of the pair box as a share of the stage's height. */
export const PAIR_HEIGHT = { wide: 0.78, narrow: 0.62 } as const;
/** How far the pair sits above the stage's centre on narrow stages, as a share of its height. */
export const NARROW_LIFT = 0.05;
