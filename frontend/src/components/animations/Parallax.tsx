"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  ReactNode,
} from "react";


interface ParallaxProps {
  children: ReactNode;
  offset?: number;
}


export default function Parallax({
  children,
  offset = 100,
}: ParallaxProps) {


  const { scrollY } = useScroll();


  const y = useTransform(
    scrollY,
    [0, 1200],
    [0, -offset]
  );


  return (

    <motion.div

      style={{
        y,
      }}

      className="
        absolute
        inset-0
        pointer-events-none
      "

    >

      {children}


    </motion.div>

  );
}