import { useCommandMenuStore } from "@/utils/stores";
import { ClockIcon } from "./icons/clock";
import { SettingsGearIcon } from "./icons/settings";

function Header() {
  const { setOpen } = useCommandMenuStore();

  const handleOpenSettings = () => {
    setOpen(true);
  };
  return (
    <header className="flex justify-between items-center absolute top-0 left-0 w-full p-6 opacity-50 hover:opacity-100 transition-opacity z-20">
      <h1 className="text-2xl font-bold cursor-pointer relative">
        <ClockIcon size={16} className="p-2" />
      </h1>
      <div className="flex items-center gap-1">
        <button
          onClick={handleOpenSettings}
          className="overflow-hidden rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors cursor-pointer backdrop-blur-md"
          aria-label={"Open Settings"}
        >
          <SettingsGearIcon className="p-2" size={16} />
        </button>
      </div>
    </header>
  );
}

export default Header;
