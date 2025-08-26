import { AnimatePresence, motion } from "motion/react";
import { MoonIcon } from "@/components/icons/moon";
import { SunIcon } from "@/components/icons/sun";
import { themeVariants } from "@/utils/constants";
import { useThemeStore } from "@/utils/stores";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="overflow-hidden rounded-lg bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={theme} variants={themeVariants} initial="initial" animate="animate" exit="exit">
          {theme === "light" ? <MoonIcon size={16} className="p-2" /> : <SunIcon size={16} className="p-2" />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
