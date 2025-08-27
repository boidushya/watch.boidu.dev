import { useCommandMenuStore, useFontStore } from "@/utils/stores";
import { CommandGroup, CommandItem } from "./primitives";
import { FONT_CONFIGS } from "@/utils/config";

export function TypographyPage() {
  const { font, setFont } = useFontStore();
  const { setOpen } = useCommandMenuStore();

  const handleFontSelect = (fontValue: typeof font) => {
    setFont(fontValue);
    setOpen(false);
  };

  return (
    <CommandGroup heading="Select Font">
      {FONT_CONFIGS.map(({ name, displayName }) => (
        <CommandItem key={name} value={displayName} onSelect={() => handleFontSelect(name)}>
          <span>
            {displayName}
            {font === name ? " ✓" : ""}
          </span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
