"use client";

import Link from "next/link";
import ConnectWallet from "./ConnectWallet";
import Container from "./ui/Container";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <Container>
        <nav className="flex h-20 items-center justify-between">

          <Link
            href="/"
            className="text-3xl font-black tracking-tight text-slate-900"
          >
            Pamoja
          </Link>

          <div className="hidden gap-10 text-sm font-semibold text-slate-600 md:flex">

            <Link
              href="/"
              className="transition hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              href="/communities"
              className="transition hover:text-blue-600"
            >
              Communities
            </Link>

            <Link
              href="/create"
              className="transition hover:text-blue-600"
            >
              Create
            </Link>

          </div>

          <ConnectWallet />

        </nav>
      </Container>
    </header>
  );
}