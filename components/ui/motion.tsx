"use client";

import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { useRef, type ReactNode, type PointerEvent } from "react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();
  if (immediate)
    return (
      <div
        className={`reveal hero-reveal ${className}`}
        style={{ animationDelay: `${delay}s` }}
      >
        {children}
      </div>
    );
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduced ? 0 : 0.65,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress"
      style={{ scaleX }}
    />
  );
}

export function Glow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    ref.current?.style.setProperty("--glow-x", `${event.clientX - box.left}px`);
    ref.current?.style.setProperty("--glow-y", `${event.clientY - box.top}px`);
  }
  return (
    <div
      ref={ref}
      className={`glow-surface ${className}`}
      onPointerMove={onPointerMove}
    >
      {children}
    </div>
  );
}

export function ProcessLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 40%"],
  });
  return (
    <div ref={ref} className="process-line" aria-hidden="true">
      <motion.div style={{ scaleX: scrollYProgress }} />
    </div>
  );
}
