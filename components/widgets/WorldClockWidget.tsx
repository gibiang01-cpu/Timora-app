'use client';

import { useEffect, useState } from 'react';
import { useNow, formatCityTime } from '@/hooks/use-now';
import { usePinnedCities, type PinnedCity } from '@/hooks/use-pinned-cities';
import { Plus, X, Search, Sunrise, Sunset, Moon, Sun } from 'lucide-react';

const CITY_DB: PinnedCity[] = [
  { id: 'sf', city: 'San Francisco', country: 'USA', tz: 'America/Los_Angeles' },
  { id: 'ny', city: 'New York', country: 'USA', tz: 'America/New_York' },
  { id: 'london', city: 'London', country: 'UK', tz: 'Europe/London' },
  { id: 'tokyo', city: 'Tokyo', country: 'Japan', tz: 'Asia/Tokyo' },
  { id: 'sydney', city: 'Sydney', country: 'Australia', tz: 'Australia/Sydney' },
  { id: 'paris', city: 'Paris', country: 'France', tz: 'Europe/Paris' },
  { id: 'berlin', city: 'Berlin', country: 'Germany', tz: 'Europe/Berlin' },
  { id: 'mumbai', city: 'Mumbai', country: 'India', tz: 'Asia/Kolkata' },
  { id: 'singapore', city: 'Singapore', country: 'Singapore', tz: 'Asia/Singapore' },
  { id: 'dubai', city: 'Dubai', country: 'UAE', tz: 'Asia/Dubai' },
  { id: 'saopaulo', city: 'São Paulo', country: 'Brazil', tz: 'America/Sao_Paulo' },
  { id: 'toronto', city: 'Toronto', country: 'Canada', tz: 'America/Toronto' },
  { id: 'chicago', city: 'Chicago', country: 'USA', tz: 'America/Chicago' },
  { id: 'hongkong', city: 'Hong Kong', country: 'China', tz: 'Asia/Hong_Kong' },
  { id: 'seoul', city: 'Seoul', country: 'South Korea', tz: 'Asia/Seoul' },
  { id: 'amsterdam', city: 'Amsterdam', country: 'Netherlands', tz: 'Europe/Amsterdam' },
  { id: 'stockholm', city: 'Stockholm', country: 'Sweden', tz: 'Europe/Stockholm' },
  { id: 'mexico', city: 'Mexico City', country: 'Mexico', tz: 'America/Mexico_City' },
  { id: 'auckland', city: 'Auckland', country: 'New Zealand', tz: 'Pacific/Auckland' },
  { id: 'cairo', city: 'Cairo', country: 'Egypt', tz: 'Africa/Cairo' },
];

function getTzOffsetHours(tz: string, date: Date): number {
  try {
    const dtf = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'shortOffset' });
    const parts = dtf.formatToParts(date);
    const tzPart = parts.find((p) => p.type === 'timeZoneName');
    if (!tzPart) return 0;
    const match = tzPart.value.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
    if (!match) return 0;
    const sign = match[1] === '+' ? 1 : -1;
    const h = parseInt(match[2], 10);
    const m = match[3] ? parseInt(match[3], 10) : 0;
    return sign * (h + m / 60);
  } catch {
    return 0;
  }
}

function dayPhase(hour: number) {
  if (hour >= 5 && hour < 8) return { label: 'Dawn', icon: Sunrise, color: 'text-amber-400' };
  if (hour >= 8 && hour < 12) return { label: 'Morning', icon: Sun, color: 'text-amber-400' };
  if (hour >= 12 && hour < 17) return { label: 'Afternoon', icon: Sun, color: 'text-cyan-400' };
  if (hour >= 17 && hour < 20) return { label: 'Evening', icon: Sunset, color: 'text-orange-400' };
  if (hour >= 20 && hour < 22) return { label: 'Dusk', icon: Sunset, color: 'text-violet-400' };
  return { label: 'Night', icon: Moon, color: 'text-indigo-400' };
}

export function WorldClockWidget() {
  const now = useNow(1000);
  const { pinned, addCity, removeCity, loaded } = usePinnedCities();
  const [showPicker, setShowPicker] = useState(false);
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const filtered = CITY_DB.filter(
    (c) =>
      c.city.toLowerCase().includes(query.toLowerCase()) &&
      !pinned.some((p) => p.tz === c.tz)
  );

  const userOffset = mounted ? -new Date().getTimezoneOffset() / 60 : 0;

  return (
    <div className="glass rounded-2xl border border-white/10 dark:border-white/10 border-black/10 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Pinned World Clocks</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {pinned.length} {pinned.length === 1 ? 'city' : 'cities'} · saved to your browser
          </p>
        </div>
        <button
          onClick={() => setShowPicker((s) => !s)}
          className="inline-flex items-center gap-2 px-4 h-9 rounded-lg bg-indigo-500/15 border border-indigo-500/40 text-indigo-400 text-sm font-medium hover:bg-indigo-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add city
        </button>
      </div>

      {showPicker && (
        <div className="mb-6 p-4 rounded-xl bg-black/20 dark:bg-black/30 border border-white/10 animate-fade-in">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a city..."
              className="w-full pl-9 pr-3 h-10 rounded-lg bg-black/30 border border-white/10 text-sm outline-none focus:border-indigo-500/50"
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  addCity(c);
                  setQuery('');
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg glass border border-white/10 hover:border-indigo-500/40 text-sm transition-all text-left"
              >
                <span>{c.city}</span>
                <span className="text-xs text-muted-foreground">{c.country}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground col-span-full text-center py-4">
                No cities found.
              </p>
            )}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pinned.map((city) => {
          const time = mounted ? formatCityTime(now, city.tz) : '--:--';
          const date = mounted
            ? new Intl.DateTimeFormat('en-US', {
                timeZone: city.tz,
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              }).format(now ?? new Date())
            : '---';
          const hour = (() => {
            if (!mounted || !now) return 0;
            return parseInt(
              new Intl.DateTimeFormat('en-US', {
                timeZone: city.tz,
                hour: '2-digit',
                hour12: false,
              }).format(now),
              10
            ) % 24;
          })();
          const phase = dayPhase(hour);
          const PhaseIcon = phase.icon;
          const offset = getTzOffsetHours(city.tz, now ?? new Date());
          const offsetDiff = mounted ? offset - userOffset : 0;
          const offsetStr = `${offsetDiff >= 0 ? '+' : ''}${offsetDiff}h`;

          return (
            <div
              key={city.id}
              className="group relative glass rounded-xl p-4 border border-white/10 dark:border-white/10 border-black/10 hover:border-indigo-500/40 transition-all"
            >
              <button
                onClick={() => removeCity(city.id)}
                className="absolute top-3 right-3 w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                aria-label={`Remove ${city.city}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <PhaseIcon className={`w-3.5 h-3.5 ${phase.color}`} />
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  {city.city}
                </span>
              </div>
              <div className="text-3xl font-mono font-semibold text-foreground mb-1">
                {time}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{date}</span>
                <span className={offsetDiff === 0 ? 'text-cyan-400' : ''}>{offsetStr}</span>
              </div>
            </div>
          );
        })}

        {pinned.length === 0 && loaded && (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            No pinned cities yet. Click &ldquo;Add city&rdquo; to start.
          </div>
        )}
      </div>
    </div>
  );
}
