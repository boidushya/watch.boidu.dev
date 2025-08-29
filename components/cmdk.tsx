import { useEffect } from "react";
import { useBackdropStore, useCommandMenuStore, useFontStore } from "@/utils/stores";
import { useBreakpoint } from "../utils/hooks";
import { Actions } from "./cmdk/actions";
import { BackdropsPage } from "./cmdk/backdrops";
import { DeleteDividersPage, DividersPage } from "./cmdk/dividers";
import { CommandDialog, CommandEmpty, CommandInput, CommandList } from "./cmdk/primitives";
import { TypographyPage } from "./cmdk/typography";

function CommandMenu() {
  const { open, setOpen, toggle, page, goBack } = useCommandMenuStore();
  const { setPreviewBackdrop } = useBackdropStore();
  const { setPreviewFont } = useFontStore();

  const breakpoint = useBreakpoint();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      } else if (e.key === "Backspace" && page !== "main") {
        const activeElement = document.activeElement;
        if (
          activeElement &&
          activeElement.attributes.getNamedItem("cmdk-input") === null &&
          (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")
        ) {
          return;
        }
        e.preventDefault();
        goBack();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle, page, goBack]);

  useEffect(() => {
    if (!open) {
      goBack();
      setPreviewBackdrop(null);
      setPreviewFont(null);
    }
  }, [open, goBack, setPreviewBackdrop, setPreviewFont]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      {breakpoint !== "sm" && (
        <>
          <CommandInput />
          <hr className="border-zinc-200 dark:border-zinc-800" />
        </>
      )}
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {page === "main" && <Actions />}
        {page === "typography" && <TypographyPage />}
        {page === "dividers" && <DividersPage />}
        {page === "backdrops" && <BackdropsPage />}
        {page === "delete-dividers" && <DeleteDividersPage />}
      </CommandList>
    </CommandDialog>
  );
}

export default CommandMenu;
