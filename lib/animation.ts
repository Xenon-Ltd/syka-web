import { Variants } from "framer-motion";

/** Strong ease-out — instant feedback, great for entering elements */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** Strong ease-in-out — for on-screen movement and morphing */
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

/** Fade up: element rises 24px and fades in */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

/** Fade in: pure opacity */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

/** Slide in from left */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/** Slide in from right */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/** Stagger container — staggers children by 80ms */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/** Stagger container with slower children stagger */
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/** useInView options for scroll-triggered animations */
export const IN_VIEW_OPTS = { once: true, margin: "-80px" } as const;
