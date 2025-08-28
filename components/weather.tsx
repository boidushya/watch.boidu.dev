import { memo, useMemo } from "react";
import { cn, formatLocation } from "@/utils/helpers";
import { useLocation, useWeather } from "@/utils/hooks";
import { useFontStore } from "@/utils/stores";

function Weather() {
  const { location } = useLocation();
  const { weather } = useWeather();

  const { getTwVariant } = useFontStore();

  const weatherData = useMemo(() => ({
    temperature: weather ? weather.temperature : "24",
    condition: weather ? weather.condition : "Clear",
    formattedLocation: formatLocation(location)
  }), [weather, location]);

  const twVariant = getTwVariant();

  return (
    <div className="flex items-center gap-1">
      <p className={cn("text-xs", twVariant)}>{weatherData.temperature}°C</p>
      <span className="text-zinc-900/30 dark:text-zinc-100/30">・</span>
      <p className={cn("text-xs", twVariant)}>{weatherData.condition}</p>
      <span className="text-zinc-900/30 dark:text-zinc-100/30">・</span>
      <p className={cn("text-xs", twVariant)}>{weatherData.formattedLocation}</p>
    </div>
  );
}

export default memo(Weather);
