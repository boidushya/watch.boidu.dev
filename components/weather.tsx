import { cn, formatLocation } from "@/utils/helpers";
import { useLocation, useWeather } from "@/utils/hooks";
import { useFontStore } from "@/utils/stores";

function Weather() {
  const { location } = useLocation();
  const { weather } = useWeather();

  const { getTwVariant } = useFontStore();

  return (
    <div className="flex items-center gap-1">
      <p className={cn("text-xs", getTwVariant())}>{weather ? weather.temperature : "24"}°C</p>
      <span className="text-zinc-900/30 dark:text-zinc-100/30">・</span>
      <p className={cn("text-xs", getTwVariant())}>{weather ? weather.condition : "Clear"}</p>
      <span className="text-zinc-900/30 dark:text-zinc-100/30">・</span>
      <p className={cn("text-xs", getTwVariant())}>{formatLocation(location)}</p>
    </div>
  );
}

export default Weather;
