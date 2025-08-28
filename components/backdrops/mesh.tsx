import { MeshGradient } from "@paper-design/shaders-react";
import { useThemeStore } from "@/utils/stores";

const darkColorVariants = ["hsl(0,0%,70%)", "hsl(0,0%,0%)"];
const lightColorVariants = ["hsl(0,0%,100%)", "hsl(0,0%,30%)"];

function MeshBackdrop() {
  const { theme } = useThemeStore();

  return (
    <MeshGradient
      className="h-full w-full fixed inset-0 pointer-events-none z-10"
      distortion={1}
      swirl={0.5}
      offsetX={0}
      offsetY={0}
      scale={1}
      rotation={90}
      speed={1}
      colors={theme === "dark" ? darkColorVariants : lightColorVariants}
    />
  );
}

export default MeshBackdrop;
