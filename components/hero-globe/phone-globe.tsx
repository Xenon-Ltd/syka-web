"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { PhoneHome, PhoneTransfer } from "@/assets/images";
import { supportedCountries } from "@/lib/countries";
import { cn } from "@/lib/utils";
import { NARROW_LIFT, PAIR_HEIGHT, PHONE_PAIR } from "./phone-layout";
import type { GlobeFlag } from "./phone-globe-scene";

// Countries that travel the globe; a mix of Syka's regions, in this order.
const GLOBE_COUNTRY_CODES = ["NG", "GH", "GB", "US", "CA", "KE", "ZA", "IN", "AE", "BR", "AU", "MX", "TR", "PH"];

const countryByCode = new Map(supportedCountries.map((country) => [country.code, country]));

// Static image imports are objects at build time, though the country list types them as strings.
const imageUrl = (icon: unknown): string => (typeof icon === "string" ? icon : (icon as { src: string }).src);

const flags: GlobeFlag[] = GLOBE_COUNTRY_CODES.flatMap((code) => {
  const country = countryByCode.get(code);
  return country ? [{ code, icon: imageUrl(country.icon) }] : [];
});

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

const pct = (fraction: number) => `${fraction * 100}%`;

const STILL_PHONES = [
  { image: PhoneHome, rect: PHONE_PAIR.home, alt: "The Syka app home screen showing wallet balances and recent transactions" },
  { image: PhoneTransfer, rect: PHONE_PAIR.transfer, alt: "The Syka app currency list for an international transfer" },
] as const;

// Where the still images sit, matching the scene: centred on the stage, lifted on narrow stages.
const STILL_SIZE = {
  "--h-narrow": pct(PAIR_HEIGHT.narrow),
  "--h-wide": pct(PAIR_HEIGHT.wide),
  "--top-narrow": pct(0.5 - NARROW_LIFT - PAIR_HEIGHT.narrow / 2),
  "--top-wide": pct(0.5 - PAIR_HEIGHT.wide / 2),
} as CSSProperties;

/**
 * The Syka app inside a wireframe globe, with country circles travelling along
 * its lines. Hover a circle to see the country and its currency.
 * Visitors with no WebGL see the two screens as still images; visitors who
 * prefer reduced motion see the globe as one still frame.
 */
export default function PhoneGlobe({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [hoverCode, setHoverCode] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !supportsWebGL()) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let dispose: (() => void) | undefined;

    // Wait until the page is idle, so the globe never delays the first paint.
    const start = () => {
      import("./phone-globe-scene")
        .then(({ createPhoneGlobeScene }) => {
          if (cancelled) return;
          const scene = createPhoneGlobeScene(container, {
            flags,
            phones: { home: PhoneHome.src, transfer: PhoneTransfer.src },
            reduced,
            label: labelRef.current,
            onHover: setHoverCode,
            onReady: () => setReady(true),
          });
          dispose = scene.dispose;
        })
        // The still images stay up if the globe can't load.
        .catch(() => {});
    };
    // Safari has no requestIdleCallback.
    const hasIdle = "requestIdleCallback" in window;
    const idle = hasIdle ? window.requestIdleCallback(start, { timeout: 1000 }) : window.setTimeout(start, 200);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      dispose?.();
    };
  }, []);

  const country = hoverCode ? countryByCode.get(hoverCode) : undefined;

  return (
    <div className={cn("relative aspect-[4/5] w-full md:aspect-[16/10]", className)}>
      {/* Still images until the globe is ready, or instead of it. */}
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 h-(--h-narrow) -translate-x-1/2 transition-opacity duration-500 ease-out md:h-(--h-wide)",
          "top-(--top-narrow) md:top-(--top-wide)",
          ready && "opacity-0",
        )}
        style={{ aspectRatio: PHONE_PAIR.aspect, ...STILL_SIZE }}
      >
        <div className="relative size-full">
          {STILL_PHONES.map(({ image, rect, alt }) => (
            <Image
              key={alt}
              src={image}
              alt={alt}
              priority
              sizes="(max-width: 768px) 30vw, 240px"
              className="absolute object-contain"
              style={{ left: pct(rect.x), top: pct(rect.y), width: pct(rect.w), height: pct(rect.h) }}
            />
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        aria-hidden
        className={cn("absolute inset-0 opacity-0 transition-opacity duration-500 ease-out", ready && "opacity-100")}
      />

      <div
        ref={labelRef}
        aria-hidden
        className={cn(
          "pointer-events-none absolute z-10 flex -translate-x-1/2 -translate-y-[calc(100%+16px)] items-center gap-2 rounded-full border border-[rgba(121,192,232,0.4)] bg-[rgba(10,8,40,0.92)] px-4 py-1.5 text-sm font-semibold whitespace-nowrap text-white shadow-lg transition-opacity duration-150",
          country ? "opacity-100" : "opacity-0",
        )}
      >
        {country && (
          <>
            <span>{country.name}</span>
            <span className="text-xenon-300">{country.currency}</span>
          </>
        )}
      </div>
    </div>
  );
}
