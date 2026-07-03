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
    <div className="grid grid-cols-4 gap-3 w-full">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md py-4 px-2"
          style={{ boxShadow: "inset 0.5px 1px 3px 0px rgba(173,165,165,0.35)" }}
        >
          <span
            className="font-display font-black tabular-nums leading-none"
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              color: "#FF6B35",
              textShadow: "0 0 20px rgba(255,107,53,0.6)",
            }}
          >
            {String(value).padStart(2, "0")}
          </span>
          <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
