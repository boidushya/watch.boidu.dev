import { Swirl } from "@paper-design/shaders-react";
import { useThemeStore } from "@/utils/stores";

const darkColorVariants = [
  "hsla(0, 0%, 50%,0.5)",
  "hsla(0, 0%, 40%,0.5)",
  "hsla(0, 0%, 30%,0.5)",
  "hsla(0, 0%, 20%,0.5)",
];
const lightColorVariants = [
  "hsla(0, 0%, 80%,0.5)",
  "hsla(0, 0%, 70%,0.5)",
  "hsla(0, 0%, 60%,0.5)",
  "hsla(0, 0%, 50%,0.5)",
];

function SwirlBackdrop() {
  const { theme } = useThemeStore();

  return (
    <Swirl
      className="h-full w-full fixed inset-0 pointer-events-none z-10"
      colorBack={theme === "dark" ? "hsla(0, 0%, 0%,1)" : "hsla(0, 0%, 100%,1)"}
      bandCount={15}
      twist={1}
      softness={0}
      noiseFrequency={0.5}
      noise={0.25}
      offsetX={0}
      offsetY={0}
      scale={1}
      rotation={0}
      speed={1}
      colors={theme === "dark" ? darkColorVariants : lightColorVariants}
    />
  );
}

export default SwirlBackdrop;
