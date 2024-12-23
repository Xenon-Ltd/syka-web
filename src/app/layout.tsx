import FONTS from "@/assets/font";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { SykaOpenGraph } from "@/assets/images";
import { Analytics } from "@vercel/analytics/react"


export const metadata: Metadata = {
  title: "Syka",
  description: "SykaBank - Say hello to digital banking",
  openGraph: {
    title: "Syka",
    description: "SykaBank - Say hello to digital banking",
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${FONTS.dmSans.variable} ${FONTS.lato.variable} w-screen overflow-x-clip`}
    >
      <body suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
