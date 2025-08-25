import Clock from "@/components/clock";
import DitheringBackdrop from "@/components/dithering-backdrop";
import { ClockIcon } from "@/components/icons/clock";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Weather from "@/components/weather";

function App() {
  return (
    <div className="h-screen bg-gradient-to-b dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 dark:text-zinc-100 transition-colors text-zinc-900 from-zinc-200 via-zinc-100 to-zinc-200">
      <header className="flex justify-between items-center absolute top-0 left-0 w-full p-6 opacity-50 hover:opacity-100 transition-opacity z-20">
        <h1 className="text-2xl font-bold">
          <ClockIcon size={16} className="p-2" />
        </h1>
        <ThemeSwitcher />
      </header>
      <main className="flex items-center justify-center h-full">
        <div className="grid place-items-center h-[24rem] lg:h-[48rem] overflow-hidden isolation-auto relative [mask-image:linear-gradient(to_bottom,transparent,rgba(0,0,0,0.5),rgba(0,0,0,1),rgba(0,0,0,0.5),transparent)] z-50">
          <Clock />
        </div>
      </main>
      <footer className="flex justify-between items-center absolute bottom-0 w-full p-6 opacity-50 hover:opacity-100 transition-opacity z-20">
        <a href="https://watch.boidu.dev" className="font-mono text-xs hover:underline underline-offset-2">
          watch.boidu.dev
        </a>
        <Weather />
      </footer>
      <DitheringBackdrop />
    </div>
  );
}

export default App;
