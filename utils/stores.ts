import { create } from "zustand";
import { FONT_CONFIGS, type FontName, type BackdropId } from "./config";

type Page = "main" | "typography" | "dividers" | "delete-dividers" | "backdrops";

interface CommandMenuState {
  open: boolean;
  page: Page;
  previousPage: Page | null;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  setPage: (page: Page, previous: Page) => void;
  goBack: () => void;
}

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

type Font = FontName;

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
    const config = FONT_CONFIGS.find(f => f.name === font);
    return config?.twClass || "";
  },
}));

type DividerType = "symbol" | "custom";

interface DividerOption {
  id: string;
  label: string;
  type: DividerType;
  content: string;
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
  removeCustomDivider: (id: string) => void;
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

  removeCustomDivider: id => {
    const updatedCustom = get().customDividers.filter(divider => divider.id !== id);
    localStorage.setItem("customDividers", JSON.stringify(updatedCustom));
    set({ customDividers: updatedCustom });

    if (get().currentDivider.id === id) {
      get().setDivider(DEFAULT_DIVIDERS[0]);
    }
  },

  getAllDividers: () => [...DEFAULT_DIVIDERS, ...get().customDividers],
}));

type Backdrop = BackdropId;

interface BackdropState {
  backdrop: Backdrop;
  setBackdrop: (backdrop: Backdrop) => void;
}

export const useBackdropStore = create<BackdropState>((set) => ({
  backdrop: (localStorage.getItem("backdrop") as Backdrop) || "dither",
  setBackdrop: backdrop => {
    localStorage.setItem("backdrop", backdrop);
    set({ backdrop });
  },
}));
