import type { Metadata } from "next";
import { Syne, Outfit, Barlow, Instrument_Serif } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CodeStarters | Empowering the Next Generation",
  description: "Student-led initiative teaching CS and AI to younger students while helping small businesses grow with free websites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${syne.variable} ${outfit.variable} ${barlow.variable} ${instrumentSerif.variable}`}>
      <body className="font-body antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
