"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { asset } from "@/lib/base";
import type { Artwork } from "@/lib/content";

export function Gallery({ items }: { items: Artwork[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const touchX = useRef<number | null>(null);

  // Reveal each piece as it scrolls into view.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const ids = entries.filter((e) => e.isIntersecting).map((e) => (e.target as HTMLElement).dataset.id!);
        if (!ids.length) return;
        setVisible((prev) => new Set([...prev, ...ids]));
        entries.forEach((e) => e.isIntersecting && io.unobserve(e.target));
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    document.querySelectorAll<HTMLElement>(".piece").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      // RTL: the "next" arrow points left.
      if (e.key === "ArrowLeft") step(1);
      if (e.key === "ArrowRight") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, step]);

  if (!items.length) return <p className="muted center">הציורים יעלו בקרוב</p>;
  const cur = open === null ? null : items[open];

  return (
    <>
      <div className="masonry">
        {items.map((a, i) => (
          <button
            key={a.id}
            data-id={a.id}
            className={`piece${visible.has(a.id) ? " in" : ""}`}
            style={{ aspectRatio: `${a.w} / ${a.h}`, transitionDelay: `${(i % 3) * 90}ms` }}
            onClick={() => setOpen(i)}
            aria-label={a.title ? `הגדל: ${a.title}` : "הגדל ציור"}
          >
            <img src={asset(a.src)} alt={a.title} width={a.w} height={a.h} loading="lazy" decoding="async" />
            {a.title && <span className="piece-title">{a.title}</span>}
          </button>
        ))}
      </div>

      {cur && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={cur.title || "ציור"}
          onClick={() => setOpen(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); // swipe left → next (RTL)
          }}
        >
          <button className="lb-btn lb-close" aria-label="סגור" onClick={() => setOpen(null)}>×</button>
          {items.length > 1 && (
            <>
              <button className="lb-btn lb-prev" aria-label="הקודם" onClick={(e) => (e.stopPropagation(), step(-1))}>›</button>
              <button className="lb-btn lb-next" aria-label="הבא" onClick={(e) => (e.stopPropagation(), step(1))}>‹</button>
            </>
          )}
          <figure onClick={(e) => e.stopPropagation()}>
            <img key={cur.id} src={asset(cur.src)} alt={cur.title} />
            {cur.title && <figcaption>{cur.title}</figcaption>}
          </figure>
        </div>
      )}
    </>
  );
}
