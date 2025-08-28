import { LiquidMetal } from "@paper-design/shaders-react";

function LiquidBackdrop() {
  return (
    <LiquidMetal
      className="h-full w-full fixed inset-0 pointer-events-none z-10 opacity-50"
      colorBack="hsla(0, 0%, 100%, 0)"
      colorTint="hsl(0, 0%, 100%)"
      repetition={3}
      softness={0.3}
      shiftRed={0.3}
      shiftBlue={0.3}
      distortion={0.3}
      contour={0.88}
      shape="metaballs"
      offsetX={0}
      offsetY={0}
      scale={1}
      rotation={0}
      speed={1}
    />
  );
}

export default LiquidBackdrop;
