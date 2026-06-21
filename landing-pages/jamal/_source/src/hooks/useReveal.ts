import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals every element marked with [data-reveal] inside `scopeRef`: fade + rise
 * as it enters the viewport. Reduced-motion shows them immediately (no tween).
 *
 * Usage: add `data-reveal` to any heading/paragraph/image you want animated.
 */
export function useReveal(scopeRef: RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      if (!items.length) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOk, () => {
        items.forEach((el) => {
          gsap.from(el, {
            y: 40,
            autoAlpha: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          });
        });
      });

      mm.add(MEDIA.motionReduce, () => {
        gsap.set(items, { autoAlpha: 1, y: 0 });
      });
    }, scopeRef);

    return () => ctx.revert();
  }, [scopeRef]);
}
