"use client";

import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-sand-400 via-sand-500 to-sea-400"
      />
      <motion.div
        style={{ scaleX }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[59] h-8 origin-left bg-gradient-to-b from-sand-400/10 to-transparent blur-md"
      />
    </>
  );
}
