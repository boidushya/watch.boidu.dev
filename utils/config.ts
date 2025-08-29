import type { ComponentType } from "react";
import BlobBackdrop from "@/components/backdrops/blob";
import BlurBackdrop from "@/components/backdrops/blur";
import DitheringBackdrop from "@/components/backdrops/dither";
import GalaxyBackdrop from "@/components/backdrops/galaxy";
import GrainBackdrop from "@/components/backdrops/grain";
import LiquidBackdrop from "@/components/backdrops/liquid";
import MeshBackdrop from "@/components/backdrops/mesh";
import SmokeBackdrop from "@/components/backdrops/smoke";
import SwirlBackdrop from "@/components/backdrops/swirl";
import TruchetBackdrop from "@/components/backdrops/truchet";

// -- Types --
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

// -- Constants --
export const FONT_CONFIGS: FontConfig[] = [
  { name: "Jetbrains Mono", displayName: "JetBrains Mono", twClass: "font-jb-mono" },
  { name: "Inter Display", displayName: "Inter Display", twClass: "font-inter" },
  { name: "Geist Mono", displayName: "Geist Mono", twClass: "font-geist-mono" },
  { name: "General Sans", displayName: "General Sans", twClass: "font-general-sans" },
  { name: "Cabinet Grotesk", displayName: "Cabinet Grotesk", twClass: "font-cabinet-grotesk" },
  { name: "Satoshi", displayName: "Satoshi", twClass: "font-satoshi" },
];

export const BACKDROP_CONFIGS: BackdropConfig[] = [
  { id: "blob", name: "Blob", component: BlobBackdrop },
  { id: "dither", name: "Dithering", component: DitheringBackdrop },
  { id: "galaxy", name: "Galaxy", component: GalaxyBackdrop },
  { id: "blur", name: "Blur", component: BlurBackdrop },
  { id: "grain", name: "Grain", component: GrainBackdrop },
  { id: "swirl", name: "Swirl", component: SwirlBackdrop },
  { id: "mesh", name: "Mesh", component: MeshBackdrop },
  { id: "truchet", name: "Truchet", component: TruchetBackdrop },
  { id: "liquid", name: "Liquid", component: LiquidBackdrop },
  { id: "smoke", name: "Smoke", component: SmokeBackdrop },
];

// -- Helpers --
export function getBackdropComponent(backdropId: BackdropId): ComponentType {
  const config = BACKDROP_CONFIGS.find(b => b.id === backdropId);
  return config?.component || BACKDROP_CONFIGS[0].component;
}

export type FontName = (typeof FONT_CONFIGS)[number]["name"];
export type BackdropId = (typeof BACKDROP_CONFIGS)[number]["id"];
