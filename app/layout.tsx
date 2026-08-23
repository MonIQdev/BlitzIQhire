import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "blitzIQhire | AI Job Blitz",
  description: "AI that blitzes your job applications — get interviews faster.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gradient-main min-h-screen text-lavender overflow-x-hidden`}>
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
