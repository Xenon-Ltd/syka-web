import { DM_Sans, Lato, Poppins } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dmSans",
});

const poppins = Poppins({ subsets: ["latin"], weight: ["600"], variable: "--font-poppins" });

export { dmSans, lato, poppins };
