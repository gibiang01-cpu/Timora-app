'use client';

import { useNow, formatCityTime } from '@/hooks/use-now';
import { useEffect, useState } from 'react';

export function WorldClockPreview() {
  const now = useNow(1000);
  const cities = [
    { city: 'SF', tz: 'America/Los_Angeles' },
    { city: 'NYC', tz: 'America/New_York' },
    { city: 'LDN', tz: 'Europe/London' },
  ];
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex items-center gap-3 text-xs font-mono">
      {cities.map((c) => (
        <div key={c.city} className="flex items-center gap-1.5">
          <span className="text-muted-foreground">{c.city}</span>
          <span className="text-indigo-400">
            {mounted ? formatCityTime(now, c.tz) : '--:--'}
          </span>
        </div>
      ))}
    </div>
  );
}
