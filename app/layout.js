import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "8-Puzzle Game | Classic Sliding Puzzle Challenge",
  description: "Get ready to tackle the 8 puzzle – slide tiles to put the numbers in order, but be prepared for a challenge! Play the classic 8-puzzle sliding game online for free.",
  keywords: "8-puzzle, sliding puzzle, puzzle game, brain teaser, logic game, number puzzle",
  authors: [{ name: "AlfaWhoCodes" }],
  openGraph: {
    title: "8-Puzzle Game | Classic Sliding Puzzle Challenge",
    description: "Get ready to tackle the 8 puzzle – slide tiles to put the numbers in order, but be prepared for a challenge!",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "8-Puzzle Game | Classic Sliding Puzzle Challenge",
    description: "Get ready to tackle the 8 puzzle – slide tiles to put the numbers in order, but be prepared for a challenge!",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
