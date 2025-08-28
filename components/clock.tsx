import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { motion } from "motion/react";
import { memo, useMemo } from "react";
import { spinTimingOptions } from "@/utils/constants";
import { cn, getOffset, pad } from "@/utils/helpers";
import { useBreakpoint, useClock } from "@/utils/hooks";
import { useDividerStore, useFontStore } from "@/utils/stores";

function Clock() {
  const { hours, minutes, seconds } = useClock();
  const breakpoint = useBreakpoint();

  const possibleSeconds = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

  const offset = useMemo(() => getOffset(breakpoint), [breakpoint]);

  const { getTwVariant } = useFontStore();
  const { currentDivider } = useDividerStore();

  const twVariant = getTwVariant();

  const renderDivider = useMemo(() => {
    if (currentDivider.type === "symbol") {
      return currentDivider.content;
    } else {
      return (
        <img
          src={currentDivider.content}
          alt={currentDivider.label}
          className="inline-block w-6 h-6 lg:w-12 lg:h-12 object-contain"
        />
      );
    }
  }, [currentDivider]);

  return (
    <NumberFlowGroup>
      <h1
        className={cn(
          "text-7xl md:text-9xl lg:text-[14rem] font-bold tracking-tight relative space-x-4 lg:space-x-12 select-none",
          twVariant
        )}
      >
        <NumberFlow value={hours} format={{ minimumIntegerDigits: 2 }} spinTiming={spinTimingOptions} />
        <span className="text-zinc-900/30 dark:text-zinc-100/30 align-middle text-2xl lg:text-5xl mb-4 lg:mb-10 leading-none inline-block">
          {renderDivider}
        </span>
        <NumberFlow
          value={minutes}
          digits={{ 1: { max: 5 } }}
          format={{ minimumIntegerDigits: 2 }}
          spinTiming={spinTimingOptions}
        />
        <span className="text-zinc-900/30 dark:text-zinc-100/30 align-middle text-2xl lg:text-5xl mb-4 lg:mb-10 leading-none inline-block">
          {renderDivider}
        </span>
        <motion.div className="relative inline-flex flex-col items-center h-24 lg:h-48 gap-2 pr-1.5">
          {possibleSeconds.map(sec => {
            const diff = Math.abs(sec - seconds);
            const angleStep = Math.PI / 5;
            const angle = diff * angleStep;
            const scale = Math.abs(Math.cos(angle));

            return (
              <motion.div
                key={sec}
                className={cn(
                  "relative inline-flex flex-col items-center h-24 md:h-42 lg:h-48 transition-opacity",
                  seconds === sec ? "opacity-100" : "opacity-15"
                )}
                animate={{
                  y: -seconds * offset,
                  scale,
                }}
                transition={{
                  type: "spring",
                  stiffness: 550,
                  damping: 30,
                  mass: 1.2,
                }}
              >
                {pad(sec)}
              </motion.div>
            );
          })}
        </motion.div>
      </h1>
    </NumberFlowGroup>
  );
}

export default memo(Clock);
