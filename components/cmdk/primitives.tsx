import { Command } from "cmdk";
import type { ReactNode } from "react";
import { cn } from "@/utils/helpers";

interface CommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}

export function CommandDialog({ open, onOpenChange, children, className }: CommandDialogProps) {
  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Global Command Menu"
      loop
      className={cn("fixed inset-0 z-50", className)}
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm md:max-w-lg">
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
          {children}
        </div>
      </div>
    </Command.Dialog>
  );
}

interface CommandInputProps {
  placeholder?: string;
  className?: string;
}

export function CommandInput({ placeholder = "Type a command or search...", className }: CommandInputProps) {
  return (
    <Command.Input
      placeholder={placeholder}
      className={cn(
        "w-full px-4 py-3 text-sm bg-transparent border-none outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-zinc-900 dark:text-zinc-100",
        className
      )}
    />
  );
}

interface CommandListProps {
  children: ReactNode;
  className?: string;
}

export function CommandList({ children, className }: CommandListProps) {
  return (
    <Command.List className={cn("max-h-80 overflow-y-auto p-2", className)}>
      {children}
    </Command.List>
  );
}

interface CommandEmptyProps {
  children: ReactNode;
  className?: string;
}

export function CommandEmpty({ children, className }: CommandEmptyProps) {
  return (
    <Command.Empty className={cn("py-6 text-center text-sm text-zinc-500 dark:text-zinc-400", className)}>
      {children}
    </Command.Empty>
  );
}

interface CommandGroupProps {
  heading: string;
  children: ReactNode;
  className?: string;
}

export function CommandGroup({ heading, children, className }: CommandGroupProps) {
  return (
    <Command.Group
      heading={heading}
      className={cn(
        "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-zinc-500/50 [&_[cmdk-group-heading]]:dark:text-zinc-400/50",
        className
      )}
    >
      {children}
    </Command.Group>
  );
}

interface CommandItemProps {
  children: ReactNode;
  onSelect?: () => void;
  className?: string;
}

export function CommandItem({ children, onSelect, className }: CommandItemProps) {
  return (
    <Command.Item
      onSelect={onSelect}
      className={cn(
        "dark:text-zinc-100 text-zinc-900 relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none data-[selected='true']:bg-zinc-100 data-[selected='true']:text-zinc-900 dark:data-[selected='true']:bg-zinc-800 dark:data-[selected='true']:text-zinc-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
    >
      {children}
    </Command.Item>
  );
}