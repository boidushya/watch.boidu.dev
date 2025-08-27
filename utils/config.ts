import type { ComponentType } from "react";
import BlurBackdrop from "@/components/backdrops/blur";
import DitheringBackdrop from "@/components/backdrops/dither";
import GalaxyBackdrop from "@/components/backdrops/galaxy";

export interface FontConfig {
  name: string;
  displayName: string;
  twClass: string;
}

export interface BackdropConfig {
  id: string;
  name: string;
  component: ComponentType;
}

export const FONT_CONFIGS: FontConfig[] = [
  { name: "Jetbrains Mono", displayName: "JetBrains Mono", twClass: "font-jb-mono" },
  { name: "Inter Display", displayName: "Inter Display", twClass: "font-inter" },
  { name: "Geist Mono", displayName: "Geist Mono", twClass: "font-geist-mono" },
  { name: "General Sans", displayName: "General Sans", twClass: "font-general-sans" },
  { name: "Cabinet Grotesk", displayName: "Cabinet Grotesk", twClass: "font-cabinet-grotesk" },
  { name: "Satoshi", displayName: "Satoshi", twClass: "font-satoshi" },
];

export const BACKDROP_CONFIGS: BackdropConfig[] = [
  { id: "dither", name: "Dithering", component: DitheringBackdrop },
  { id: "galaxy", name: "Galaxy", component: GalaxyBackdrop },
  { id: "blur", name: "Blur", component: BlurBackdrop },
];

export function getBackdropComponent(backdropId: BackdropId): ComponentType | null {
  const config = BACKDROP_CONFIGS.find(b => b.id === backdropId);
  return config?.component || null;
}


export type FontName = (typeof FONT_CONFIGS)[number]["name"];
export type BackdropId = (typeof BACKDROP_CONFIGS)[number]["id"];
