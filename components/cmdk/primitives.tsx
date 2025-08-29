import { Command } from "cmdk";
import type { ReactNode } from "react";
import { cn } from "@/utils/helpers";

// -- Types --
interface CommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}

interface CommandInputProps {
  placeholder?: string;
  className?: string;
}

interface CommandListProps {
  children: ReactNode;
  className?: string;
}

interface CommandEmptyProps {
  children: ReactNode;
  className?: string;
}

interface CommandGroupProps {
  heading: string;
  children: ReactNode;
  className?: string;
}

interface CommandItemProps {
  children: ReactNode;
  onSelect?: () => void;
  className?: string;
  value?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

// -- Components --
export function CommandDialog({ open, onOpenChange, children, className }: CommandDialogProps) {
  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Global Command Menu"
      loop
      className={cn("fixed inset-0 z-50", className)}
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm md:max-w-lg">
        <Command className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
          {children}
        </Command>
      </div>
    </Command.Dialog>
  );
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

export function CommandList({ children, className }: CommandListProps) {
  return <Command.List className={cn("max-h-80 overflow-y-auto p-2", className)}>{children}</Command.List>;
}

export function CommandEmpty({ children, className }: CommandEmptyProps) {
  return (
    <Command.Empty className={cn("py-6 text-center text-sm text-zinc-500 dark:text-zinc-400", className)}>
      {children}
    </Command.Empty>
  );
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

export function CommandItem({
  children,
  onSelect,
  className,
  value,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}: CommandItemProps) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      className={cn(
        "dark:text-zinc-400 text-zinc-600 relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50 data-[selected='true']:bg-zinc-100 data-[selected='true']:text-zinc-900 dark:data-[selected='true']:bg-zinc-800 dark:data-[selected='true']:text-zinc-50",
        className
      )}
    >
      {children}
    </Command.Item>
  );
}
