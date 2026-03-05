import type { Metadata } from "next";
import "./globals.css";
import { dmSans, lato } from "@/assets/font";
import { SykaOpenGraph } from "@/assets/images";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-screen overflow-x-clip">
      <body
        suppressHydrationWarning
        className={`${lato.variable} ${dmSans.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
