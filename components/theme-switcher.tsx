import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { MoonIcon } from "@/components/icons/moon";
import { SunIcon } from "@/components/icons/sun";
import { themeVariants } from "@/utils/constants";

export function ThemeSwitcher() {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const existingTheme = localStorage.getItem("theme") as "light" | "dark";

  const [theme, setTheme] = useState<"light" | "dark">(existingTheme || (systemTheme ? "dark" : "light"));

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

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
