import { useBackdropStore, useCommandMenuStore } from "@/utils/stores";
import { CommandGroup, CommandItem } from "./primitives";
import { BACKDROP_CONFIGS } from "@/utils/config";

export function BackdropsPage() {
  const { backdrop, setBackdrop } = useBackdropStore();
  const { setOpen } = useCommandMenuStore();

  const handleBackdropSelect = (backdropValue: typeof backdrop) => {
    setBackdrop(backdropValue);
    setOpen(false);
  };

  return (
    <CommandGroup heading="Select Backdrop">
      {BACKDROP_CONFIGS.map(({ id, name }) => (
        <CommandItem key={id} value={name} onSelect={() => handleBackdropSelect(id)}>
          <span>
            {name}
            {backdrop === id ? " ✓" : ""}
          </span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
