"use client";
import { useImperativeHandle, useRef, type Ref } from "react";

export interface PushpaVarshaHandle {
  /** Showers `count` flowers; `grand` makes them bigger, slower and more spread out. */
  shower: (count: number, grand?: boolean) => void;
}

const KINDS = ["marigold", "marigold", "rose", "saffron", "jasmine"] as const;
const random = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * Pushpa varsha - a shower of flower petals over the screen.
 * Petals are added straight to the DOM and remove themselves when they finish falling,
 * so a shower never re-renders the page.
 */
export default function PushpaVarsha({ ref }: { ref?: Ref<PushpaVarshaHandle> }) {
  const layerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    shower(count, grand = false) {
      const layer = layerRef.current;
      if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      for (let i = 0; i < count; i++) {
        const petal = document.createElement("span");
        petal.className = `petal ${KINDS[Math.floor(Math.random() * KINDS.length)]}`;
        const duration = grand ? random(4.5, 7.5) : random(3, 4.8);
        petal.style.setProperty("--x", `${random(-2, 100)}vw`);
        petal.style.setProperty("--size", `${grand ? random(14, 26) : random(11, 19)}px`);
        petal.style.setProperty("--dur", `${duration}s`);
        petal.style.setProperty("--delay", `${random(0, grand ? 2.5 : 0.9)}s`);
        petal.style.setProperty("--drift", `${random(-18, 18)}vw`);
        petal.style.setProperty("--rot", `${random(-540, 540)}deg`);
        petal.appendChild(document.createElement("i"));
        petal.addEventListener("animationend", (event) => { if (event.target === petal) petal.remove(); });
        layer.appendChild(petal);
      }
    },
  }), []);

  return <div className="pushpa-varsha" ref={layerRef} aria-hidden="true" />;
}
