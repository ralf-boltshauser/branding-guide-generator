import type { Metadata } from "next";
import {
  inter,
  lato,
  lora,
  montserrat,
  openSans,
  poppins,
  raleway,
  roboto,
} from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Branding Guide Generator",
  description: "Generate beautiful branding guides for your projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} ${openSans.variable} ${lato.variable} ${montserrat.variable} ${raleway.variable} ${poppins.variable} ${lora.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
