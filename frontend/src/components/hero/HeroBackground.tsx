"use client";

import Parallax from "@/components/animations/Parallax";
import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">


      {/* Base */}

      <div className="absolute inset-0 bg-[#FAF8F4]" />



      {/* African woven texture */}

      <div
        className="
          absolute
          inset-0 
          opacity-[0.05]
          bg-repeat
          bg-[length:360px]
        "
        style={{
          backgroundImage:
            "url('/patterns/woven.svg')",
        }}
      />



      {/* Main ecosystem glow */}

      <Parallax offset={200}>

        <motion.div

          animate={{
            scale:[1,1.08,1],
            opacity:[0.08,0.14,0.08],
          }}

          transition={{
            duration:12,
            repeat:Infinity,
            ease:"easeInOut"
          }}

          className="
            absolute
            left-1/2
            top-1/2
            h-[900px]
            w-[900px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#1F4D36]
            blur-[160px]
          "

        />

      </Parallax>




      {/* Gold wealth glow */}

      <Parallax offset={200}>

        <motion.div

          animate={{
            y:[0,20,0],
          }}

          transition={{
            duration:10,
            repeat:Infinity,
            ease:"easeInOut"
          }}

          className="
            absolute
            right-20
            top-20
            h-[400px]
            w-[400px]
            rounded-full
            bg-[#C79A3B]/20
            blur-[130px]
          "

        />

      </Parallax>



      {/* Bottom organic shadow */}

      <div
        className="
          absolute
          -bottom-40
          -left-40
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#1F4D36]/10
          blur-[150px]
        "
      />


    </div>
  );
}