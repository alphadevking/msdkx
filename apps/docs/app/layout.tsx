import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "msdkx — Scaffold full-stack apps in seconds",
  description:
    "A TypeScript-first CLI for Next.js and Vite. TailwindCSS, ESLint, and git ready out of the box. Six templates, three package managers.",
  keywords: [
    "cli",
    "scaffold",
    "nextjs",
    "vite",
    "typescript",
    "monorepo",
    "tailwindcss",
    "template",
  ],
  authors: [{ name: "alphadevking" }],
  creator: "alphadevking",
  openGraph: {
    title: "msdkx — Scaffold full-stack apps in seconds",
    description:
      "A TypeScript-first CLI for Next.js and Vite. TailwindCSS, ESLint, and git ready out of the box.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "msdkx — Scaffold full-stack apps in seconds",
    description:
      "A TypeScript-first CLI for Next.js and Vite. TailwindCSS, ESLint, and git ready out of the box.",
    creator: "@alphadevking",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
