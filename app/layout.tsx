import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import "./legal-pages.css";
import { dmSans, lato, poppins } from "@/assets/font";
import { SykaOpenGraph } from "@/assets/images";
import { SiteFooter, SiteHeader } from "@/components/layout/site-chrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sykabank.com"),
  title: {
    default: "Syka",
    template: "%s | Syka",
  },
  description: "Syka - Payment Infrastructure For African Entrepreneurs",
  openGraph: {
    title: "Syka",
    description: "Syka - Payment Infrastructure For African Entrepreneurs",
    url: "https://www.sykabank.com",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: SykaOpenGraph.src,
        width: 1200,
        height: 675,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${dmSans.variable} ${poppins.variable} overflow-x-clip`}>
      <body
        className="font-sans antialiased"
      >
        <MotionConfig reducedMotion="user">
          <SiteHeader />
          {children}
          <SiteFooter />
        </MotionConfig>
      </body>
    </html>
  );
}
