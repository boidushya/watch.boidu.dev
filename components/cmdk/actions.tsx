import { useBackdropStore, useCommandMenuStore, useDividerStore, useFontStore, useThemeStore } from "@/utils/stores";
import { CommandGroup, CommandItem } from "./primitives";

export function Actions() {
  const { toggleTheme, theme } = useThemeStore();
  const { font } = useFontStore();
  const { currentDivider } = useDividerStore();
  const { backdrop } = useBackdropStore();
  const { setOpen, setPage } = useCommandMenuStore();

  const ACTION_ITEMS = [
    {
      id: "toggle-theme",
      label: "Toggle theme",
      action: "theme",
      selected: theme,
    },
    {
      id: "select-font",
      label: "Select Font",
      action: "navigate",
      page: "typography" as const,
      selected: font,
    },
    {
      id: "select-divider",
      label: "Select Divider",
      action: "navigate",
      page: "dividers" as const,
      selected: currentDivider.label,
    },
    {
      id: "select-backdrop",
      label: "Select Backdrop",
      action: "navigate",
      page: "backdrops" as const,
      selected: backdrop,
    },
    {
      id: "view-source",
      label: "View source",
      action: "external",
      url: "https://github.com/boidushya/watch.boidu.dev",
      selected: (
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
          />
        </svg>
      ),
    },
  ] as const;

  const handleActionSelect = (action: (typeof ACTION_ITEMS)[number]) => {
    if (action.action === "theme") {
      toggleTheme();
      setOpen(false);
    } else if (action.action === "navigate" && action.page) {
      setPage(action.page, "main");
    } else if (action.action === "external" && action.url) {
      window.open(action.url, "_blank");
      setOpen(false);
    }
  };

  const getItemLabel = (item: (typeof ACTION_ITEMS)[number]) => {
    if (item.selected) {
      return (
        <div className="flex justify-between items-center w-full">
          <span>{item.label}</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium capitalize">{item.selected}</span>
        </div>
      );
    }
    return <span>{item.label}</span>;
  };

  return (
    <CommandGroup heading="Actions">
      {ACTION_ITEMS.map(item => (
        <CommandItem key={item.id} value={item.label} onSelect={() => handleActionSelect(item)}>
          {getItemLabel(item)}
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
