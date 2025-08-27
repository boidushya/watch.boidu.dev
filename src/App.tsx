import Clock from "@/components/clock";
import CommandMenu from "@/components/cmdk";
import { ClockIcon } from "@/components/icons/clock";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Weather from "@/components/weather";
import { cn } from "@/utils/helpers";
import { useBackdropStore, useCommandMenuStore, useFontStore } from "@/utils/stores";
import { getBackdropComponent } from "@/utils/config";

function App() {
  const { getTwVariant } = useFontStore();
  const { setOpen } = useCommandMenuStore();
  const { backdrop } = useBackdropStore();

  const BackdropComponent = getBackdropComponent(backdrop);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div className="h-screen bg-gradient-to-b dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 dark:text-zinc-100 transition-colors text-zinc-900 from-zinc-200 via-zinc-100 to-zinc-200">
      <header className="flex justify-between items-center absolute top-0 left-0 w-full p-6 opacity-50 hover:opacity-100 transition-opacity z-20">
        <h1 className="text-2xl font-bold cursor-pointer" role="button" onClick={handleClick}>
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
        <a href="https://watch.boidu.dev" className={cn("text-xs hover:underline underline-offset-2", getTwVariant())}>
          watch.boidu.dev
        </a>
        <Weather />
      </footer>
      {BackdropComponent && <BackdropComponent />}
      <CommandMenu />
    </div>
  );
}

export default App;
