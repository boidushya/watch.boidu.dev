import { SmokeRing } from "@paper-design/shaders-react";
import { useThemeStore } from "@/utils/stores";

function SmokeBackdrop() {
  const { theme } = useThemeStore();
  return (
    <SmokeRing
      className="h-full w-full absolute"
      colorBack={theme === "dark" ? "hsl(0, 0%, 90%)" : "hsl(0, 0%, 40%)"}
      noiseScale={5}
      noiseIterations={8}
      radius={0.8}
      thickness={1}
      innerShape={4}
      offsetX={0}
      offsetY={0}
      scale={1}
      rotation={0}
      speed={0.15}
      colors={theme === "dark" ? ["hsl(0, 0%, 10%)"] : ["hsl(0, 0%, 90%)"]}
    />
  );
}

export default SmokeBackdrop;
