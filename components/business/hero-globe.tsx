"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { EURO } from "@/assets/icons/countries";
import { HeroGlobeImage } from "@/assets/images";
import { eurozoneCountries, supportedCountries } from "@/lib/countries";
import { cn } from "@/lib/utils";
import type { GlobeDots, GlobeFraming, GlobeHover } from "./globe-scene";

type CountryInfo = { name: string; currency: string; icon: string };

const countryInfo = new Map<string, CountryInfo>();
for (const { code, name, currency, icon } of supportedCountries) {
  if (code !== "EU") countryInfo.set(code, { name, currency, icon });
}
for (const [code, name] of Object.entries(eurozoneCountries)) {
  countryInfo.set(code, { name, currency: "EUR", icon: EURO });
}

// Payment routes drawn as arcs across the globe.
const ARCS: [string, string][] = [
  ["US", "GH"],
  ["GB", "NG"],
  ["FR", "SN"],
  ["AE", "IN"],
  ["DE", "KE"],
  ["BR", "ZA"],
  ["CA", "GB"],
];

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

// Still image placement per framing, so its globe lines up with the WebGL one.
// The image's sphere spans ~80% of its width. Cap: radius = height / 0.62 with
// a 0.06-radius top gap. Full: radius = half the shorter side / 1.18, centred.
const FALLBACK_CLASS: Record<GlobeFraming, string> = {
  cap: "top-[-29cqh] left-1/2 w-[402cqh] -translate-x-1/2",
  full: "top-1/2 left-1/2 w-[105.7cqmin] -translate-x-1/2 -translate-y-1/2",
};

/**
 * A dotted globe with Syka's supported countries lit up: either the top cap of
 * a large globe ("cap") or the whole sphere ("full").
 * Drag to spin it; hover or tap a lit country to see its name and currency.
 * Visitors who prefer reduced motion, or have no WebGL, see a still image.
 */
export default function HeroGlobe({ className, framing = "cap" }: { className?: string; framing?: GlobeFraming }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [hover, setHover] = useState<GlobeHover>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !supportsWebGL()) return;

    let cancelled = false;
    let dispose: (() => void) | undefined;

    Promise.all([
      import("./globe-scene"),
      fetch("/globe/dots.json").then((res) => res.json() as Promise<GlobeDots>),
    ])
      .then(([{ createGlobeScene }, data]) => {
        if (cancelled) return;
        const globe = createGlobeScene(container, data, {
          highlighted: new Set(countryInfo.keys()),
          arcs: ARCS,
          onHover: setHover,
          onReady: () => setReady(true),
          framing,
        });
        dispose = globe.dispose;
      })
      // The still image stays up if the globe can't load.
      .catch(() => {});

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [framing]);

  const info = hover ? countryInfo.get(hover.code) : undefined;

  return (
    <div
      role="img"
      aria-label="Globe highlighting the countries where Syka operates"
      className={cn("relative w-full [container-type:size]", className)}
    >
      {/* Still image until the globe is ready, or instead of it. */}
      <Image
        src={HeroGlobeImage}
        alt=""
        aria-hidden
        priority
        sizes="(max-width: 768px) 260vw, 1650px"
        className={cn(
          "pointer-events-none absolute h-auto max-w-none transition-opacity duration-500 ease-out",
          FALLBACK_CLASS[framing],
          ready && "opacity-0",
        )}
      />

      <div
        ref={containerRef}
        className={cn("absolute inset-0 opacity-0 transition-opacity duration-500 ease-out", ready && "opacity-100")}
      />

      {info && hover && (
        <div
          aria-hidden
          className="pointer-events-none absolute z-10 flex -translate-x-1/2 -translate-y-[calc(100%+14px)] items-center gap-2.5 whitespace-nowrap rounded-full border border-[rgba(121,192,232,0.35)] bg-[rgba(10,22,40,0.88)] py-1.5 pr-4 pl-1.5 text-sm text-[#f8fafc] shadow-lg backdrop-blur-sm md:text-base"
          style={{ left: hover.x, top: hover.y }}
        >
          <Image src={info.icon} alt="" width={24} height={24} className="size-6 rounded-full" />
          <span>{info.name}</span>
          <span className="text-[#94a3b8]">·</span>
          <span className="text-[#94a3b8]">{info.currency}</span>
        </div>
      )}
    </div>
  );
}
