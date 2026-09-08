"use client";

import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.3,
  });

  if (pathname.startsWith("/admin")) return null;

  return (
    <motion.div
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[1.5px] origin-left bg-gradient-to-r from-sand-300 via-sand-500 to-sea-400"
    />
  );
}
