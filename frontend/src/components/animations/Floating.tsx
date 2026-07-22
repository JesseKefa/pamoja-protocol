"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingProps {
  children: ReactNode;
  duration?: number;
  distance?: number;
}

export default function Floating({
  children,
  duration = 6,
  distance = 12,
}: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: [-distance, distance, -distance],
        x: [-distance / 2, distance / 2, -distance / 2],
      }}
      transition={{
        repeat: Infinity,
        duration,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}