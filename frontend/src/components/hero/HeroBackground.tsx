"use client";

import Parallax from "@/components/animations/Parallax";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Base Background */}

      <div className="absolute inset-0 bg-[#FAF8F4]" />

      {/* Woven Pattern */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.08]
          bg-repeat
          bg-[length:340px]
        "
        style={{
          backgroundImage: "url('/patterns/woven.svg')",
        }}
      />

      {/* Main Green Glow */}

      <Parallax offset={40}>
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[900px]
            w-[900px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#1F4D36]/10
            blur-[140px]
          "
        />
      </Parallax>

      {/* Warm Gold Glow */}

      <Parallax offset={25}>
        <div
          className="
            absolute
            right-20
            top-24
            h-[380px]
            w-[380px]
            rounded-full
            bg-[#C79A3B]/10
            blur-[120px]
          "
        />
      </Parallax>

      {/* Organic Shape */}

      <Parallax offset={55}>
        <div
          className="
            absolute
            -left-24
            bottom-0
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#1F4D36]/5
            blur-[120px]
          "
        />
      </Parallax>

      {/* Light Spot */}

      <div
        className="
          absolute
          left-1/2
          top-10
          h-[300px]
          w-[300px]
          -translate-x-1/2
          rounded-full
          bg-white/40
          blur-[100px]
        "
      />

    </div>
  );
}