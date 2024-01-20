import FONTS from "@/assets/font";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Syka",
  description: "Syka Bank",
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
      <body suppressHydrationWarning className="">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
