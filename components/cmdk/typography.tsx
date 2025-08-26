import { useCommandMenuStore, useFontStore } from "@/utils/stores";
import { CommandGroup, CommandItem } from "./primitives";

const FONT_OPTIONS = [
  { value: "Jetbrains Mono" },
  { value: "Geist Mono" },
  { value: "Inter Display" },
  { value: "General Sans" },
  { value: "Cabinet Grotesk" },
  { value: "Satoshi" },
] as const;

export function TypographyPage() {
  const { font, setFont } = useFontStore();
  const { setOpen } = useCommandMenuStore();

  const handleFontSelect = (fontValue: typeof font) => {
    setFont(fontValue);
    setOpen(false);
  };

  return (
    <CommandGroup heading="Select Font">
      {FONT_OPTIONS.map(({ value }) => (
        <CommandItem key={value} onSelect={() => handleFontSelect(value)}>
          <span>
            {value}
            {font === value ? " ✓" : ""}
          </span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
