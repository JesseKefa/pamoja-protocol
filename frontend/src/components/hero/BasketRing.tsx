"use client";

import { motion } from "framer-motion";

interface BasketRingProps {
  size: number;
  opacity?: number;
}

export default function BasketRing({
  size,
  opacity = 0.25,
}: BasketRingProps) {
  return (
    <motion.div
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 120,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>

          {/* Gold Gradient */}

          <linearGradient
            id={`gold-${size}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#D8B15C"
            />

            <stop
              offset="50%"
              stopColor="#E8D29A"
            />

            <stop
              offset="100%"
              stopColor="#B8872B"
            />
          </linearGradient>

        </defs>

        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size / 2) - 2}
          fill="none"
          stroke={`url(#gold-${size})`}
          strokeWidth="2"
          strokeDasharray="8 6"
          strokeLinecap="round"
          opacity={opacity}
        />

      </svg>
    </motion.div>
  );
}