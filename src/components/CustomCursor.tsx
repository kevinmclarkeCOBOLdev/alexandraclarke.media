"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!cursor || !ring || !dot) return;

    // Set initial position out of view
    gsap.set([ring, dot], { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      
      // Instantly move the small dot
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      // Smooth lag for the outer ring
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // Event delegation for cursor badges
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("[data-cursor]");
      
      if (interactiveEl) {
        const type = interactiveEl.getAttribute("data-cursor");
        const label = interactiveEl.getAttribute("data-cursor-text") || "";
        
        if (type === "pointer") {
          // Scale ring up slightly
          gsap.to(ring, {
            scale: 1.5,
            borderColor: "#D4AF37",
            backgroundColor: "rgba(212, 175, 55, 0.1)",
            duration: 0.3,
          });
          gsap.to(dot, { scale: 0, duration: 0.2 });
        } else if (type === "badge") {
          setCursorText(label);
          gsap.to(ring, {
            width: 80,
            height: 80,
            borderColor: "#D4AF37",
            backgroundColor: "rgba(10, 10, 10, 0.9)",
            duration: 0.3,
          });
          gsap.to(dot, { scale: 0, duration: 0.2 });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("[data-cursor]");
      
      if (interactiveEl) {
        // Reset to default
        setCursorText("");
        gsap.to(ring, {
          width: 32,
          height: 32,
          scale: 1,
          borderColor: "rgba(247, 245, 240, 0.5)",
          backgroundColor: "transparent",
          duration: 0.3,
        });
        gsap.to(dot, { scale: 1, duration: 0.2 });
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`hidden lg:block pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full border border-foreground/50 transition-[width,height] duration-300 ease-out"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {cursorText && (
          <span className="font-sans text-[10px] font-bold tracking-widest text-accent uppercase">
            {cursorText}
          </span>
        )}
      </div>

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-accent"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}
