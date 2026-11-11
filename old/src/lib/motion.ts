/**
 * The page's motion primitives. Three hooks, one shared IntersectionObserver
 * vocabulary — see src/index.css for the classes they toggle.
 */

import { useEffect, useRef, useState } from "react";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Reveal-on-scroll. Attach the returned ref to any element carrying
 * `reveal reveal-<variant>`; `is-visible` is added the first time it enters
 * the viewport, and the observer disconnects immediately afterwards.
 *
 * One-shot on purpose: elements that re-hide when scrolled past make a long
 * marketing page feel unstable when the reader scrolls back up to re-read
 * something, and it doubles the observer work for no benefit.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (or motion turned off): show it and stop. Without
    // this the element would sit at opacity:0 forever.
    if (typeof IntersectionObserver === "undefined" || prefersReducedMotion()) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: options?.threshold ?? 0.15,
        // Fires slightly before the element is fully on screen so the
        // animation is already underway by the time the reader gets to it.
        rootMargin: options?.rootMargin ?? "0px 0px -10% 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  return ref;
}

/**
 * Same thing for a group: every `[data-reveal]` descendant of the container
 * reveals in sequence, `stagger` ms apart, driven by the --reveal-delay
 * custom property the CSS transition reads.
 *
 * Delays are assigned here rather than written into the markup so a list whose
 * length changes (or is mapped from data) can't end up with a gap or a
 * duplicate delay in the sequence.
 */
export function useStaggeredReveal<T extends HTMLElement = HTMLDivElement>(
  stagger = 90,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (items.length === 0) return;

    if (typeof IntersectionObserver === "undefined" || prefersReducedMotion()) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    items.forEach((item, i) => {
      item.style.setProperty("--reveal-delay", `${i * stagger}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [stagger]);

  return ref;
}

/**
 * Pointer parallax for the hero mockups: returns a -1..1 offset for the
 * cursor's distance from the centre of the viewport.
 *
 * Reads are throttled to one per animation frame — mousemove fires far faster
 * than the screen refreshes, and setting state on every event would re-render
 * the hero (screenshots and all) hundreds of times a second.
 */
export function usePointerParallax(enabled = true) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return;

    // Coarse pointers have no hover position to track, and reading touch moves
    // here would fight the user's scroll.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;

    const onMove = (e: MouseEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setOffset({
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        });
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return offset;
}

/** Scroll progress 0..1 over the whole document, for the navbar's progress bar. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      // A viewport taller than the content divides by zero; that page is
      // entirely visible already, so it counts as fully read.
      setProgress(scrollable <= 0 ? 1 : Math.min(1, window.scrollY / scrollable));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return progress;
}

/** True once the page has scrolled past `threshold` px. Drives the navbar's
 *  glass background and the sticky CTA's entrance. */
export function useScrolledPast(threshold = 80) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let frame = 0;

    const check = () => {
      frame = 0;
      setPast(window.scrollY > threshold);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return past;
}
