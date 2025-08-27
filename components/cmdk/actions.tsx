import { useBackdropStore, useCommandMenuStore, useDividerStore, useFontStore, useThemeStore } from "@/utils/stores";
import { CommandGroup, CommandItem } from "./primitives";

const ACTION_ITEMS = [
  {
    id: "toggle-theme",
    label: "Toggle theme",
    action: "theme",
  },
  {
    id: "select-font",
    label: "Select Font",
    action: "navigate",
    page: "typography" as const,
  },
  {
    id: "select-divider",
    label: "Select Divider",
    action: "navigate",
    page: "dividers" as const,
  },
  {
    id: "select-backdrop",
    label: "Select Backdrop",
    action: "navigate",
    page: "backdrops" as const,
  },
  {
    id: "view-source",
    label: "View source",
    action: "external",
    url: "https://github.com/boidushya/watch.boidu.dev",
  },
] as const;

export function Actions() {
  const { toggleTheme } = useThemeStore();
  const { font } = useFontStore();
  const { currentDivider } = useDividerStore();
  const { backdrop } = useBackdropStore();
  const { setOpen, setPage } = useCommandMenuStore();

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
    if (item.id === "select-font") {
      return (
        <div className="flex items-center justify-between w-full">
          <span>{item.label}</span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">{font}</span>
        </div>
      );
    }
    if (item.id === "select-divider") {
      return (
        <div className="flex items-center justify-between w-full">
          <span>{item.label}</span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">{currentDivider.label}</span>
        </div>
      );
    }
    if (item.id === "select-backdrop") {
      return (
        <div className="flex items-center justify-between w-full">
          <span>{item.label}</span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500 capitalize">{backdrop}</span>
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
