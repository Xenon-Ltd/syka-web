"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WavyBackgroundDesign } from "@/assets/images";
import Header from "@/components/layout/header";
import { EASE_OUT, IN_VIEW_OPTS } from "@/lib/animation";
import { BusinessHeroCopy } from "./business-hero";
import HeroGlobe from "./hero-globe";
import { SolutionsContent } from "./solutions-and-platform";

// --globe is the globe's square size. Its sphere has a radius of
// --globe / 2 / 1.18 (see FULL_FIT in globe-scene), so its top sits
// 0.0763 × --globe below the box's top edge.
const GLOBE_SIZE = "[--globe:94vw] sm:[--globe:100vw] lg:[--globe:min(1100px,100vw)]";

/**
 * The business landing page's opening: dark navbar, hero and Solutions in one
 * section, joined by a full globe. The sphere starts under the hero buttons
 * and Solutions follows just below it, while the navy hero background fades
 * into the purple Solutions one across the globe.
 */
export default function BusinessHeroSolutions() {
  const heroRef = useRef(null);
  const solutionsRef = useRef(null);
  const heroInView = useInView(heroRef, IN_VIEW_OPTS);
  const solutionsInView = useInView(solutionsRef, IN_VIEW_OPTS);

  return (
    // z-10 keeps the header's dropdowns and mobile menu above later sections.
    <section ref={heroRef} className={`relative z-10 isolate overflow-hidden bg-xenon-primary ${GLOBE_SIZE}`}>
      <Image
        src={WavyBackgroundDesign}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="pointer-events-none -z-20 object-cover select-none"
      />

      {/* flow-root keeps the header's top margin inside, so the navy starts at the top. */}
      <div className="relative flow-root">
        {/* Navy behind the navbar and hero, fading out across the globe so the
            purple and its wavy texture take over for Solutions. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#0a1628_0%,#0a1628_calc(100%-var(--globe)*0.45),rgba(10,22,40,0)_100%)]"
        />

        {/* The hero renders the header (see ownHeaderRoutes in site-chrome) so
            the navy background runs behind the navigation. */}
        <Header tone="dark" />

        <BusinessHeroCopy isInView={heroInView} />

        {/* Pulled up so the sphere's top meets the hero buttons. */}
        <motion.div
          initial={{ y: 24 }}
          animate={heroInView ? { y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.25 }}
          className="mt-[calc(var(--globe)*-0.0763-40px)] lg:mt-[calc(var(--globe)*-0.0763-56px)]"
        >
          <HeroGlobe framing="full" className="relative left-1/2 aspect-square w-[var(--globe)] max-w-none -translate-x-1/2" />
        </motion.div>
      </div>

      {/* Solutions starts below the globe's box (the sphere ends at 92% of it),
          so the whole sphere stays hoverable. */}
      <div
        ref={solutionsRef}
        id="solutions"
        className="relative z-10 mx-auto mt-6 max-w-[1268px] scroll-mt-8 px-5 pb-16 lg:mt-12 sm:px-6 md:pb-24 lg:pb-32 xl:pb-[255px]"
      >
        <SolutionsContent isInView={solutionsInView} />
      </div>
    </section>
  );
}
