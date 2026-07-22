"use client";

import Link from "next/link";

import ConnectWallet from "./ConnectWallet";
import Container from "./ui/Container";

export default function Navbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-[#ECE8E1]
        bg-white/80
        backdrop-blur-xl
      "
    >
      <Container>

        <nav className="flex h-20 items-center justify-between">

          {/* LOGO */}

          <Link
            href="/"
            className="
              flex
              items-center
              gap-3
              transition
              hover:opacity-90
            "
          >

            <span
              className="
                text-3xl
                font-black
                tracking-tight
                text-[#1F4D36]
              "
            >
              Pamoja
            </span>

          </Link>

          {/* NAVIGATION */}

          <div
            className="
              hidden
              items-center
              gap-12
              md:flex
            "
          >

            {[
              ["Home", "/"],
              ["Communities", "/communities"],
              ["Create", "/create"],
              ["Dashboard", "/dashboard"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="
                  relative
                  text-sm
                  font-semibold
                  text-slate-600
                  transition-all
                  duration-300
                  hover:text-[#1F4D36]
                "
              >
                {label}
              </Link>
            ))}

          </div>

          {/* WALLET */}

          <ConnectWallet />

        </nav>

      </Container>

    </header>
  );
}