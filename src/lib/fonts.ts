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

export enum FontCategory {
  Modern = "Modern",
  Traditional = "Traditional",
  Professional = "Professional",
  Creative = "Creative",
  Elegant = "Elegant",
  Technical = "Technical",
  Friendly = "Friendly",
  Minimalist = "Minimalist",
}

// Font category mappings
export const fontCategories: Record<string, FontCategory[]> = {
  Inter: [FontCategory.Modern, FontCategory.Minimalist, FontCategory.Technical],
  Roboto: [
    FontCategory.Modern,
    FontCategory.Professional,
    FontCategory.Technical,
  ],
  "Open Sans": [
    FontCategory.Professional,
    FontCategory.Friendly,
    FontCategory.Modern,
  ],
  Lato: [
    FontCategory.Modern,
    FontCategory.Minimalist,
    FontCategory.Professional,
  ],
  Montserrat: [
    FontCategory.Modern,
    FontCategory.Creative,
    FontCategory.Elegant,
  ],
  Raleway: [FontCategory.Creative, FontCategory.Elegant, FontCategory.Modern],
  Poppins: [FontCategory.Modern, FontCategory.Friendly, FontCategory.Creative],
  Lora: [
    FontCategory.Traditional,
    FontCategory.Elegant,
    FontCategory.Professional,
  ],
  Arial: [FontCategory.Professional, FontCategory.Minimalist],
  Helvetica: [
    FontCategory.Professional,
    FontCategory.Modern,
    FontCategory.Minimalist,
  ],
  "Times New Roman": [FontCategory.Traditional, FontCategory.Professional],
  Times: [FontCategory.Traditional, FontCategory.Professional],
  "Courier New": [FontCategory.Technical, FontCategory.Traditional],
  Courier: [FontCategory.Technical, FontCategory.Traditional],
  Verdana: [FontCategory.Professional, FontCategory.Friendly],
  Georgia: [FontCategory.Traditional, FontCategory.Elegant],
  Palatino: [FontCategory.Traditional, FontCategory.Elegant],
  Garamond: [FontCategory.Traditional, FontCategory.Elegant],
  Bookman: [FontCategory.Traditional, FontCategory.Professional],
  "Comic Sans MS": [FontCategory.Friendly, FontCategory.Creative],
  "Trebuchet MS": [FontCategory.Professional, FontCategory.Modern],
  "Arial Black": [FontCategory.Professional, FontCategory.Modern],
  Impact: [FontCategory.Creative, FontCategory.Modern],
};

// Function to recommend fonts based on color scheme
export function recommendFonts(
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
  seed?: number
): string[] {
  // Convert colors to HSL to analyze their characteristics
  const getHSL = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const primaryHSL = getHSL(primaryColor);
  const secondaryHSL = getHSL(secondaryColor);
  const accentHSL = getHSL(accentColor);

  // Determine brand characteristics based on colors
  const characteristics: FontCategory[] = [];

  // Analyze saturation and lightness
  const avgSaturation = (primaryHSL.s + secondaryHSL.s + accentHSL.s) / 3;
  const avgLightness = (primaryHSL.l + secondaryHSL.l + accentHSL.l) / 3;

  // Add categories based on color analysis
  if (avgSaturation > 70) {
    characteristics.push(FontCategory.Creative, FontCategory.Modern);
  } else if (avgSaturation < 30) {
    characteristics.push(FontCategory.Professional, FontCategory.Minimalist);
  }

  if (avgLightness > 70) {
    characteristics.push(FontCategory.Friendly, FontCategory.Modern);
  } else if (avgLightness < 30) {
    characteristics.push(FontCategory.Elegant, FontCategory.Technical);
  }

  // Get all matching fonts
  const matchingFonts = Object.entries(fontCategories)
    .filter(([, categories]) =>
      categories.some((cat) => characteristics.includes(cat))
    )
    .map(([font]) => font);

  // If no matches, use all fonts
  const fontsToChooseFrom =
    matchingFonts.length > 0 ? matchingFonts : [...defaultFonts];

  // Use seed to create deterministic but different selections each time
  const shuffled = fontsToChooseFrom
    .map((value) => ({ value, sort: (seed ?? Math.random()) * value.length }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return shuffled.slice(0, 3);
}

// Initialize fonts
const inter = Inter({ subsets: ["latin"], display: "swap" });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});
const openSans = Open_Sans({ subsets: ["latin"], display: "swap" });
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });
const raleway = Raleway({ subsets: ["latin"], display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const lora = Lora({ subsets: ["latin"], display: "swap" });

export const webFonts = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Raleway",
  "Poppins",
  "Lora",
] as const;

export const systemFonts = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Times",
  "Courier New",
  "Courier",
  "Verdana",
  "Georgia",
  "Palatino",
  "Garamond",
  "Bookman",
  "Comic Sans MS",
  "Trebuchet MS",
  "Arial Black",
  "Impact",
] as const;

export const defaultFonts = [...webFonts, ...systemFonts];

// Font class mappings for web fonts
const webFontClasses: Record<string, string> = {
  Inter: inter.className,
  Roboto: roboto.className,
  "Open Sans": openSans.className,
  Lato: lato.className,
  Montserrat: montserrat.className,
  Raleway: raleway.className,
  Poppins: poppins.className,
  Lora: lora.className,
};

// System font stacks
const systemFontStacks: Record<string, string> = {
  Arial: "Arial, sans-serif",
  Helvetica: "Helvetica, Arial, sans-serif",
  "Times New Roman": '"Times New Roman", Times, serif',
  Times: '"Times New Roman", Times, serif',
  "Courier New": '"Courier New", Courier, monospace',
  Courier: '"Courier New", Courier, monospace',
  Verdana: "Verdana, Geneva, sans-serif",
  Georgia: "Georgia, 'Times New Roman', serif",
  Palatino: '"Palatino Linotype", Palatino, serif',
  Garamond: "Garamond, serif",
  Bookman: '"Bookman Old Style", serif',
  "Comic Sans MS": '"Comic Sans MS", cursive',
  "Trebuchet MS": '"Trebuchet MS", sans-serif',
  "Arial Black": '"Arial Black", sans-serif',
  Impact: "Impact, Charcoal, sans-serif",
};

export const getFontFamily = (fontName: string): string => {
  // For web fonts, return the className
  if (webFontClasses[fontName]) {
    return webFontClasses[fontName];
  }
  // For system fonts, return the font stack
  return systemFontStacks[fontName] || fontName;
};
