import { useEffect } from "react";
import { useCommandMenuStore } from "@/utils/stores";
import { Actions } from "./cmdk/actions";
import { CommandDialog, CommandEmpty, CommandInput, CommandList } from "./cmdk/primitives";
import { TypographyPage } from "./cmdk/typography";
import { DividersPage } from "./cmdk/dividers";

function CommandMenu() {
  const { open, setOpen, toggle, page, goBack } = useCommandMenuStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      } else if (e.key === "Backspace" && page !== "main") {
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
    }
  }, [open, goBack]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput />
      <hr className="border-zinc-200 dark:border-zinc-800" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {page === "main" && <Actions />}
        {page === "typography" && <TypographyPage />}
        {page === "dividers" && <DividersPage />}
      </CommandList>
    </CommandDialog>
  );
}

export default CommandMenu;
