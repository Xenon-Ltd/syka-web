"use client";

import type { AnimationItem } from "lottie-web";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";

// Visuals for the product feature rows: Lottie JSON or MP4 from
// public/animations, or a static image import where no animation exists yet.
// Each one already carries its own contour background and is authored 608px
// wide (515 or 606 tall), so the box
// keeps that ratio at every breakpoint instead of cropping into the UI.
// Media only loads as it nears the viewport and pauses while off-screen.
// Every animation ships with a same-named .webp poster (a representative
// frame): it shows while the animation loads, if it fails, and in place of
// motion when the visitor prefers reduced motion.

type MediaHeight = 515 | 606;

const ASPECT: Record<MediaHeight, string> = {
  515: "aspect-[608/515]",
  606: "aspect-[608/606]",
};

const LOAD_MARGIN = "400px 0px";
const PLAY_THRESHOLD = 0.25;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// Follows the setting live, so turning reduced motion on stops playback at once.
function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeToReducedMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => false);
}

const posterFor = (src: string) => src.replace(/\.(json|mp4)$/, ".webp");

function Poster({ src }: { src: string }) {
  return <Image src={posterFor(src)} alt="" fill sizes="(max-width: 1279px) 100vw, 608px" className="object-cover" />;
}

function LottieMedia({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const container = ref.current;
    // Reduced motion: the poster stands in, and the animation never downloads.
    if (!container || reduceMotion) return;

    let animation: AnimationItem | null = null;
    let requested = false;
    let visible = false;
    let cancelled = false;

    const sync = () => {
      if (!animation) return;
      if (visible) animation.play();
      else animation.pause();
    };

    const load = async () => {
      const { default: lottie } = await import("lottie-web/build/player/lottie_light");
      if (cancelled) return;
      animation = lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: true,
        autoplay: false,
        path: src,
        rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
      });
      animation.addEventListener("DOMLoaded", sync);
      // A failed load leaves the container empty, so the poster beneath shows.
      animation.addEventListener("data_failed", () => animation?.destroy());
    };

    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || requested) return;
        requested = true;
        loader.disconnect();
        void load();
      },
      { rootMargin: LOAD_MARGIN },
    );
    const player = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: PLAY_THRESHOLD },
    );
    loader.observe(container);
    player.observe(container);

    return () => {
      cancelled = true;
      loader.disconnect();
      player.disconnect();
      animation?.destroy();
    };
  }, [src, reduceMotion]);

  // The animation paints an opaque background, so once drawn it covers the poster.
  return (
    <>
      <Poster src={src} />
      {!reduceMotion && <div ref={ref} className="absolute inset-0" />}
    </>
  );
}

function VideoMedia({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Reduced motion: the poster stands in, and the video never downloads.
    if (reduceMotion) {
      video.pause();
      return;
    }

    const player = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: PLAY_THRESHOLD },
    );
    player.observe(video);
    return () => player.disconnect();
  }, [src, reduceMotion]);

  // The exports have black, baked-in rounded corners; the slight scale pushes
  // their anti-aliased edge outside the box's own rounded clip. Every video
  // ships with a same-named .webp poster (a representative frame).
  return (
    <video
      ref={ref}
      src={src}
      poster={posterFor(src)}
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 size-full scale-[1.02] object-cover"
    />
  );
}

export function ProductMedia({
  src,
  height = 515,
  className,
}: {
  src: string | StaticImageData;
  height?: MediaHeight;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`relative mx-auto w-full max-w-[608px] overflow-hidden rounded-2xl bg-[#E6F2FB] ${ASPECT[height]} ${className ?? ""}`}
    >
      {typeof src !== "string" ? (
        <Image src={src} alt="" fill sizes="(max-width: 1279px) 100vw, 608px" className="object-cover" />
      ) : src.endsWith(".mp4") ? (
        <VideoMedia src={src} />
      ) : (
        <LottieMedia src={src} />
      )}
    </div>
  );
}
