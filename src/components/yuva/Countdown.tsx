import { useEffect, useState } from "react";

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

export function Countdown({ target }: { target: string }) {
  const date = new Date(target);
  const [t, setT] = useState(() => diff(date));

  useEffect(() => {
    const id = setInterval(() => setT(diff(date)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items: Array<[string, number]> = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Minutes", t.minutes],
    ["Seconds", t.seconds],
  ];

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-4 gap-2 md:gap-4">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="surface rounded-lg px-2 py-4 text-center md:py-5"
        >
          <div className="font-display text-3xl md:text-5xl font-black text-gradient tabular-nums">
            {String(value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:text-xs">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
