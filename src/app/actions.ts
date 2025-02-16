"use server";
import { availableIcons, BackgroundFillType } from "@/lib/icon-generator";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

export async function generateBrandingGuide({
  description,
}: {
  description: string;
}) {
  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: z.object({
      brandingGuide: z.object({
        name: z.string(),
        tagline: z.string(),
        primaryColor: z
          .string()
          .describe("The primary color of the branding guide"),
        secondaryColor: z
          .string()
          .describe("The secondary color of the branding guide"),
        accentColor: z
          .string()
          .describe(
            "A differently shaded version of the primary color (a little darker or brighter, or less saturation)."
          ),
        icon: z.object({
          icon: z.enum(availableIcons),
          backgroundStartColor: z
            .string()
            .describe("The start color of the icon background with # prefix"),
          backgroundEndColor: z
            .string()
            .describe("The end color of the icon background with # prefix"),
          backgroundFillType: z.nativeEnum(BackgroundFillType),
          backgroundPosition: z.enum([
            "50%,0%",
            "50%,100%",
            "0%,50%",
            "100%,50%",
            "50%,50%",
          ]),
        }),
        fontFamily: z
          .string()
          .describe("The font family of the branding guide"),
      }),
    }),
    prompt: `Generate a branding guide for ${description}. Ensure to take one of the allowed icons: ${availableIcons.join(
      ", "
    )}`,
  });

  return object.brandingGuide;
}
