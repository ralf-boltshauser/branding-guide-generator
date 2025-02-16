import {
  Inter,
  Lato,
  Lora,
  Montserrat,
  Open_Sans,
  Poppins,
  Raleway,
  Roboto,
} from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

export const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});
