"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";

import { OFFICE_LOCATIONS, type OfficeLocation } from "./footer-locations-data";

function moveFocus(
  event: KeyboardEvent<HTMLButtonElement>,
  location: OfficeLocation,
  setSelectedId: (id: string) => void,
  tabRefs: React.MutableRefObject<Record<string, HTMLButtonElement | null>>,
) {
  const currentIndex = OFFICE_LOCATIONS.findIndex((item) => item.id === location.id);
  let nextIndex = currentIndex;

  if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % OFFICE_LOCATIONS.length;
  if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + OFFICE_LOCATIONS.length) % OFFICE_LOCATIONS.length;
  if (event.key === "Home") nextIndex = 0;
  if (event.key === "End") nextIndex = OFFICE_LOCATIONS.length - 1;

  if (nextIndex === currentIndex) return;

  event.preventDefault();
  const nextLocation = OFFICE_LOCATIONS[nextIndex];
  setSelectedId(nextLocation.id);
  tabRefs.current[nextLocation.id]?.focus();
}

export default function FooterLocations() {
  const [selectedId, setSelectedId] = useState(OFFICE_LOCATIONS[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const activeLocation = OFFICE_LOCATIONS.find((location) => location.id === selectedId) ?? OFFICE_LOCATIONS[0];

  return (
    <section aria-labelledby="office-locations-heading" className="mt-12 pt-10 lg:mt-14">
      <h2 id="office-locations-heading" className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-white/55 lg:text-base">
        Global office locations
      </h2>

      <div className="mt-5 flex w-full flex-col items-center justify-center text-center">
        <div role="tablist" aria-label="Office locations by country" aria-orientation="horizontal" className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {OFFICE_LOCATIONS.map((location) => {
            const isActive = location.id === selectedId;

            return (
              <button
                key={location.id}
                ref={(element) => { tabRefs.current[location.id] = element; }}
                type="button"
                role="tab"
                id={`office-location-tab-${location.id}`}
                aria-selected={isActive}
                aria-controls={`office-location-panel-${location.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setSelectedId(location.id)}
                onKeyDown={(event) => moveFocus(event, location, setSelectedId, tabRefs)}
                className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-sans transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-base ${isActive
                    ? "border-white bg-white font-medium text-[#151132]"
                    : "border-white/25 bg-transparent text-white/75 hover:border-white/50 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <span className="relative size-5 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10">
                  <Image src={location.flagUrl} alt={location.alt} fill sizes="20px" className="object-cover" />
                </span>
                <span className="font-medium tracking-tight">{location.name}</span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`office-location-panel-${activeLocation.id}`}
          aria-labelledby={`office-location-tab-${activeLocation.id}`}
          aria-live="polite"
          className="mt-4 min-h-6"
        >
          <p className="max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">{activeLocation.address}</p>
        </div>
      </div>
    </section>
  );
}
