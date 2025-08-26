import { create } from "zustand";

type Page = "main" | "typography" | "dividers";

interface CommandMenuState {
  open: boolean;
  page: Page;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  setPage: (page: Page) => void;
  goBack: () => void;
}

export const useCommandMenuStore = create<CommandMenuState>(set => ({
  open: false,
  page: "main",
  setOpen: open => set({ open }),
  toggle: () => set(state => ({ open: !state.open })),
  setPage: page => set({ page }),
  goBack: () => set({ page: "main" }),
}));

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const existingTheme = localStorage.getItem("theme") as "light" | "dark";
  const initialTheme = existingTheme || (systemTheme ? "dark" : "light");

  return {
    theme: initialTheme,
    toggleTheme: () => {
      const currentTheme = get().theme;
      const newTheme = currentTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      set({ theme: newTheme });
    },
  };
});

type Font = "Jetbrains Mono" | "Inter Display" | "Geist Mono" | "General Sans" | "Cabinet Grotesk" | "Satoshi";

interface FontState {
  font: Font;
  setFont: (font: Font) => void;
  getTwVariant: () => string;
}

export const useFontStore = create<FontState>((set, get) => ({
  font: (localStorage.getItem("font") as Font) || "Jetbrains Mono",
  setFont: font => {
    localStorage.setItem("font", font);
    set({ font });
  },
  getTwVariant: () => {
    const font = get().font;
    if (font === "Jetbrains Mono") return "font-jb-mono";
    if (font === "Geist Mono") return "font-geist-mono";
    if (font === "Inter Display") return "font-inter";
    if (font === "General Sans") return "font-general-sans";
    if (font === "Cabinet Grotesk") return "font-cabinet-grotesk";
    if (font === "Satoshi") return "font-satoshi";
    return "";
  },
}));

type DividerType = "symbol" | "custom";

interface DividerOption {
  id: string;
  label: string;
  type: DividerType;
  content: string; // For symbols it's the character, for custom it's the SVG data URL
}

const DEFAULT_DIVIDERS: DividerOption[] = [
  { id: "cross", label: "Cross", type: "symbol", content: "⨯" },
  { id: "colon", label: "Colon", type: "symbol", content: ":" },
  { id: "dot", label: "Dot", type: "symbol", content: "·" },
  { id: "pipe", label: "Pipe", type: "symbol", content: "|" },
];

interface DividerState {
  currentDivider: DividerOption;
  customDividers: DividerOption[];
  setDivider: (divider: DividerOption) => void;
  addCustomDivider: (label: string, svgDataUrl: string) => void;
  getAllDividers: () => DividerOption[];
}

export const useDividerStore = create<DividerState>((set, get) => ({
  currentDivider: (() => {
    const saved = localStorage.getItem("currentDivider");
    return saved ? JSON.parse(saved) : DEFAULT_DIVIDERS[0];
  })(),
  customDividers: JSON.parse(localStorage.getItem("customDividers") || "[]"),

  setDivider: divider => {
    localStorage.setItem("currentDivider", JSON.stringify(divider));
    set({ currentDivider: divider });
  },

  addCustomDivider: (label, svgDataUrl) => {
    const newDivider: DividerOption = {
      id: `custom-${Date.now()}`,
      label,
      type: "custom",
      content: svgDataUrl,
    };

    const updatedCustom = [...get().customDividers, newDivider];
    localStorage.setItem("customDividers", JSON.stringify(updatedCustom));
    set({ customDividers: updatedCustom });
    get().setDivider(newDivider);
  },

  getAllDividers: () => [...DEFAULT_DIVIDERS, ...get().customDividers],
}));
