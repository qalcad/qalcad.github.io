import type { Metadata } from "next";
import Script from "next/script";
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
        {/* Google Analytics Script: Start */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZMPF88DM25"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZMPF88DM25');
          `}
        </Script>
        {/* Google Analytics Script: End */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#F1F5F9" />
      </head>
      <body className={`${RobotoMono.className} antialiased`}>{children}</body>
    </html>
  );
}
