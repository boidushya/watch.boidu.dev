import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { cn } from "@/utils/helpers";

export interface ClockIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ClockIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const handTransition: Transition = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1],
};

const handVariants: Variants = {
  normal: {
    rotate: 0,
    originX: "0%",
    originY: "100%",
  },
  animate: {
    rotate: 360,
    originX: "0%",
    originY: "100%",
  },
};

const minuteHandTransition: Transition = {
  duration: 0.5,
  ease: "easeInOut",
};

const minuteHandVariants: Variants = {
  normal: {
    rotate: 0,
    originX: "0%",
    originY: "100%",
  },
  animate: {
    rotate: 180,
    originX: "0%",
    originY: "100%",
  },
};

const ClockIcon = forwardRef<ClockIconHandle, ClockIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const updateTime = () => setTime(new Date());
      updateTime();
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    }, []);

    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();

    const hourAngle = hours * 30 + minutes * 0.5 - 90;
    const minuteAngle = minutes * 6 - 90;

    const centerX = 12;
    const centerY = 12;
    const hourRadius = 4;
    const minuteRadius = 5.5;

    const hourEndX = centerX + Math.cos((hourAngle * Math.PI) / 180) * hourRadius;
    const hourEndY = centerY + Math.sin((hourAngle * Math.PI) / 180) * hourRadius;
    const minuteEndX = centerX + Math.cos((minuteAngle * Math.PI) / 180) * minuteRadius;
    const minuteEndY = centerY + Math.sin((minuteAngle * Math.PI) / 180) * minuteRadius;

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("animate");
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("normal");
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <motion.line
            x1={centerX}
            y1={centerY}
            x2={hourEndX}
            y2={hourEndY}
            variants={handVariants}
            animate={controls}
            initial="normal"
            transition={handTransition}
            strokeWidth="2"
          />
          <motion.line
            x1={centerX}
            y1={centerY}
            x2={minuteEndX}
            y2={minuteEndY}
            variants={minuteHandVariants}
            animate={controls}
            initial="normal"
            transition={minuteHandTransition}
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  }
);

ClockIcon.displayName = "ClockIcon";

export { ClockIcon };
