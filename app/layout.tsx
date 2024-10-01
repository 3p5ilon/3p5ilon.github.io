import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mithrilai.xyz"),
  title: {
    default: "HackSpace",
    template: `%s | HackSpace`,
  },
  description: "A place where teens built cool shit!",
  openGraph: {
    images: "/opengraph.png",
    title: "HackSpace",
    description: "A place where teens built cool shit!",
    url: "https://mithrilai.xyz",
    siteName: "HackSpace",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "HackSpace",
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative px-8 py-2">{children}</body>
    </html>
  );
}
