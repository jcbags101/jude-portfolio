"use client";

import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

const useIso = typeof window !== "undefined" ? useLayoutEffect : () => {};

function prefersReduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Shared in-view hook. Everything here follows the same rule as Reveal:
 * content renders VISIBLE by default and is only hidden once JS has
 * confirmed it is off-screen, so nothing can get stuck invisible.
 */
function useInView<T extends HTMLElement>(
  attr: string,
  threshold = 0.15,
  rootMargin = "0px 0px -6% 0px"
) {
  const ref = useRef<T | null>(null);
  // Only "idle" (visible, untouched) and "show" are React state. The "hidden"
  // start state is written straight to the DOM below, because React would
  // otherwise batch hidden+show into a single commit and the browser would
  // never see a start value to transition from.
  const [state, setState] = useState<"idle" | "show">("idle");

  useIso(() => {
    const el = ref.current;
    if (!el) return;
    // Never animate when nobody is watching. A hidden tab pauses rAF and
    // stops firing IntersectionObserver, which would otherwise leave content
    // stranded at opacity 0 for crawlers, headless renderers and background
    // tabs. Showing immediately is both correct and fail-open.
    if (
      prefersReduced() ||
      typeof IntersectionObserver === "undefined" ||
      document.visibilityState === "hidden"
    ) {
      setState("show");
      return;
    }

    // Snap to the start state without animating there, then re-enable
    // transitions and let the flip to "show" animate. Both reflows matter:
    // the first commits the hidden value, the second commits the restored
    // transition so the browser has one to run when the value changes.
    el.classList.add("no-anim");
    el.setAttribute(attr, "hidden");
    void el.offsetHeight;
    el.classList.remove("no-anim");
    void el.offsetHeight;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      // Already on screen at mount — play immediately rather than waiting.
      const id = requestAnimationFrame(() => setState("show"));
      // Safety net: rAF can be throttled or paused; guarantee the end state.
      const safety = setTimeout(() => setState("show"), 1200);
      return () => {
        cancelAnimationFrame(id);
        clearTimeout(safety);
      };
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState("show");
          obs.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);

    // If the tab is backgrounded before this scrolls into view, stop waiting
    // on an observer that will not fire and just reveal it.
    const onHide = () => {
      if (document.visibilityState === "hidden") {
        setState("show");
        obs.disconnect();
      }
    };
    document.addEventListener("visibilitychange", onHide);

    return () => {
      obs.disconnect();
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [attr, threshold, rootMargin]);

  return { ref, state };
}

/* ------------------------------------------------------------------ */
/* Masked word reveal — the editorial signature move.                   */
/* Each word gets its own overflow-hidden mask so it slides up from     */
/* behind the line above. No line measurement needed, so it survives    */
/* any wrap or breakpoint.                                              */
/* ------------------------------------------------------------------ */
export function SplitWords({
  children,
  className = "",
  as: Tag = "span",
  delay = 0,
  stagger = 42,
}: {
  children: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
}) {
  const { ref, state } = useInView<HTMLElement>("data-split");
  const words = children.split(" ");

  return (
    <Tag ref={ref} className={className} data-split={state}>
      {words.map((w, i) => (
        // The space must live OUTSIDE the mask: inside an overflow-hidden
        // inline-block it collapses and the words run together.
        <Fragment key={`${w}-${i}`}>
          <span className="split-w">
            <span
              className="split-i"
              style={{ transitionDelay: `${delay + i * stagger}ms` }}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Image wipe — a clip-path reveal, with the image scaling back to 1    */
/* so it feels like it settles rather than just fades.                  */
/* ------------------------------------------------------------------ */
export function Wipe({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  // Fires 400px before the image enters the viewport: the reveal is then
  // already done when it scrolls into view, instead of the user watching a
  // blank box animate in.
  const { ref, state } = useInView<HTMLDivElement>("data-wipe", 0, "0px 0px 400px 0px");
  return (
    <div
      ref={ref}
      data-wipe={state}
      className={`wipe ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax — small vertical drift as the element crosses the viewport. */
/* ------------------------------------------------------------------ */
export function Parallax({
  children,
  amount = 40,
  className = "",
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        if (r.bottom < 0 || r.top > vh) return;
        // -1 → 1 across the viewport
        const p = (r.top + r.height / 2 - vh / 2) / (vh / 2);
        el.style.transform = `translate3d(0, ${(p * amount).toFixed(2)}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [amount]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Count-up for the facts strip. Falls back to the final value.         */
/* ------------------------------------------------------------------ */
export function CountUp({
  value,
  className = "",
  duration = 1100,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const numeric = Number(value.replace(/[^0-9.]/g, ""));
  const isNumeric = value.trim() !== "" && !Number.isNaN(numeric);
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isNumeric || prefersReduced()) return;

    const run = () => {
      if (done.current) return;
      done.current = true;
      const start = performance.now();
      const suffix = value.replace(/[0-9.,]/g, "");
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // easeOutExpo
        const e = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setDisplay(Math.round(numeric * e).toString() + suffix);
        if (t < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      };
      requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, numeric, isNumeric, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Lenis smooth scroll — the single biggest "feels considered" change.  */
/* ------------------------------------------------------------------ */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReduced()) return;
    let lenis: import("lenis").default | undefined;
    let raf = 0;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
      });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      // Keep in-page anchors working through Lenis.
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement)?.closest?.(
          'a[href^="#"]'
        ) as HTMLAnchorElement | null;
        if (!a) return;
        const id = a.getAttribute("href")!;
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis?.scrollTo(target as HTMLElement, { offset: -80 });
      };
      document.addEventListener("click", onClick);
      (lenis as unknown as { __onClick?: typeof onClick }).__onClick = onClick;
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      const l = lenis as unknown as {
        __onClick?: (e: MouseEvent) => void;
        destroy?: () => void;
      };
      if (l?.__onClick) document.removeEventListener("click", l.__onClick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
