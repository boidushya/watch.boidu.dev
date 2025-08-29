import { useEffect, useRef } from "react";
import { useThemeStore } from "@/utils/stores";

function BlurBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useThemeStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    let animationId: number;
    let frameCount = 0;
    const scale = 3;

    const resizeCanvas = () => {
      canvas.width = Math.floor(window.innerWidth / scale);
      canvas.height = Math.floor(window.innerHeight / scale);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };

    const generatePlasma = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;

          const value1 = Math.sin(x * 0.02 + time * 0.1);
          const value2 = Math.sin(y * 0.03 + time * 0.12);
          const value3 = Math.sin((x + y) * 0.015 + time * 0.08);
          const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          const value4 = Math.sin(distance * 0.025 + time * 0.15);

          const plasma = (value1 + value2 + value3 + value4) / 4;
          const intensity = (Math.sin(plasma * Math.PI) + 1) / 2;

          let alpha, color;

          if (theme === "dark") {
            alpha = Math.floor(intensity * 20 + 15);
            color = Math.floor((1 - intensity) * 255);
          } else {
            alpha = Math.floor(intensity * 80);
            color = Math.floor(intensity * 128);
          }

          data[i] = color;
          data[i + 1] = color;
          data[i + 2] = color;
          data[i + 3] = alpha;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const animate = () => {
      frameCount++;
      if (frameCount % 3 === 0) {
        time += 0.05;
        generatePlasma();
      }
      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="h-full w-full absolute" />;
}

export default BlurBackdrop;
