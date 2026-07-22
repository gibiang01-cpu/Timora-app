'use client';

import { useEffect, useMemo, useState } from 'react';
import { Plus, X, Users, Clock, Sun, Moon } from 'lucide-react';

interface CityTZ { id: string; city: string; tz: string; }

const CITY_OPTIONS: CityTZ[] = [
  { id: 'sf', city: 'San Francisco', tz: 'America/Los_Angeles' },
  { id: 'ny', city: 'New York', tz: 'America/New_York' },
  { id: 'london', city: 'London', tz: 'Europe/London' },
  { id: 'tokyo', city: 'Tokyo', tz: 'Asia/Tokyo' },
  { id: 'sydney', city: 'Sydney', tz: 'Australia/Sydney' },
  { id: 'paris', city: 'Paris', tz: 'Europe/Paris' },
  { id: 'berlin', city: 'Berlin', tz: 'Europe/Berlin' },
  { id: 'mumbai', city: 'Mumbai', tz: 'Asia/Kolkata' },
  { id: 'singapore', city: 'Singapore', tz: 'Asia/Singapore' },
  { id: 'dubai', city: 'Dubai', tz: 'Asia/Dubai' },
  { id: 'saopaulo', city: 'São Paulo', tz: 'America/Sao_Paulo' },
  { id: 'seoul', city: 'Seoul', tz: 'Asia/Seoul' },
  { id: 'auckland', city: 'Auckland', tz: 'Pacific/Auckland' },
  { id: 'hongkong', city: 'Hong Kong', tz: 'Asia/Hong_Kong' },
];

function getOffset(tz: string, date: Date): number {
  try {
    const dtf = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'longOffset' });
    const parts = dtf.formatToParts(date);
    const tzPart = parts.find((p) => p.type === 'timeZoneName');
    if (!tzPart) return 0;
    const m = tzPart.value.match(/GMT([+-])(\d{1,2}):?(\d{2})?/);
    if (!m) return 0;
    const sign = m[1] === '+' ? 1 : -1;
    return sign * (parseInt(m[2], 10) + (m[3] ? parseInt(m[3], 10) / 60 : 0));
  } catch {
    return 0;
  }
}

