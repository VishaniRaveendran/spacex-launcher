import { Typography } from "@/components/common/Typography/Typography";
import React, { FC, useEffect, useRef } from "react";

type HeaderProps = {
  title?: string;
  description?: string;
};

const Header: FC<HeaderProps> = ({ title, description }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth * dpr;
    const height = canvas.offsetHeight * dpr;
    canvas.width = width;
    canvas.height = height;
    ctx.scale(dpr, dpr);

    const STAR_COUNT = 60;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      r: Math.random() * 1.2 + 0.8,
      speed: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      twinkle: Math.random() * Math.PI * 2,
    }));

    function drawStars() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (const star of stars) {
        if (!ctx) continue;
        ctx.save();
        ctx.globalAlpha = star.opacity * (0.7 + 0.3 * Math.sin(star.twinkle));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }
    }

    function animate() {
      if (!canvas) return;
      for (const star of stars) {
        star.y += star.speed;
        star.twinkle += 0.05 + Math.random() * 0.03;
        if (star.y > canvas.offsetHeight) {
          star.y = -2;
          star.x = Math.random() * canvas.offsetWidth;
        }
      }
      drawStars();
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <header className="relative max-w-full mx-auto flex flex-col items-center justify-center h-72 bg-[url('/header.png')] bg-full bg-center overflow-hidden">
      {/* Animated falling stars background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{ display: "block" }}
        aria-hidden="true"
      />
      {/* Overlay for darkening and color effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-blue-900/40 to-transparent opacity-80 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <Typography
          as="h1"
          useClamp={true}
          minSize={32}
          maxSize={72}
          fontWeight="800"
          className="text-white text-center mb-2 font-orbitron drop-shadow-lg tracking-wide animate-fade-in"
        >
          {title}
        </Typography>
        <Typography
          as="p"
          fontWeight="400"
          useClamp={true}
          minSize={12}
          maxSize={20}
          className="text-white text-center font-space-grotesk pt-2 w-[60%] mx-auto drop-shadow animate-fade-in"
          align="center"
        >
          {description}
        </Typography>
      </div>
    </header>
  );
};

export default Header;
