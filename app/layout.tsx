import type { Metadata } from "next";
import { Suspense } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Sprintwise - Your Personalized 30-Day Goal Planner",
  description: "Generate personalized 30-day goal plans. Print as wall posters, planners, or diary inserts. Perfect for yourself or as a gift.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased bg-canvas text-text-primary font-sans">
        <Suspense fallback={<nav className="h-16 bg-white/95 border-b border-border-light" />}>
          <Nav />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
