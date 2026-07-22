'use client';

import { useNow, ORBITAL_CITIES, formatCityTime, getCityHour } from '@/hooks/use-now';
import { Globe2 } from 'lucide-react';

const ORBITS = [
  { radius: 120, duration: 'animate-orbit-slow', counter: 'orbit-child-counter', delay: 0 },
  { radius: 170, duration: 'animate-orbit-medium', counter: 'orbit-child-counter-medium', delay: 1 },
  { radius: 215, duration: 'animate-orbit-reverse', counter: 'orbit-child-counter-reverse', delay: 2 },
];

export function OrbitalGlobe() {
  const now = useNow(1000);

  return (
    <div className="relative w-full aspect-square max-w-[520px] mx-auto select-none">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute inset-[15%] bg-violet-500/10 rounded-full blur-2xl" />

      {/* Outer dashed rings */}
      <div className="absolute inset-0 rounded-full border border-white/5 dark:border-white/5 border-black/5" />
      <div className="absolute inset-[8%] rounded-full border border-white/5 dark:border-white/5 border-black/5" />
      <div className="absolute inset-[18%] rounded-full border border-white/5 dark:border-white/5 border-black/5" />

      {/* Rotating gradient rings */}
      <div className="absolute inset-[12%] rounded-full border-2 border-transparent [background:conic-gradient(from_0deg,transparent,rgba(99,102,241,0.5),transparent_30%,transparent_60%,rgba(14,165,233,0.4),transparent)] [-webkit-mask:radial-farthest(transparent_calc(100%-2px),#000_calc(100%-1px))] [mask:radial-farthest(transparent_calc(100%-2px),#000_calc(100%-1px))] animate-orbit-slow" />

      {/* Center globe */}
      <div className="absolute inset-[38%] rounded-full bg-gradient-to-br from-indigo-500/30 via-violet-500/30 to-cyan-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-2xl glow-violet">
        <Globe2 className="w-8 h-8 text-indigo-300 animate-pulse-glow" />
      </div>
      <div className="absolute inset-[34%] rounded-full border border-indigo-500/20 animate-pulse-glow" />

      {/* City nodes on orbits */}
      {ORBITS.map((orbit, i) => {
        const city = ORBITAL_CITIES[i];
        const angle = (i * 90 + 15) * (Math.PI / 180);
        const x = Math.cos(angle) * orbit.radius;
        const y = Math.sin(angle) * orbit.radius;
        const time = formatCityTime(now, city.tz);
        const hour = getCityHour(now, city.tz);

        const isDay = hour >= 7 && hour < 19;
        const accentColor = isDay ? 'text-cyan-300' : 'text-violet-300';
        const dotColor = isDay ? 'bg-cyan-400' : 'bg-violet-400';
        const glow = isDay ? 'glow-cyan' : 'glow-violet';

        return (
          <div
            key={city.city}
            className="absolute top-1/2 left-1/2"
            style={{ width: 0, height: 0 }}
          >
            <div className={orbit.duration}>
              <div
                className="absolute"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                <div className={orbit.counter}>
                  <div className="relative -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 animate-float" style={{ animationDelay: `${orbit.delay * 0.5}s` }}>
                    <div className={`relative w-3 h-3 rounded-full ${dotColor} ${glow}`}>
                      <div className={`absolute inset-0 rounded-full ${dotColor} animate-ping opacity-60`} />
                    </div>
                    <div className="glass rounded-lg px-2.5 py-1.5 whitespace-nowrap">
                      <div className="text-[9px] uppercase tracking-wide text-muted-foreground leading-none">
                        {city.city}
                      </div>
                      <div className={`text-xs font-mono font-semibold ${accentColor} leading-tight mt-0.5`}>
                        {time}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating ambient particles */}
      {[
        { top: '12%', left: '18%', size: 'w-1.5 h-1.5', delay: '0s' },
        { top: '80%', left: '70%', size: 'w-1 h-1', delay: '1.2s' },
        { top: '30%', left: '85%', size: 'w-1 h-1', delay: '2s' },
        { top: '65%', left: '10%', size: 'w-1.5 h-1.5', delay: '0.6s' },
      ].map((p, i) => (
        <div
          key={i}
          className={`absolute ${p.size} rounded-full bg-indigo-400/60 animate-float`}
          style={{ top: p.top, left: p.left, animationDelay: p.delay }}
        />
      ))}
    </div>
  );
}
