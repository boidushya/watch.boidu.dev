import { GrainGradient } from "@paper-design/shaders-react";
import { useThemeStore } from "@/utils/stores";

const darkColorVariants = [
  "hsla(0, 0%, 50%, 0.5)",
  "hsla(0, 0%, 83%, 0.5)",
  "hsla(0, 0%, 50%, 0.5)",
  "hsla(0, 0%, 50%, 0.5)",
  "hsla(0, 0%, 0%, 0.5)",
];

const lightColorVariants = [
  "hsla(0, 0%, 50%, 0.5)",
  "hsla(0, 0%, 83%, 0.5)",
  "hsla(0, 0%, 50%, 0.5)",
  "hsla(0, 0%, 50%, 0.5)",
  "hsla(0, 0%, 100%, 0.5)",
];

function TruchetBackdrop() {
  const { theme } = useThemeStore();
  return (
    <GrainGradient
      className="h-full w-full absolute"
      colorBack={theme === "dark" ? "hsl(0, 0%, 0%)" : "hsl(0, 0%, 100%)"}
      softness={1}
      intensity={1}
      noise={0}
      shape="truchet"
      offsetX={0}
      offsetY={0}
      scale={1}
      rotation={0}
      speed={1}
      colors={theme === "dark" ? darkColorVariants : lightColorVariants}
    />
  );
}

export default TruchetBackdrop;
