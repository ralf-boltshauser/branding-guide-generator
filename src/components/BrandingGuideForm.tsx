"use client";

import { useGoogleFonts } from "@flyyer/use-googlefonts";
import { RefreshCw } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { BrandingGuide } from "../lib/branding-guide";
import {
  defaultFonts,
  getFontFamily,
  recommendFonts,
  webFonts,
} from "../lib/fonts";
import { availableIcons, BackgroundFillType } from "../lib/icon-generator";

// Default form data
const defaultFormData: BrandingGuide = {
  name: "",
  tagline: "",
  primaryColor: "#2563eb", // Nice blue
  secondaryColor: "#4f46e5", // Deep purple
  accentColor: "#06b6d4", // Cyan
  icon: {
    icon: "raycast-logo-neg",
    backgroundStartColor: "#2563eb",
    backgroundEndColor: "#06b6d4",
    backgroundFillType: BackgroundFillType.Linear,
    backgroundPosition: "50%,0%",
  },
  fontFamily: "Inter",
};

interface BrandingGuideFormProps {
  onSubmit: (guide: BrandingGuide) => void;
  onIconUpload: (icon: string | null) => void;
  uploadedIcon: string | null;
  initialGuide: BrandingGuide | null;
  onColorUpdate: (
    field: "primaryColor" | "secondaryColor" | "accentColor",
    value: string
  ) => void;
  currentColors: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

export default function BrandingGuideForm({
  onSubmit,
  onIconUpload,
  uploadedIcon,
  initialGuide,
  onColorUpdate,
  currentColors,
}: BrandingGuideFormProps) {
  const [formData, setFormData] = useState<BrandingGuide>(
    initialGuide || defaultFormData
  );
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [recommendedFonts, setRecommendedFonts] = useState<string[]>([]);

  // Load all web fonts for the dropdown
  const webFontConfigs = useMemo(
    () =>
      webFonts.map((font) => ({
        family: font,
        styles: ["400", "500", "600", "700"],
      })),
    []
  );

  useGoogleFonts(webFontConfigs);

  // Update form data when initialGuide changes
  useEffect(() => {
    if (initialGuide) {
      setFormData(initialGuide);
    } else {
      setFormData(defaultFormData);
    }
  }, [initialGuide]);

  // Update recommendations when colors change or refresh is clicked
  useEffect(() => {
    const newRecommendations = recommendFonts(
      formData.primaryColor,
      formData.secondaryColor,
      formData.accentColor,
      refreshCounter
    );
    setRecommendedFonts(newRecommendations);
  }, [
    formData.primaryColor,
    formData.secondaryColor,
    formData.accentColor,
    refreshCounter,
  ]);

  // Memoize color update handler
  const handleColorChange = useCallback(
    (field: "primaryColor" | "secondaryColor" | "accentColor") => {
      if (formData[field] !== currentColors[field]) {
        onColorUpdate(field, formData[field]);
      }
    },
    [formData, currentColors, onColorUpdate]
  );

  // Sync colors with parent component only when they actually change
  useEffect(() => {
    handleColorChange("primaryColor");
    handleColorChange("secondaryColor");
    handleColorChange("accentColor");
  }, [handleColorChange]);

  // Memoize font options
  const fontOptions = useMemo(
    () =>
      defaultFonts.map((font) => {
        const isWebFont = webFonts.includes(font as (typeof webFonts)[number]);
        const fontFamily = isWebFont
          ? `${font}, sans-serif`
          : getFontFamily(font);
        return (
          <SelectItem key={font} value={font} style={{ fontFamily }}>
            {font}
          </SelectItem>
        );
      }),
    []
  );

  // Memoize handlers
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    },
    [formData, onSubmit]
  );

  const handleIconUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onIconUpload(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onIconUpload]
  );

  const handleIconPreview = useCallback(() => {
    const iconUrl = `https://ray.so/icon?icon=${
      formData.icon.icon
    }&backgroundStartColor=${formData.icon.backgroundStartColor.replace(
      "#",
      "%23"
    )}&backgroundEndColor=${formData.icon.backgroundEndColor.replace(
      "#",
      "%23"
    )}&backgroundFillType=${
      formData.icon.backgroundFillType
    }&backgroundPosition=${
      formData.icon.backgroundPosition
    }&iconColor=%23FFFFFF`;
    window.open(iconUrl, "_blank");
  }, [formData.icon]);

  // Memoize form update handlers
  const handleFormUpdate = useCallback(
    (field: keyof BrandingGuide, value: string) => {
      setFormData((prev) => {
        const newData = { ...prev, [field]: value };

        // Sync colors from primary/accent to icon colors (one-way binding)
        if (field === "primaryColor") {
          newData.icon = {
            ...prev.icon,
            backgroundStartColor: value,
          };
        } else if (field === "accentColor") {
          newData.icon = {
            ...prev.icon,
            backgroundEndColor: value,
          };
        }

        return newData;
      });
    },
    []
  );

  // Memoize icon update handlers
  const handleIconUpdate = useCallback(
    (field: keyof typeof defaultFormData.icon, value: string) => {
      setFormData((prev) => ({
        ...prev,
        icon: { ...prev.icon, [field]: value },
      }));
    },
    []
  );

  // Memoize icon options
  const iconOptions = useMemo(
    () =>
      availableIcons.map((icon) => (
        <SelectItem key={icon} value={icon}>
          {icon}
        </SelectItem>
      )),
    []
  );

  // Memoize background fill type options
  const fillTypeOptions = useMemo(
    () =>
      Object.values(BackgroundFillType).map((type) => (
        <SelectItem key={type} value={type}>
          {type}
        </SelectItem>
      )),
    []
  );

  // Memoize color input components
  const ColorInput = useCallback(
    ({
      id,
      label,
      value,
      onChange,
    }: {
      id: string;
      label: string;
      value: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }) => (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <div className="relative">
          <Input
            id={id}
            type="color"
            value={value}
            onChange={onChange}
            className="h-12"
          />
          <div className="mt-2 text-sm font-mono">{value}</div>
        </div>
      </div>
    ),
    []
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">
            Create Your Brand Identity
          </CardTitle>
          <CardDescription>
            Fill out the form below to generate your brand guide
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Brand Basics Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Brand Basics</h3>
              <Separator className="my-2" />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brandName">Brand Name</Label>
                <Input
                  id="brandName"
                  value={formData.name}
                  onChange={(e) => handleFormUpdate("name", e.target.value)}
                  required
                  placeholder="Enter your brand name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={formData.tagline}
                  onChange={(e) => handleFormUpdate("tagline", e.target.value)}
                  required
                  placeholder="Enter your brand tagline"
                />
              </div>
            </div>
          </div>

          {/* Color Palette Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Color Palette</h3>
              <Separator className="my-2" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <ColorInput
                id="primaryColor"
                label="Primary Color"
                value={formData.primaryColor}
                onChange={(e) =>
                  handleFormUpdate("primaryColor", e.target.value)
                }
              />
              <ColorInput
                id="secondaryColor"
                label="Secondary Color"
                value={formData.secondaryColor}
                onChange={(e) =>
                  handleFormUpdate("secondaryColor", e.target.value)
                }
              />
              <ColorInput
                id="accentColor"
                label="Accent Color"
                value={formData.accentColor}
                onChange={(e) =>
                  handleFormUpdate("accentColor", e.target.value)
                }
              />
            </div>
          </div>

          {/* Icon Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Icon Customization</h3>
              <Separator className="my-2" />
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="w-full sm:flex-1 space-y-2">
                  <Label htmlFor="icon">Select Icon</Label>
                  <Select
                    value={formData.icon.icon}
                    onValueChange={(value) => handleIconUpdate("icon", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                    <SelectContent>{iconOptions}</SelectContent>
                  </Select>
                </div>

                {uploadedIcon && (
                  <div className="w-16 h-16 relative self-end">
                    <Image
                      src={uploadedIcon}
                      alt="Uploaded icon"
                      className="object-contain rounded-lg border"
                      fill
                      sizes="64px"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={() => onIconUpload(null)}
                    >
                      ×
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bgStartColor">Background Start Color</Label>
                  <div className="relative">
                    <Input
                      id="bgStartColor"
                      type="color"
                      value={formData.icon.backgroundStartColor}
                      onChange={(e) =>
                        handleIconUpdate("backgroundStartColor", e.target.value)
                      }
                      className="h-12"
                    />
                    <div className="mt-2 text-sm font-mono">
                      {formData.icon.backgroundStartColor}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bgEndColor">Background End Color</Label>
                  <div className="relative">
                    <Input
                      id="bgEndColor"
                      type="color"
                      value={formData.icon.backgroundEndColor}
                      onChange={(e) =>
                        handleIconUpdate("backgroundEndColor", e.target.value)
                      }
                      className="h-12"
                    />
                    <div className="mt-2 text-sm font-mono">
                      {formData.icon.backgroundEndColor}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fillType">Background Fill Type</Label>
                  <Select
                    value={formData.icon.backgroundFillType}
                    onValueChange={(value) =>
                      handleIconUpdate("backgroundFillType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select fill type" />
                    </SelectTrigger>
                    <SelectContent>{fillTypeOptions}</SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Background Position</Label>
                  <Select
                    value={formData.icon.backgroundPosition}
                    onValueChange={(value) =>
                      handleIconUpdate("backgroundPosition", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50%,0%">Top</SelectItem>
                      <SelectItem value="50%,100%">Bottom</SelectItem>
                      <SelectItem value="0%,50%">Left</SelectItem>
                      <SelectItem value="100%,50%">Right</SelectItem>
                      <SelectItem value="50%,50%">Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={handleIconPreview}
                >
                  Preview & Download Icon
                </Button>

                <div className="relative">
                  <Input
                    type="file"
                    accept="image/png"
                    onChange={handleIconUpload}
                    className="hidden"
                    id="icon-upload"
                  />
                  <Label
                    htmlFor="icon-upload"
                    className="w-full py-2 bg-secondary hover:bg-secondary/80 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background cursor-pointer"
                  >
                    Upload Downloaded Icon
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Typography Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Typography</h3>
              <Separator className="my-2" />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fontFamily">Font Family</Label>
                <Select
                  value={formData.fontFamily}
                  onValueChange={(value) =>
                    handleFormUpdate("fontFamily", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>{fontOptions}</SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Recommended Fonts</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setRefreshCounter((prev) => prev + 1);
                    }}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recommendedFonts.map((font) => {
                    const isWebFont = webFonts.includes(
                      font as (typeof webFonts)[number]
                    );
                    const fontFamily = isWebFont
                      ? `${font}, sans-serif`
                      : getFontFamily(font);
                    return (
                      <Button
                        key={font}
                        type="button"
                        variant="outline"
                        className={`w-full justify-start overflow-hidden ${
                          isWebFont
                            ? `font-${font.toLowerCase().replace(/\s+/g, "-")}`
                            : ""
                        }`}
                        style={{ fontFamily }}
                        onClick={() => {
                          handleFormUpdate("fontFamily", font);
                          // Generate new recommendations after selecting a font
                          setRefreshCounter((prev) => prev + 1);
                        }}
                      >
                        {font}
                      </Button>
                    );
                  })}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Font recommendations based on your color palette. Click
                  refresh to update.
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Generate Branding Guide
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
