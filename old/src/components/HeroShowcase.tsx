import { usePointerParallax } from "@/lib/motion";
import { useI18n } from "@/lib/i18n";

/**
 * The hero's animated product shot: the desktop app in a browser frame with
 * the live WhatsApp conversation floating in front of its lower corner.
 *
 * Two depth planes, each moving a different amount with the pointer, which is
 * what makes a flat PNG read as a scene. The phone deliberately isn't here —
 * three objects in a half-width column left the desktop screenshot almost
 * entirely covered, and the phone gets a full-size panel of its own in the
 * Anywhere section anyway.
 *
 * The screenshot is public/desktop.png (copied from frontend/public). The
 * WhatsApp conversation is public/whatsapp.gif, an animated recording. Swap
 * either file to refresh the shot; nothing in this component needs to change.
 */

/** Depth multipliers. Bigger = moves further with the cursor = reads as nearer. */
const PLANE = { back: 9, front: 24 };

export const HeroShowcase = () => {
  const { t } = useI18n();
  const p = usePointerParallax();

  // Both planes translate from the same pointer offset, so they stay coherent
  // as one scene rather than drifting independently.
  const plane = (depth: number) => ({
    transform: `translate3d(${p.x * depth}px, ${p.y * depth}px, 0)`,
    transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
  });

  return (
    // The sm: padding reserves room for the chat panel, which hangs below the
    // browser frame on its own layer and contributes no height of its own.
    // Below sm there is no such panel to make room for.
    <div className="relative mx-auto w-full max-w-[40rem] select-none sm:pb-10 md:pb-16">
      {/* Aurora glow behind the whole scene. */}
      <div
        className="pointer-events-none absolute -inset-16 -z-10 animate-aurora rounded-full bg-[radial-gradient(circle_at_35%_35%,hsl(var(--primary)/0.4),transparent_62%)] blur-3xl"
        aria-hidden="true"
      />

      {/* ── Back plane: the desktop app in a browser frame ──────────────── */}
      {/* Hidden on phones — see the front plane's note. */}
      <div style={plane(PLANE.back)} className="hidden w-[85%] me-auto sm:block">
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_40px_90px_-40px_rgba(2,6,23,0.6)]">
          {/* Browser chrome. Forced LTR: a macOS window doesn't mirror its
              traffic lights for Hebrew, and faking that reads as a broken
              mockup rather than a localized one. */}
          <div
            className="flex items-center gap-2 border-b border-border/60 bg-muted/60 px-3 py-2.5"
            dir="ltr"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <span className="mx-auto flex items-center gap-1.5 rounded-md bg-background/80 px-3 py-1 text-[11px] font-medium text-muted-foreground">
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              app.ansora.io
            </span>
          </div>

          <div className="relative">
            <img
              src={`${import.meta.env.BASE_URL}desktop.png`}
              alt={t("anywhere.caption_desktop")}
              width={1616}
              height={801}
              className="block w-full"
              loading="eager"
              // This is the page's Largest Contentful Paint element;
              // fetchpriority pulls it ahead of the fonts and the logo strip.
              // @ts-expect-error React 18 typings predate fetchPriority
              fetchpriority="high"
            />
            {/* Glare sweeping across the glass. */}
            <span
              className="animate-shimmer pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 bg-gradient-to-r from-transparent via-white/45 to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* ── Front plane: the live WhatsApp conversation ──────────────────
          From sm up, anchored to the OUTER corner — the page-margin side, away
          from the headline — so it overlaps the frame's corner rather than the
          interface in the middle of it.

          On a phone it is the *only* thing shown. Both at once leaves a
          desktop screenshot too small to read anything in, and of the two the
          chat is the one that carries the pitch — a phone visitor sees a
          WhatsApp conversation, which is exactly what they'd be signing up
          for. The full-size interface still gets its own panel further down,
          in the Anywhere section. */}
      <div
        style={plane(PLANE.front)}
        className="mx-auto w-fit sm:absolute sm:bottom-0 sm:end-[-3rem] sm:mx-0"
      >
        {/* Three nested elements because each owns a transform and the
            outermost one is an inline style, which beats any class: the
            parallax translate lives on the parent, the size on this element,
            and the float animation on the child. Collapsing any two of them
            silently drops one of the three transforms. */}
        <div className="origin-bottom sm:scale-[0.66] lg:scale-[0.7] xl:scale-[0.74]">
          <div className="animate-float">
            <img
              src={`${import.meta.env.BASE_URL}whatsapp.gif`}
              alt={t("hero.whatsapp_alt")}
              width={945}
              height={2048}
              className="h-auto w-[14rem] rounded-[26px] border border-border/70 bg-card shadow-[0_28px_70px_-30px_rgba(2,6,23,0.55)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
