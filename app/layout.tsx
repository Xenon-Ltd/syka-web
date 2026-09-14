import type { Metadata } from "next";
import "./globals.css";
import { dmSans, lato, poppins } from "@/assets/font";
import { SykaOpenGraph } from "@/assets/images";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sykabank.com"),
  title: "Syka",
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
        suppressHydrationWarning
        className="font-sans antialiased"
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
