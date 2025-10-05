import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cipher Systems - Reporting Portal",
  description: "Secure reporting system for Discord-related matters, security issues, data protection concerns, and safeguarding incidents.",
  keywords: ["Cipher Systems", "Security", "Reporting", "Safeguarding", "Data Protection"],
  authors: [{ name: "Cipher Systems" }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers session={null}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
