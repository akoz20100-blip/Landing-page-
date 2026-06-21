import { useEffect, useRef, useState } from 'react';
import type Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmoothScroll } from './lib/smoothScroll';
import { IS_FLAT } from './lib/flags';
import { lenisStore } from './lib/lenisStore';
import { prefersReducedMotion } from './lib/motion';
import { useReveal } from './hooks/useReveal';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Nav from './components/Nav';
import Hero from './components/sections/Hero';
import Manifesto from './components/sections/Manifesto';
import Showcase from './components/sections/Showcase';
import Marquee from './components/Marquee';
import Details from './components/sections/Details';
import Gallery from './components/sections/Gallery';
import Footer from './components/sections/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const scope = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Boot the smooth-scroll backbone once. Hold scroll while the preloader runs.
  // Skip it for reduced-motion (WCAG 2.3.3 — no animated scroll interpolation)
  // and for the ?flat QA path so headless screenshots use native scroll.
  useEffect(() => {
    if (IS_FLAT || prefersReducedMotion()) return;
    const lenis = initSmoothScroll();
    lenisRef.current = lenis;
    lenisStore.current = lenis;
    lenis.stop();
    return () => {
      lenis.destroy();
      lenisRef.current = null;
      lenisStore.current = null;
    };
  }, []);

  // Release scroll, recalc pins, and move focus past the curtain once the
  // preloader finishes and fonts/images settle.
  useEffect(() => {
    if (!loaded) return;
    const lenis = lenisRef.current;
    lenis?.start();
    lenis?.scrollTo(0, { immediate: true });
    document.getElementById('hero-heading')?.focus({ preventScroll: true });
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => ScrollTrigger.refresh()),
    );
    return () => cancelAnimationFrame(raf);
  }, [loaded]);

  useReveal(scope);

  return (
    <div ref={scope}>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Showcase />
        <Marquee />
        <Details />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
