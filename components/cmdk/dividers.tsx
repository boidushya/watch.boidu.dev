import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { CopyIcon } from "@/components/icons/copy";
import { DeleteIcon } from "@/components/icons/delete";
import { UploadIcon } from "@/components/icons/upload";
import { cn } from "@/utils/helpers";
import { useCommandMenuStore, useDividerStore } from "@/utils/stores";
import { CommandGroup, CommandItem } from "./primitives";

export function DividersPage() {
  const { currentDivider, getAllDividers, setDivider, addCustomDivider } = useDividerStore();
  const { setOpen, setPage } = useCommandMenuStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pasteStatus, setPasteStatus] = useState<"idle" | "processing" | "error" | "success">("idle");
  const [pasteMessage, setPasteMessage] = useState<string>("");

  const handleDividerSelect = (divider: ReturnType<typeof getAllDividers>[number]) => {
    setDivider(divider);
    setOpen(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const validateSVG = (content: string): boolean => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "image/svg+xml");
      const parseError = doc.querySelector("parsererror");

      if (parseError) {
        return false;
      }

      return doc.querySelector("svg") !== null;
    } catch {
      return false;
    }
  };

  const resetPasteStatus = () => {
    setTimeout(() => {
      setPasteStatus("idle");
      setPasteMessage("");
    }, 3000);
  };

  const processSVG = async (svgContent: string, label: string) => {
    setPasteStatus("processing");
    setPasteMessage("Processing...");

    try {
      if (!validateSVG(svgContent)) {
        throw new Error("Invalid SVG content");
      }

      const dataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgContent)))}`;
      addCustomDivider(label, dataUrl);
      setPasteStatus("success");
      setPasteMessage("SVG added successfully!");
      resetPasteStatus();
      setTimeout(() => setOpen(false), 1000);
    } catch (err) {
      setPasteStatus("error");
      setPasteMessage(err instanceof Error ? err.message : "Failed to process SVG");
      resetPasteStatus();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPasteStatus("idle");

    if (file) {
      if (file.type !== "image/svg+xml") {
        setPasteStatus("error");
        setPasteMessage("Please select a valid SVG file");
        resetPasteStatus();
        return;
      }

      const reader = new FileReader();
      reader.onload = async e => {
        const result = e.target?.result as string;
        if (result) {
          const svgContent = result.startsWith("data:")
            ? decodeURIComponent(escape(atob(result.split(",")[1])))
            : result;

          const label = file.name.replace(".svg", "");
          await processSVG(svgContent, label);
        }
      };
      reader.readAsDataURL(file);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePasteClick = async () => {
    setPasteStatus("processing");
    setPasteMessage("Reading clipboard...");

    try {
      const clipboardText = await navigator.clipboard.readText();

      if (!clipboardText.trim()) {
        setPasteStatus("error");
        setPasteMessage("Clipboard is empty");
        resetPasteStatus();
        return;
      }

      if (!clipboardText.includes("<svg")) {
        setPasteStatus("error");
        setPasteMessage("Clipboard does not contain SVG content");
        resetPasteStatus();
        return;
      }

      const label = `Pasted SVG ${Date.now()}`;
      await processSVG(clipboardText, label);
    } catch (err) {
      setPasteStatus("error");
      if (err instanceof Error && err.name === "NotAllowedError") {
        setPasteMessage("Clipboard access denied. Please allow clipboard permissions.");
      } else {
        setPasteMessage(err instanceof Error ? err.message : "Failed to paste SVG content");
      }
      resetPasteStatus();
    }
  };

  const renderDividerPreview = (divider: ReturnType<typeof getAllDividers>[number]) => {
    if (divider.type === "symbol") {
      return <span className="text-sm text-zinc-400 dark:text-zinc-500">{divider.content}</span>;
    } else {
      return <img src={divider.content} alt={divider.label} className="w-4 h-4 object-contain" />;
    }
  };

  const allDividers = getAllDividers();

  return (
    <>
      <CommandGroup heading="Built-in Dividers">
        {allDividers
          .filter(d => d.type === "symbol")
          .map(divider => (
            <CommandItem key={divider.id} value={divider.label} onSelect={() => handleDividerSelect(divider)}>
              <div className="flex items-center justify-between w-full">
                <span>{divider.label}</span>
                <div className="flex items-center gap-2">
                  {renderDividerPreview(divider)}
                  {currentDivider.id === divider.id ? " ✓" : ""}
                </div>
              </div>
            </CommandItem>
          ))}
      </CommandGroup>

      {allDividers.filter(d => d.type === "custom").length > 0 && (
        <CommandGroup heading="Custom Dividers">
          {allDividers
            .filter(d => d.type === "custom")
            .map(divider => (
              <CommandItem key={divider.id} value={divider.label} onSelect={() => handleDividerSelect(divider)}>
                <div className="flex items-center justify-between w-full">
                  <span>{divider.label}</span>
                  <div className="flex items-center gap-2">
                    {renderDividerPreview(divider)}
                    {currentDivider.id === divider.id ? " ✓" : ""}
                  </div>
                </div>
              </CommandItem>
            ))}
        </CommandGroup>
      )}

      <CommandGroup heading="Upload">
        <CommandItem
          value="Upload Custom SVG"
          onSelect={handleUploadClick}
          className="flex items-center justify-between w-full"
        >
          <span>Upload Custom SVG</span>
          <UploadIcon size={12} />
        </CommandItem>
        <CommandItem
          value="Paste Custom SVG"
          onSelect={handlePasteClick}
          className="flex items-center justify-between w-full"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={pasteStatus}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
              }}
              className={cn(
                "block",
                pasteStatus === "error" && "text-red-500 dark:text-red-400",
                pasteStatus === "success" && "text-green-500 dark:text-green-400"
              )}
            >
              {pasteStatus === "idle" ? "Paste Custom SVG" : pasteMessage}
            </motion.span>
          </AnimatePresence>
          <CopyIcon size={12} />
        </CommandItem>
      </CommandGroup>

      {allDividers.filter(d => d.type === "custom").length > 0 && (
        <CommandGroup heading="Danger Zone">
          <CommandItem
            value="Delete Custom Dividers"
            className="hover:dark:bg-red-500/30 hover:bg-red-400/30 text-red-400 dark:text-red-400 data-[selected='true']:bg-red-400/20 dark:data-[selected='true']:bg-red-400/20 data-[selected='true']:text-red-500 dark:data-[selected='true']:text-red-200"
            onSelect={() => setPage("delete-dividers", "dividers")}
          >
            <span>Delete Custom Dividers</span>
          </CommandItem>
        </CommandGroup>
      )}

      <input ref={fileInputRef} type="file" accept=".svg" onChange={handleFileChange} className="hidden" />
    </>
  );
}

export function DeleteDividersPage() {
  const { customDividers, removeCustomDivider } = useDividerStore();
  const { goBack } = useCommandMenuStore();

  const handleDeleteDivider = (dividerId: string) => {
    removeCustomDivider(dividerId);
    goBack();
  };

  const renderDividerPreview = (divider: (typeof customDividers)[number]) => {
    return <img src={divider.content} alt={divider.label} className="w-4 h-4 object-contain" />;
  };

  return (
    <>
      {customDividers.length === 0 ? (
        <CommandGroup heading="No Custom Dividers">
          <div className="px-2 py-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
            No custom dividers to delete
          </div>
        </CommandGroup>
      ) : (
        <CommandGroup heading="Select Divider to Delete">
          {customDividers.map(divider => (
            <CommandItem
              key={divider.id}
              value={`Delete ${divider.label}`}
              onSelect={() => handleDeleteDivider(divider.id)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  {renderDividerPreview(divider)}
                  <span>{divider.label}</span>
                </div>
                <span className="text-red-600 dark:text-red-400">
                  <DeleteIcon size={14} />
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      )}
    </>
  );
}
