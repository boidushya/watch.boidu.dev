import { formatLocation } from "@/utils/helpers";
import { useLocation, useWeather } from "@/utils/hooks";

function Weather() {
  const { location } = useLocation();
  const { weather } = useWeather();

  return (
    <div className="flex items-center gap-1">
      <p className="font-mono text-xs">{weather ? weather.temperature : "24"}°C</p>
      <span className="text-zinc-900/30 dark:text-zinc-100/30">・</span>
      <p className="font-mono text-xs">{weather ? weather.condition : "Clear"}</p>
      <span className="text-zinc-900/30 dark:text-zinc-100/30">・</span>
      <p className="font-mono text-xs">{formatLocation(location)}</p>
    </div>
  );
}

export default Weather;
