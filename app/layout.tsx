import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["200", "300", "400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "MicAyla | Partners in Economic & Ecosocial Empowerment",
  description: "Global Asset Management focused on impactful projects and acquisitions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${newsreader.variable} antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
