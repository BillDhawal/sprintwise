import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sprintwise - Your Personalized 30-Day Goal Planner",
  description: "Generate personalized 30-day goal plans with guided questionnaire",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
