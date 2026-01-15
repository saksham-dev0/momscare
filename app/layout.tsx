import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/lib/ConvexClientProvider";

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
  title: "Moms Care On Call | Professional Maternal Care at Your Doorstep",
  description: "Professional maternal care at your doorstep in 10 minutes. Designed for Bengaluru's nuclear families, providing peace of mind for both of you.",
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
        <ConvexClientProvider>
        {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
