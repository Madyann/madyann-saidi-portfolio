import { useRef, useEffect, type ReactNode, type CSSProperties } from "react";

type Corner = "bottom-left" | "bottom-right" | "top-left" | "top-right";

type TiltProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxTiltDeg?: number;        // tilt amount (deg)
  scale?: number;             // slight zoom while tilted
  glare?: boolean;            // glossy highlight overlay
  glareMaxOpacity?: number;   // 0..1 when shown
  corner?: Corner;            // fixed tilt direction
};

export default function Tilt({
  children,
  className = "",
  style,
  maxTiltDeg = 5,
  scale = 1, // was 1.02
  glare = true,
  glareMaxOpacity = 0.12,
  corner = "bottom-left",
}: TiltProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse     = matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || isCoarse) return;

    // ----- Fixed tilt toward chosen corner (does NOT change on mousemove) -----
    const rx =
      corner === "top-left"    ?  0.5 * maxTiltDeg :
      corner === "top-right"   ?  0.5 * maxTiltDeg :
      corner === "bottom-left" ? -0.5 * maxTiltDeg :
                                  -0.5 * maxTiltDeg;

    const ry =
      corner === "top-left"    ? -0.5 * maxTiltDeg :
      corner === "bottom-left" ? -0.5 * maxTiltDeg :
      corner === "top-right"   ?  0.5 * maxTiltDeg :
                                  0.5 * maxTiltDeg;

    let raf = 0;
    const setTransform = (xDeg: number, yDeg: number, s = 1) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${xDeg}deg) rotateY(${yDeg}deg) scale(${s})`;
      });
    };

    // ----- Glare follows cursor only (we don’t change transform on move) -----
    let rect = el.getBoundingClientRect();
    const measure = () => { rect = el.getBoundingClientRect(); };

    const updateGlare = (clientX: number, clientY: number) => {
      if (!glare) return;
      const g = el.querySelector<HTMLElement>("[data-tilt-glare]");
      if (!g) return;

      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;

      const nx = (clientX - cx) / (rect.width  / 2);  // -1..1
      const ny = (clientY - cy) / (rect.height / 2);  // -1..1
      const x = Math.max(-1, Math.min(1, nx));
      const y = Math.max(-1, Math.min(1, ny));

      const angle = Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
      const dist  = Math.min(1, Math.hypot(x, y)); // 0..1

      // Subtle linear highlight that tracks cursor
      g.style.opacity   = String(0.3 * glareMaxOpacity + 0.7 * glareMaxOpacity * dist);
      g.style.background =
        `linear-gradient(${angle + 90}deg, rgba(255,255,255,${0.06 + 0.10 * dist}) 0%, transparent 70%)`;
    };

    const onEnterOrFocus = (e: MouseEvent | FocusEvent) => {
      el.style.willChange = "transform";
      measure();
      setTransform(rx, ry, scale);
      // show initial glare at pointer (if mouseenter)
      if (e instanceof MouseEvent) updateGlare(e.clientX, e.clientY);
      else {
        // center-ish default for keyboard focus
        updateGlare(rect.left + rect.width * 0.6, rect.top + rect.height * 0.4);
      }
    };

    const onMove = (e: MouseEvent) => {
      measure();
      updateGlare(e.clientX, e.clientY);
    };

    const onLeaveOrBlur = () => {
      setTransform(0, 0, 1);
      const g = el.querySelector<HTMLElement>("[data-tilt-glare]");
      if (g) g.style.opacity = "0";
      el.style.willChange = "auto";
    };

    el.addEventListener("mouseenter", onEnterOrFocus);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeaveOrBlur);
    el.addEventListener("focus", onEnterOrFocus);
    el.addEventListener("blur", onLeaveOrBlur);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mouseenter", onEnterOrFocus);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeaveOrBlur);
      el.removeEventListener("focus", onEnterOrFocus);
      el.removeEventListener("blur", onLeaveOrBlur);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [corner, glare, glareMaxOpacity, maxTiltDeg, scale]);

  return (
    <div
      ref={ref}
      className={`relative transition-transform duration-200 [transform-style:preserve-3d] ${className}`}
      style={style}
      tabIndex={0}
    >
      {children}

      {glare && (
        <div
          aria-hidden
          data-tilt-glare
          className="pointer-events-none absolute inset-0 rounded-2xl z-20 [transform:translateZ(1px)]"
          style={{
            mixBlendMode: "screen",
            opacity: 0,
            transition: "opacity 120ms ease-out, background 120ms ease-out",
          }}
        />
      )}
    </div>
  );
}