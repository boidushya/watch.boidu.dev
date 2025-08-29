import { useCommandState } from "cmdk";
import { useCallback, useEffect, useMemo } from "react";
import { BACKDROP_CONFIGS } from "@/utils/config";
import { useBackdropStore, useCommandMenuStore } from "@/utils/stores";
import { CommandGroup, CommandItem } from "./primitives";

export function BackdropsPage() {
  const { backdrop, setBackdrop, setPreviewBackdrop } = useBackdropStore();
  const { setOpen } = useCommandMenuStore();
  const selected = useCommandState(state => state.value);

  const handleBackdropSelect = (backdropValue: typeof backdrop) => {
    setBackdrop(backdropValue);
    setOpen(false);
  };

  const handleBackdropHover = useCallback((backdropValue: typeof backdrop) => {
    setPreviewBackdrop(backdropValue);
  }, [setPreviewBackdrop]);

  const handleBackdropLeave = useCallback(() => {
    setPreviewBackdrop(null);
  }, [setPreviewBackdrop]);

  const backdropConfigMap = useMemo(() => 
    new Map(BACKDROP_CONFIGS.map(c => [c.name, c.id])), 
    []
  );

  useEffect(() => {
    const backdropId = selected ? backdropConfigMap.get(selected) : null;
    setPreviewBackdrop(backdropId || null);
  }, [selected, backdropConfigMap, setPreviewBackdrop]);

  return (
    <CommandGroup heading="Select Backdrop">
      {BACKDROP_CONFIGS.map(({ id, name }) => (
        <CommandItem
          key={id}
          value={name}
          onSelect={() => handleBackdropSelect(id)}
          onMouseEnter={() => handleBackdropHover(id)}
          onMouseLeave={handleBackdropLeave}
        >
          <span>
            {name}
            {backdrop === id ? " ✓" : ""}
          </span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
