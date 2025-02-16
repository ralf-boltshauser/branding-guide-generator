"use client";

import { useGoogleFonts } from "@flyyer/use-googlefonts";
import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import { BrandingGuide } from "../lib/branding-guide";
import { getFontFamily, webFonts } from "../lib/fonts";
import { Button } from "./ui/button";

function ColorDisplay({ color, label }: { color: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium">{label}</h3>
      <div
        className="h-20 rounded-lg cursor-pointer relative group"
        style={{ backgroundColor: color }}
        onClick={handleCopy}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 rounded-lg">
          <span className="bg-white px-2 py-1 rounded text-sm">
            {copied ? "Copied!" : "Click to copy"}
          </span>
        </div>
      </div>
      <p
        className="text-sm font-mono cursor-pointer hover:text-blue-600"
        onClick={handleCopy}
      >
        {color}
      </p>
    </div>
  );
}

export default function BrandingGuideDisplay({
  guide,
  uploadedIcon,
}: {
  guide: BrandingGuide;
  uploadedIcon: string | null;
}) {
  const defaultIcon =
    "https://0gdvtnvfey.ufs.sh/f/jIVaTjix9anHtvsgFleUutKlNAoOpySP19jfXEJQH3CkGbrh";
  const guideRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Load the font if it's a web font
  const isWebFont = webFonts.includes(
    guide.fontFamily as (typeof webFonts)[number]
  );
  const fontConfig = isWebFont
    ? [
        {
          family: guide.fontFamily,
          styles: ["400", "500", "600", "700"],
        },
      ]
    : [];

  useGoogleFonts(fontConfig);
  const fontFamily = isWebFont
    ? `${guide.fontFamily}, sans-serif`
    : getFontFamily(guide.fontFamily);

  const handleExport = async () => {
    if (!guideRef.current) return;

    try {
      setIsExporting(true);
      const dataUrl = await toPng(guideRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        filter: (node) => {
          if (
            node.tagName === "LINK" &&
            node.getAttribute("rel") === "stylesheet"
          ) {
            return false;
          }
          return true;
        },
        fontEmbedCSS: "",
        skipFonts: true,
        style: {
          padding: "3rem",
          margin: "0",
          background: "white",
        },
      });

      const link = document.createElement("a");
      link.download = `${guide.name
        .toLowerCase()
        .replace(/\s+/g, "-")}-branding-guide.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export branding guide:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      className="space-y-4 min-h-screen p-4 fixed inset-0 overflow-auto"
      style={{
        background: `
          radial-gradient(circle at 0% 0%, ${guide.primaryColor}30 0%, transparent 50%),
          radial-gradient(circle at 100% 0%, ${guide.secondaryColor}30 0%, transparent 50%),
          radial-gradient(circle at 100% 100%, ${guide.accentColor}30 0%, transparent 50%),
          radial-gradient(circle at 0% 100%, ${guide.secondaryColor}30 0%, transparent 50%),
          linear-gradient(135deg, 
            ${guide.primaryColor}20 0%, 
            ${guide.secondaryColor}25 25%, 
            ${guide.accentColor}20 50%, 
            ${guide.secondaryColor}25 75%, 
            ${guide.primaryColor}20 100%
          )
        `,
        backgroundAttachment: "fixed",
      }}
    >
      <div
        ref={guideRef}
        className="max-w-4xl mx-auto p-8 sm:p-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          padding: "3rem",
          maxWidth: "56rem",
          margin: "3rem auto",
          width: "100%",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <div
          className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-0 mb-8"
          style={{ marginBottom: "2rem" }}
        >
          <div className="w-16 h-16 sm:mr-4 relative">
            <img
              src={uploadedIcon || defaultIcon}
              alt="Brand Icon"
              className="object-contain rounded-lg"
              style={{
                objectFit: "contain",
                borderRadius: "0.5rem",
              }}
            />
          </div>
          <div className="text-center sm:text-left">
            <h1
              style={{
                fontFamily,
                fontSize: "2.25rem",
                lineHeight: "2.5rem",
                fontWeight: 700,
                margin: 0,
              }}
              className="text-3xl sm:text-4xl font-bold"
            >
              {guide.name || "Your Brand Name"}
            </h1>
            <p
              className="text-gray-600 mt-2"
              style={{
                marginTop: "0.5rem",
                color: "rgb(75, 85, 99)",
                margin: "0.5rem 0 0 0",
              }}
            >
              {guide.tagline || "Your brand tagline goes here"}
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "1.5rem",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <ColorDisplay color={guide.primaryColor} label="Primary Color" />
          <ColorDisplay color={guide.secondaryColor} label="Secondary Color" />
          <ColorDisplay color={guide.accentColor} label="Accent Color" />
        </div>

        <div style={{ marginTop: "2rem" }}>
          <h3 className="font-medium mb-2" style={{ marginBottom: "0.5rem" }}>
            Typography
          </h3>
          <p
            style={{
              fontFamily,
              fontSize: "1.5rem",
              lineHeight: "2rem",
              margin: "0 0 1rem 0",
            }}
            className="text-xl sm:text-2xl"
          >
            {guide.fontFamily}
          </p>
          <div className="space-y-2" style={{ marginTop: "1rem" }}>
            <p
              style={{
                fontFamily,
                fontSize: "2.25rem",
                lineHeight: "2.5rem",
                margin: "0 0 0.5rem 0",
                // truncate text
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
              className=" md:text-4xl whitespace-nowrap"
            >
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </p>
            <p
              style={{
                fontFamily,
                fontSize: "2.25rem",
                lineHeight: "2.5rem",
                whiteSpace: "nowrap",
                margin: "0 0 0.5rem 0",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
              className="text-2xl sm:text-4xl whitespace-nowrap"
            >
              abcdefghijklmnopqrstuvwxyz
            </p>
            <p
              style={{
                fontFamily,
                fontSize: "2.25rem",
                lineHeight: "2.5rem",
                whiteSpace: "nowrap",
                margin: "0",
              }}
              className="text-2xl sm:text-4xl whitespace-nowrap"
            >
              0123456789
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto flex justify-end">
        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full sm:w-auto"
          style={{
            background: guide.primaryColor,
            border: "none",
            color: "white",
          }}
        >
          {isExporting ? "Exporting..." : "Export as PNG"}
        </Button>
      </div>
    </div>
  );
}
