"use client";

import { AiDialog } from "@/components/AiDialog";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import BrandingGuideDisplay from "../components/BrandingGuideDisplay";
import BrandingGuideForm from "../components/BrandingGuideForm";
import { BrandingGuide } from "../lib/branding-guide";

export default function Home() {
  const [guide, setGuide] = useState<BrandingGuide | null>(null);
  const [uploadedIcon, setUploadedIcon] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [currentColors, setCurrentColors] = useState({
    primaryColor: "#2563eb",
    secondaryColor: "#4f46e5",
    accentColor: "#06b6d4",
  });

  const handleSubmit = (newGuide: BrandingGuide) => {
    setGuide(newGuide);
    setIsPreview(true);
  };

  const handleAiGenerated = (newGuide: BrandingGuide) => {
    setGuide(newGuide);
    setCurrentColors({
      primaryColor: newGuide.primaryColor,
      secondaryColor: newGuide.secondaryColor,
      accentColor: newGuide.accentColor,
    });
    setIsPreview(false);
  };

  const handleReset = () => {
    setGuide(null);
    setUploadedIcon(null);
    setIsPreview(false);
    setCurrentColors({
      primaryColor: "#2563eb",
      secondaryColor: "#4f46e5",
      accentColor: "#06b6d4",
    });
  };

  const handleEdit = () => {
    setIsPreview(false);
  };

  const handleColorUpdate = useCallback(
    (field: keyof typeof currentColors, value: string) => {
      setCurrentColors((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  // Memoize the background style
  const backgroundStyle = useMemo(
    () => ({
      backgroundImage: `
      radial-gradient(circle at 0% 0%, ${currentColors.primaryColor}30 0%, transparent 50%),
      radial-gradient(circle at 100% 0%, ${currentColors.secondaryColor}30 0%, transparent 50%),
      radial-gradient(circle at 100% 100%, ${currentColors.accentColor}30 0%, transparent 50%),
      radial-gradient(circle at 0% 100%, ${currentColors.secondaryColor}30 0%, transparent 50%),
      linear-gradient(135deg, 
        ${currentColors.primaryColor}20 0%, 
        ${currentColors.secondaryColor}25 25%, 
        ${currentColors.accentColor}20 50%, 
        ${currentColors.secondaryColor}25 75%, 
        ${currentColors.primaryColor}20 100%
      )
    `,
      backgroundAttachment: "fixed" as const,
    }),
    [currentColors]
  );

  return (
    <main
      className="min-h-screen fixed inset-0 overflow-auto"
      style={backgroundStyle}
    >
      <div className="container mx-auto p-4">
        {!isPreview ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
                Branding Guide Generator
              </h1>
              <div className="flex gap-4">
                <Button variant="outline" onClick={handleReset}>
                  Reset Form
                </Button>
                <AiDialog onGuideGenerated={handleAiGenerated} />
              </div>
            </div>
            <BrandingGuideForm
              onSubmit={handleSubmit}
              onIconUpload={setUploadedIcon}
              uploadedIcon={uploadedIcon}
              initialGuide={guide}
              onColorUpdate={handleColorUpdate}
              currentColors={currentColors}
            />
          </div>
        ) : (
          <div>
            <BrandingGuideDisplay guide={guide!} uploadedIcon={uploadedIcon} />
            <Button
              onClick={handleEdit}
              className="fixed top-5 left-5 bg-white/90 backdrop-blur-sm hover:bg-white/100"
              variant="outline"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back to Edit
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
