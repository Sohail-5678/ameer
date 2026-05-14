import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/profile";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sohail-5678.github.io"),
  title: `${profile.name} — ${profile.title}`,
  description: profile.tagline,
  keywords: [
    "Ameer Sohail Shaik",
    "Machine Learning Engineer",
    "Data Scientist",
    "Portfolio",
    "RAG",
    "GenAI",
    "MLOps",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
