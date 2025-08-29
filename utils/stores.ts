import { create } from "zustand";
import { type BackdropId, FONT_CONFIGS, type FontName } from "./config";

// -- Types --
type Page = "main" | "typography" | "dividers" | "delete-dividers" | "backdrops";
type Font = FontName;
type DividerType = "symbol" | "custom";
type Backdrop = BackdropId;

interface BackdropState {
  backdrop: Backdrop;
  previewBackdrop: Backdrop | null;
  setBackdrop: (backdrop: Backdrop) => void;
  setPreviewBackdrop: (backdrop: Backdrop | null) => void;
}

interface DividerOption {
  id: string;
  label: string;
  type: DividerType;
  content: string;
}
interface FontState {
  font: Font;
  previewFont: Font | null;
  setFont: (font: Font) => void;
  setPreviewFont: (font: Font | null) => void;
  getTwVariant: () => string;
}
interface CommandMenuState {
  open: boolean;
  page: Page;
  previousPage: Page | null;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  setPage: (page: Page, previous: Page) => void;
  goBack: () => void;
}

interface DividerState {
  currentDivider: DividerOption;
  customDividers: DividerOption[];
  setDivider: (divider: DividerOption) => void;
  addCustomDivider: (label: string, svgDataUrl: string) => void;
  removeCustomDivider: (id: string) => void;
  getAllDividers: () => DividerOption[];
  getActiveDivider: () => DividerOption;
}

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// -- Constants --
const DEFAULT_DIVIDERS: DividerOption[] = [
  { id: "cross", label: "Cross", type: "symbol", content: "⨯" },
  { id: "colon", label: "Colon", type: "symbol", content: ":" },
  { id: "dot", label: "Dot", type: "symbol", content: "·" },
  { id: "pipe", label: "Pipe", type: "symbol", content: "|" },
];

// -- Stores --
export const useCommandMenuStore = create<CommandMenuState>((set, get) => ({
  open: false,
  page: "main",
  previousPage: null,
  setOpen: open => set({ open }),
  toggle: () => set(state => ({ open: !state.open })),
  setPage: (page, previous) => set({ page, previousPage: previous }),
  goBack: () => {
    const { previousPage } = get();
    if (previousPage) {
      set({ page: previousPage, previousPage: null });
    } else {
      set({ page: "main" });
    }
  },
}));

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

export const useFontStore = create<FontState>((set, get) => ({
  font: (localStorage.getItem("font") as Font) || "Jetbrains Mono",
  previewFont: null,
  setFont: font => {
    localStorage.setItem("font", font);
    set({ font, previewFont: null });
  },
  setPreviewFont: previewFont => {
    set({ previewFont });
  },
  getTwVariant: () => {
    const { font, previewFont } = get();
    const activeFont = previewFont || font;
    const config = FONT_CONFIGS.find(f => f.name === activeFont);
    return config?.twClass || FONT_CONFIGS[0].twClass;
  },
}));

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

  removeCustomDivider: id => {
    const updatedCustom = get().customDividers.filter(divider => divider.id !== id);
    localStorage.setItem("customDividers", JSON.stringify(updatedCustom));
    set({ customDividers: updatedCustom });

    if (get().currentDivider.id === id) {
      get().setDivider(DEFAULT_DIVIDERS[0]);
    }
  },

  getAllDividers: () => [...DEFAULT_DIVIDERS, ...get().customDividers],

  getActiveDivider: () => {
    const { currentDivider } = get();
    return currentDivider;
  },
}));

export const useBackdropStore = create<BackdropState>(set => ({
  backdrop: (localStorage.getItem("backdrop") as Backdrop) || "dither",
  previewBackdrop: null,
  setBackdrop: backdrop => {
    localStorage.setItem("backdrop", backdrop);
    set({ backdrop, previewBackdrop: null });
  },
  setPreviewBackdrop: previewBackdrop => {
    set({ previewBackdrop });
  },
}));
