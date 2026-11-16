"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { type Audience, resolveAudience, routeAudience } from "@/lib/audience";

const STORAGE_KEY = "syka-audience";
const CHANGE_EVENT = "syka-audience-change";

function readStored(): Audience | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "personal" || value === "business" ? value : null;
  } catch {
    // Storage is blocked (private mode, site data off). The header then uses the default side.
    return null;
  }
}

function writeStored(audience: Audience) {
  try {
    if (window.localStorage.getItem(STORAGE_KEY) === audience) return;
    window.localStorage.setItem(STORAGE_KEY, audience);
  } catch {
    // Storage is blocked. The choice lasts only while this page is open.
    return;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

// Static pages render with no stored side; the client reads it after hydration.
export function useAudience(pathname: string): Audience {
  const stored = useSyncExternalStore(subscribe, readStored, () => null);
  const fixed = routeAudience(pathname);

  useEffect(() => {
    if (fixed) writeStored(fixed);
  }, [fixed]);

  return resolveAudience(pathname, stored);
}

// The side the pill showed on the previous page. Module scope survives
// client-side navigation but starts empty on a full load, so the server HTML
// and hydration agree.
let lastPillAudience: Audience | null = null;

/**
 * Where to draw the pill, and whether it may slide. A new page's header starts
 * the pill where the last page left it, then slides it to this page's side.
 * The slide is off for the first frames, so a stored side read after
 * hydration jumps into place instead of sliding without a click.
 */
export function usePillAudience(audience: Audience) {
  const [from] = useState(() => lastPillAudience);
  const [canSlide, setCanSlide] = useState(false);

  useEffect(() => {
    let second = 0;
    // Two frames: the first lets the hydration re-render with the stored side commit and paint.
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setCanSlide(true));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, []);

  useEffect(() => {
    lastPillAudience = audience;
  }, [audience]);

  return { pillAudience: canSlide ? audience : (from ?? audience), canSlide };
}
