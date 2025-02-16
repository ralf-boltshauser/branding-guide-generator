"use client";

import { generateBrandingGuide } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandingGuide } from "@/lib/branding-guide";
import { useState } from "react";

export function AiDialog({
  onGuideGenerated,
}: {
  onGuideGenerated: (guide: BrandingGuide) => void;
}) {
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      const guide = await generateBrandingGuide({ description });
      onGuideGenerated({
        ...guide,
        icon: {
          ...guide.icon,
          backgroundStartColor: guide.primaryColor.startsWith("#")
            ? guide.primaryColor
            : `#${guide.primaryColor}`,
          backgroundEndColor: guide.accentColor.startsWith("#")
            ? guide.accentColor
            : `#${guide.accentColor}`,
        },
      });
      setIsOpen(false);
      setDescription("");
    } catch (error) {
      console.error("Failed to generate branding guide:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Generate with AI</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Branding Guide with AI</DialogTitle>
          <DialogDescription>
            Describe your brand and let AI generate a branding guide for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="description">Brand Description</Label>
            <Input
              id="description"
              placeholder="e.g., A modern tech startup focused on sustainability"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleGenerate} disabled={!description || isLoading}>
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
