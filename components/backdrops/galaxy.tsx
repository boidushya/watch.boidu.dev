import { useEffect, useRef } from "react";

function GalaxyBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let time = 0;
    const velocity = 0.015;
    let width: number, height: number;

    const MAX_OFFSET = 400;
    const SPACING = 4;
    const POINTS = MAX_OFFSET / SPACING;
    const PEAK = MAX_OFFSET * 0.25;
    const POINTS_PER_LAP = 6;
    const SHADOW_STRENGTH = 6;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const clear = () => {
      context.clearRect(0, 0, width, height);
    };

    const render = () => {
      let x: number, y: number;
      const cx = width / 2;
      const cy = height / 2;

      context.globalCompositeOperation = "lighter";
      context.strokeStyle = "#ffffff33";
      context.shadowColor = "#ffffff33";
      context.lineWidth = 2;
      context.beginPath();

      for (let i = POINTS; i > 0; i--) {
        const value = i * SPACING + (time % SPACING);

        const ax = Math.sin(value / POINTS_PER_LAP) * Math.PI;
        const ay = Math.cos(value / POINTS_PER_LAP) * Math.PI;

        x = ax * value;
        y = ay * value * 0.35;

        const o = 1 - Math.min(value, PEAK) / PEAK;

        y -= Math.pow(o, 2) * 200;
        y += (200 * value) / MAX_OFFSET;
        y += (x / cx) * width * 0.1;

        context.globalAlpha = 1 - value / MAX_OFFSET;
        context.shadowBlur = SHADOW_STRENGTH * o;

        context.lineTo(cx + x, cy + y);
        context.stroke();

        context.beginPath();
        context.moveTo(cx + x, cy + y);
      }

      context.lineTo(cx, cy - 200);
      context.lineTo(cx, 0);
      context.stroke();
    };

    const step = () => {
      time += velocity; // Constant rotation speed
      clear();
      render();
      requestAnimationFrame(step);
    };

    resize();
    step();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />;
}

export default GalaxyBackdrop;
