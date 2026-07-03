import { useEffect, useRef } from "react";

export function Particles({ count = 35 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.size = Math.random() * 2 + 1;
        const colors = ["#FF5722", "#FF7043", "#FF8A65", "#FF6F00"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.55 + 0.25;
      }

      update(mx: number, my: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        if (mx !== -1000 && my !== -1000) {
          const dx = mx - this.x;
          const dy = my - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            this.x += (dx / dist) * force * 0.65;
            this.y += (dy / dist) * force * 0.65;
          }
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        // Fast fake glow instead of expensive shadowBlur
        c.globalAlpha = this.alpha * 0.3;
        c.beginPath();
        c.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    const list: Particle[] = Array.from({ length: count }, () => new Particle());

    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw constellation connections
      ctx.lineWidth = 0.55;
      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          const dx = list[i].x - list[j].x;
          const dy = list[i].y - list[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.15 * (1 - dist / 110)})`;
            ctx.beginPath();
            ctx.moveTo(list[i].x, list[i].y);
            ctx.lineTo(list[j].x, list[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of list) {
        p.update(mouse.x, mouse.y);
        p.draw(ctx);
      }

      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none -z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
