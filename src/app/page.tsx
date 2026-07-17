import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

// Below-the-fold sections are code-split so their client JS isn't part of
// the initial bundle — SSR stays on (default), so crawlers and no-JS
// visitors still get full HTML content; only hydration JS is deferred.
const About = dynamic(() => import("@/components/sections/About").then((m) => m.About));
const Skills = dynamic(() => import("@/components/sections/Skills").then((m) => m.Skills));
const Work = dynamic(() => import("@/components/sections/Work").then((m) => m.Work));
const Contact = dynamic(() => import("@/components/sections/Contact").then((m) => m.Contact));

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Work />
      <Contact />
    </>
  );
}
