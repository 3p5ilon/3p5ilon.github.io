import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mithrilai.xyz"),
  title: {
    default: "HackSpace",
    template: `%s | HackSpace`,
  },
  description: "Open Science AI Research Lab",
  openGraph: {
    images: "/opengraph.png",
    title: "HackSpace",
    description: "Open Science AI Research Lab",
    url: "https://mithrilai.xyz",
    siteName: "Mithril AI",
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
    title: "MithrilAI",
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
