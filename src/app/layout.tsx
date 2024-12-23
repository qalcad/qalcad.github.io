import type { Metadata } from "next";
import "@/assets/css/globals.css";
import { RobotoMono } from "@/presentation/common/fonts";

export const metadata: Metadata = {
  title: "Qalcad - Classifieds Fortress",
  description: "Classifieds Fortress",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#F1F5F9" />
      </head>
      <body className={`${RobotoMono.className} antialiased`}>{children}</body>
    </html>
  );
}
