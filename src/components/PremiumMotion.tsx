"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ReactNode } from "react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-blue via-blue-bright to-lime" style={{ scaleX }} />;
}

export function Reveal({ children, className = "", delay = 0, y = 36 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={{ opacity: 0, y: reduce ? 0 : y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

export function FloatLayer({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} animate={reduce ? undefined : { y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>{children}</motion.div>;
}

export function Parallax({ children, className = "", distance = 32 }: { children: ReactNode; className?: string; distance?: number }) {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-distance, distance]);
  return <motion.div className={className} style={{ y }}>{children}</motion.div>;
}
