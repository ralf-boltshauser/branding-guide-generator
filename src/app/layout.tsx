import { Analytics } from "@vercel/analytics/react";
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
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    title: "Branding Guide Generator",
  },
  manifest: "/site.webmanifest",
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
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