export function TimezoneOverlapWidget() {
  const [selected, setSelected] = useState<CityTZ[]>([
    { id: 'sf', city: 'San Francisco', tz: 'America/Los_Angeles' },
    { id: 'london', city: 'London', tz: 'Europe/London' },
    { id: 'tokyo', city: 'Tokyo', tz: 'Asia/Tokyo' },
  ]);
  const [workStart, setWorkStart] = useState(9);
  const [workEnd, setWorkEnd] = useState(17);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const refDate = now ?? new Date();
  const offsets = useMemo(
    () => selected.map((c) => ({ ...c, offset: getOffset(c.tz, refDate) })),
    [selected, refDate]
  );

  const overlapHours = useMemo(() => {
    const result: number[] = [];
    for (let h = 0; h < 24; h++) {
      const allIn = offsets.every((c) => {
        const localHour = ((h + c.offset) % 24 + 24) % 24;
        return localHour >= workStart && localHour < workEnd;
      });
      if (allIn) result.push(h);
    }
    return result;
  }, [offsets, workStart, workEnd]);

  const available = CITY_OPTIONS.filter((c) => !selected.some((s) => s.id === c.id));

  const handleStartChange = (v: number) => {
    setWorkStart(Math.min(v, workEnd - 1));
  };
  const handleEndChange = (v: number) => {
    setWorkEnd(Math.max(v, workStart + 1));
  };

  return (
    <div className="glass rounded-2xl border border-white/10 dark:border-white/10 border-black/10 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-semibold">Time Zone Overlap Finder</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Find working hours that work for everyone.
          </p>
        </div>
        <button
          onClick={() => setPickerOpen((s) => !s)}
          className="inline-flex items-center gap-2 px-4 h-9 rounded-lg bg-indigo-500/15 border border-indigo-500/40 text-indigo-400 text-sm font-medium hover:bg-indigo-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add city
        </button>
      </div>

      {pickerOpen && (
        <div className="mb-6 p-4 rounded-xl bg-black/20 dark:bg-black/30 border border-white/10 animate-fade-in">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {available.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelected((prev) => [...prev, c]);
                  setPickerOpen(false);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg glass border border-white/10 hover:border-indigo-500/40 text-sm transition-all text-left"
              >
                <span>{c.city}</span>
              </button>
            ))}
            {available.length === 0 && (
              <p className="text-sm text-muted-foreground col-span-full text-center py-3">All cities added.</p>
            )}
          </div>
        </div>
      )}

      <div className="mb-6 p-5 rounded-xl bg-black/20 dark:bg-black/30 border border-white/5">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-medium">Working hours window</span>
          <span className="ml-auto text-xs font-mono text-muted-foreground">
            {workStart.toString().padStart(2, '0')}:00 → {workEnd.toString().padStart(2, '0')}:00
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>Start ({workStart.toString().padStart(2, '0')}:00)</span>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <input
              type="range"
              min={0}
              max={23}
              value={workStart}
              onChange={(e) => handleStartChange(parseInt(e.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>
          <div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>End ({workEnd.toString().padStart(2, '0')}:00)</span>
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <input
              type="range"
              min={1}
              max={24}
              value={workEnd}
              onChange={(e) => handleEndChange(parseInt(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {offsets.map((c) => (
          <div key={c.id} className="group">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelected((prev) => prev.filter((s) => s.id !== c.id))}
                  className="w-5 h-5 rounded flex items-center justify-center text-muted-foreground hover:text-red-400"
                  aria-label={`Remove ${c.city}`}
                >
                  <X className="w-3 h-3" />
                </button>
                <span className="text-sm font-medium">{c.city}</span>
                <span className="text-xs text-muted-foreground">
                  UTC {c.offset >= 0 ? '+' : ''}{c.offset}
                </span>
              </div>
            </div>
            <div className="grid gap-px h-8 rounded-md overflow-hidden bg-black/30" style={{ gridTemplateColumns: 'repeat(24, minmax(0, 1fr))' }}>
              {Array.from({ length: 24 }, (_, utcHour) => {
                const localHour = ((utcHour + c.offset) % 24 + 24) % 24;
                const inWork = localHour >= workStart && localHour < workEnd;
                const inOverlap = overlapHours.includes(utcHour);
                return (
                  <div
                    key={utcHour}
                    className={`relative flex items-center justify-center text-[8px] font-mono transition-colors ${
                      inOverlap
                        ? 'bg-cyan-500/50 text-cyan-50'
                        : inWork
                        ? 'bg-indigo-500/25 text-indigo-200'
                        : 'bg-black/40 text-muted-foreground/50'
                    }`}
                    title={`${c.city} ${localHour.toString().padStart(2, '0')}:00 (UTC ${utcHour})`}
                  >
                    {localHour.toString().padStart(2, '0')}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 border border-cyan-500/30">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-semibold">Overlap Analysis</span>
        </div>
        {overlapHours.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-2">
              {overlapHours.length} hour{overlapHours.length === 1 ? '' : 's'} of overlap (UTC):
            </p>
            <div className="flex flex-wrap gap-2">
              {overlapHours.map((h) => (
                <span
                  key={h}
                  className="px-2.5 py-1 rounded-md bg-cyan-500/20 border border-cyan-500/40 text-xs font-mono text-cyan-200"
                >
                  {h.toString().padStart(2, '0')}:00–{(h + 1).toString().padStart(2, '0')}:00
                </span>
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm text-amber-400">
            No overlapping working hours found. Try widening the window or removing a city.
          </p>
        )}
      </div>
    </div>
  );
}
