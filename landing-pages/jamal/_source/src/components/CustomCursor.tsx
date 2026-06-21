import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Agency-grade custom cursor: a lagging ring + a snappy dot, blended with
 * difference so it reads on dark or light frames. Grows over [data-cursor]
 * elements and shows their label (e.g. "view"). Only active on fine pointers
 * with motion allowed — touch and reduced-motion keep the native cursor.
 *
 * The label is written imperatively (textContent + classList) so pointer
 * movement never triggers a React re-render — scaling is GSAP-driven.
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const labelEl = labelRef.current;
    if (!ring || !dot || !labelEl) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        document.body.classList.add('cursor-custom');
        gsap.set([ring, dot], { xPercent: -50, yPercent: -50, opacity: 0 });

        const rx = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' });
        const ry = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' });
        const dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
        const dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });

        let shown = false;
        let current: Element | null = null;

        const move = (e: PointerEvent) => {
          if (!shown) {
            gsap.to([ring, dot], { opacity: 1, duration: 0.4, ease: 'power2.out' });
            shown = true;
          }
          rx(e.clientX);
          ry(e.clientY);
          dx(e.clientX);
          dy(e.clientY);
        };

        const over = (e: PointerEvent) => {
          const t = (e.target as HTMLElement).closest(
            'a[href], button, [data-cursor]',
          );
          if (t === current) return;
          current = t;
          if (t) {
            const raw = t.closest('[data-cursor]')?.getAttribute('data-cursor') || '';
            const text = raw === 'true' || raw === 'link' ? '' : raw;
            labelEl.textContent = text;
            ring.classList.toggle('has-label', Boolean(text));
            gsap.to(ring, { scale: text ? 2.8 : 1.8, duration: 0.35, ease: 'power3' });
            gsap.to(dot, { scale: 0, duration: 0.3, ease: 'power3' });
          } else {
            labelEl.textContent = '';
            ring.classList.remove('has-label');
            gsap.to(ring, { scale: 1, duration: 0.35, ease: 'power3' });
            gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power3' });
          }
        };

        const hide = () => gsap.to([ring, dot], { opacity: 0, duration: 0.3 });
        const show = () => gsap.to([ring, dot], { opacity: 1, duration: 0.3 });

        window.addEventListener('pointermove', move, { passive: true });
        window.addEventListener('pointerover', over, { passive: true });
        document.addEventListener('mouseleave', hide);
        document.addEventListener('mouseenter', show);

        return () => {
          document.body.classList.remove('cursor-custom');
          ring.classList.remove('has-label');
          window.removeEventListener('pointermove', move);
          window.removeEventListener('pointerover', over);
          document.removeEventListener('mouseleave', hide);
          document.removeEventListener('mouseenter', show);
        };
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden>
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
