import { useLayoutEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap } from 'gsap';

interface MagneticProps {
  children: ReactNode;
  /** How strongly the element follows the cursor (0–1). */
  strength?: number;
  className?: string;
}

/**
 * Wraps a single interactive element so it's magnetically pulled toward the
 * cursor on hover and springs back on leave. No-op on touch / reduced-motion.
 */
export default function Magnetic({ children, strength = 0.25, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        // Promote only while the magnetic branch is live — never on touch/reduce.
        gsap.set(el, { willChange: 'transform' });
        const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * strength);
          yTo((e.clientY - (r.top + r.height / 2)) * strength);
        };
        const reset = () => {
          xTo(0);
          yTo(0);
        };

        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', reset);
        return () => {
          el.removeEventListener('pointermove', move);
          el.removeEventListener('pointerleave', reset);
          gsap.set(el, { clearProps: 'willChange' });
        };
      });
    }, el);

    return () => ctx.revert();
  }, [strength]);

  return (
    <span ref={ref} className={`inline-block${className ? ` ${className}` : ''}`}>
      {children}
    </span>
  );
}
