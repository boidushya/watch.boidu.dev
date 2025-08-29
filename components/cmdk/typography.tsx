import { useCommandState } from "cmdk";
import { useCallback, useEffect, useMemo } from "react";
import { FONT_CONFIGS } from "@/utils/config";
import { useCommandMenuStore, useFontStore } from "@/utils/stores";
import { CommandGroup, CommandItem } from "./primitives";

export function TypographyPage() {
  const { font, setFont, setPreviewFont } = useFontStore();
  const { setOpen } = useCommandMenuStore();
  const selected = useCommandState(state => state.value);

  const handleFontSelect = (fontValue: typeof font) => {
    setFont(fontValue);
    setOpen(false);
  };

  const handleFontHover = useCallback(
    (fontValue: typeof font) => {
      setPreviewFont(fontValue);
    },
    [setPreviewFont]
  );

  const handleFontLeave = useCallback(() => {
    setPreviewFont(null);
  }, [setPreviewFont]);

  const fontConfigMap = useMemo(() => new Map(FONT_CONFIGS.map(c => [c.displayName, c.name])), []);

  useEffect(() => {
    if (selected) {
      const fontName = fontConfigMap.get(selected);
      if (fontName) {
        setPreviewFont(fontName);
      }
    } else {
      setPreviewFont(null);
    }
  }, [selected, fontConfigMap, setPreviewFont]);

  return (
    <CommandGroup heading="Select Font">
      {FONT_CONFIGS.map(({ name, displayName }) => (
        <CommandItem
          key={name}
          value={displayName}
          onSelect={() => handleFontSelect(name)}
          onMouseEnter={() => handleFontHover(name)}
          onMouseLeave={handleFontLeave}
        >
          <span>
            {displayName}
            {font === name ? " ✓" : ""}
          </span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
