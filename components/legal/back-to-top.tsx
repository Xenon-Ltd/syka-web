"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/** Floating "back to top" for long pages on phones and tablets. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 1200);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
      className={`fixed right-4 bottom-4 z-30 flex size-12 items-center justify-center rounded-full bg-xenon-primary text-white shadow-lg transition-[opacity,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-xenon-primary lg:hidden ${visible ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
    >
      <ArrowUp aria-hidden className="size-5" />
    </button>
  );
}
