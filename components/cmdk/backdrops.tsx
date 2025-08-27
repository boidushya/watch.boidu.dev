import { useBackdropStore, useCommandMenuStore } from "@/utils/stores";
import { CommandGroup, CommandItem } from "./primitives";

const BACKDROP_OPTIONS = [
  { value: "dither", label: "Dithering" },
  { value: "galaxy", label: "Galaxy" },
  { value: "blur", label: "Blur" },
] as const;

export function BackdropsPage() {
  const { backdrop, setBackdrop } = useBackdropStore();
  const { setOpen } = useCommandMenuStore();

  const handleBackdropSelect = (backdropValue: typeof backdrop) => {
    setBackdrop(backdropValue);
    setOpen(false);
  };

  return (
    <CommandGroup heading="Select Backdrop">
      {BACKDROP_OPTIONS.map(({ value, label }) => (
        <CommandItem key={value} value={label} onSelect={() => handleBackdropSelect(value)}>
          <span>
            {label}
            {backdrop === value ? " ✓" : ""}
          </span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
