import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

import Web3Provider from "@/providers/Web3Provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Pamoja Protocol",
  description: "Community Finance for Africa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.variable}
          ${manrope.variable}
          bg-[#F8F5F0]
          text-[#1F2937]
          antialiased
        `}
      >
        <Web3Provider>
          {children}

          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              duration: 4000,
            }}
          />
        </Web3Provider>
      </body>
    </html>
  );
}