"use client";

import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Razor-thin, sand-toned progress bar fixed to the top of the viewport.
 * Hidden on /admin pages so it doesn't fight with the admin shell header.
 */
export default function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.3,
  });

  if (pathname.startsWith("/admin")) return null;

  return (
    <motion.div
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-sand-400 via-sand-500 to-sand-600"
    />
  );
}
