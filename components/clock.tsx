import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { motion } from "motion/react";
import { cn, getOffset, pad } from "@/utils/helpers";
import { useBreakpoint, useClock } from "@/utils/hooks";

function Clock() {
  const { hours, minutes, seconds } = useClock();
  const breakpoint = useBreakpoint();

  console.log(breakpoint);

  const possibleSeconds = Array.from({ length: 60 }, (_, i) => i);

  const offset = getOffset(breakpoint);

  return (
    <NumberFlowGroup>
      <h1 className="text-7xl md:text-9xl lg:text-[14rem] font-semibold font-mono tracking-tighter relative space-x-4 lg:space-x-12 ">
        <NumberFlow value={hours} format={{ minimumIntegerDigits: 2 }} />
        <span className="text-zinc-900/30 dark:text-zinc-100/30 align-middle text-2xl lg:text-5xl mb-4 lg:mb-10 leading-none inline-block">
          ⨯
        </span>
        <NumberFlow value={minutes} digits={{ 1: { max: 5 } }} format={{ minimumIntegerDigits: 2 }} />
        <span className="text-zinc-900/30 dark:text-zinc-100/30 align-middle text-2xl lg:text-5xl mb-4 lg:mb-10 leading-none inline-block">
          ⨯
        </span>
        <motion.div className="relative inline-flex flex-col items-center h-24 lg:h-48 gap-2">
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
                  mass: 1,
                  damping: 25,
                  stiffness: 400,
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

export default Clock;
