import { cn } from "@/utils/helpers";
import { useFontStore } from "@/utils/stores";
import Weather from "./weather";

function Footer() {
  const { getTwVariant } = useFontStore();
  const twVariant = getTwVariant();

  return (
    <footer className="flex justify-between items-center absolute bottom-0 w-full p-6 opacity-50 hover:opacity-100 transition-opacity z-20">
      <a href="https://watch.boidu.dev" className={cn("text-xs hover:underline underline-offset-2", twVariant)}>
        watch.boidu.dev
      </a>
      <Weather />
    </footer>
  );
}

export default Footer;
