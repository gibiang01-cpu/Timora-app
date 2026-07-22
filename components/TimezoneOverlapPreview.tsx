'use client';

import { useEffect, useState } from 'react';

export function TimezoneOverlapPreview() {
  const [hour, setHour] = useState(14);
  const cities = [
    { city: 'SF', tz: 'America/Los_Angeles', offset: -8 },
    { city: 'NYC', tz: 'America/New_York', offset: -5 },
    { city: 'LDN', tz: 'Europe/London', offset: 0 },
    { city: 'TKY', tz: 'Asia/Tokyo', offset: 9 },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setHour((h) => (h + 1) % 24);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-0.5">
        <span>Overlap scan · hour {hour}:00</span>
        <span className="text-cyan-400">auto</span>
      </div>
      {cities.map((c) => {
        const localHour = ((hour + c.offset) % 24 + 24) % 24;
        const isWork = localHour >= 9 && localHour < 18;
        const pct = (localHour / 24) * 100;
        return (
          <div key={c.city} className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground w-8">{c.city}</span>
            <div className="relative flex-1 h-2 rounded-full bg-black/30 overflow-hidden">
              <div
                className={`absolute top-0 bottom-0 ${isWork ? 'bg-cyan-400/70' : 'bg-indigo-500/30'} transition-all duration-700`}
                style={{ left: `${pct}%`, width: '4%' }}
              />
            </div>
            <span className={`text-[10px] font-mono w-10 text-right ${isWork ? 'text-cyan-300' : 'text-muted-foreground'}`}>
              {localHour.toString().padStart(2, '0')}:00
            </span>
          </div>
        );
      })}
    </div>
  );
}
