import { useEffect, useRef } from "react";

function DitheringBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    let frameCount = 0;
    const scale = 2.5;

    const resizeCanvas = () => {
      canvas.width = Math.floor(window.innerWidth / scale);
      canvas.height = Math.floor(window.innerHeight / scale);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };

    const bayerMatrix = [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5],
    ];

    const generateDithering = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const timeOffset1 = time * 0.03;
      const timeOffset2 = time * 0.04;
      const timeOffset3 = time * 0.05;

      for (let y = 0; y < canvas.height; y++) {
        const yWave = Math.cos(y * 0.025 + timeOffset2) * 0.5 + 0.5;
        const gradientY = y / canvas.height;

        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;

          const xWave = Math.sin(x * 0.02 + timeOffset1) * 0.5 + 0.5;
          const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          const circularWave = Math.sin(distance * 0.015 + timeOffset3) * 0.25 + 0.75;
          const gradientX = x / canvas.width;

          let grayscale = xWave * 0.3 + yWave * 0.3 + circularWave * 0.4;
          grayscale *= (0.7 + gradientX * 0.3) * (0.7 + gradientY * 0.3);
          grayscale = Math.pow(grayscale, 1.5);

          const threshold = bayerMatrix[y % 4][x % 4] / 16;
          const value = grayscale > threshold ? 255 : 0;
          const alpha = value === 255 ? 15 : 8;

          data[i] = value;
          data[i + 1] = value;
          data[i + 2] = value;
          data[i + 3] = alpha;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const animate = () => {
      frameCount++;
      if (frameCount % 6 === 0) {
        time++;
        generateDithering();
      }
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />;
}

export default DitheringBackdrop;