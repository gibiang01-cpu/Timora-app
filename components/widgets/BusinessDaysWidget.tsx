'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, Briefcase, Coffee, Sun } from 'lucide-react';

interface CountryPreset {
  code: string;
  label: string;
  holidays: string[];
}

const COUNTRY_PRESETS: CountryPreset[] = [
  {
    code: 'us',
    label: 'United States',
    holidays: [
      '2025-01-01', '2025-01-20', '2025-02-17', '2025-05-26', '2025-06-19',
      '2025-07-04', '2025-09-01', '2025-10-13', '2025-11-11', '2025-11-27', '2025-12-25',
      '2026-01-01', '2026-01-19', '2026-02-16', '2026-05-25', '2026-06-19',
      '2026-07-03', '2026-09-07', '2026-10-12', '2026-11-11', '2026-11-26', '2026-12-25',
    ],
  },
  {
    code: 'uk',
    label: 'United Kingdom',
    holidays: [
      '2025-01-01', '2025-04-18', '2025-04-21', '2025-05-05', '2025-05-26',
      '2025-08-25', '2025-12-25', '2025-12-26',
      '2026-01-01', '2026-04-03', '2026-04-06', '2026-05-04', '2026-05-25',
      '2026-08-31', '2026-12-25', '2026-12-28',
    ],
  },
  {
    code: 'de',
    label: 'Germany',
    holidays: [
      '2025-01-01', '2025-04-18', '2025-04-21', '2025-05-01', '2025-05-29',
      '2025-06-09', '2025-10-03', '2025-12-25', '2025-12-26',
      '2026-01-01', '2026-04-03', '2026-04-06', '2026-05-01', '2026-05-14',
      '2026-06-05', '2026-10-03', '2026-12-25', '2026-12-26',
    ],
  },
  {
    code: 'ca',
    label: 'Canada',
    holidays: [
      '2025-01-01', '2025-02-17', '2025-04-18', '2025-05-19', '2025-07-01',
      '2025-09-01', '2025-10-13', '2025-12-25', '2025-12-26',
      '2026-01-01', '2026-02-16', '2026-04-03', '2026-05-18', '2026-07-01',
      '2026-09-07', '2026-10-12', '2026-12-25', '2026-12-26',
    ],
  },
  {
    code: 'au',
    label: 'Australia',
    holidays: [
      '2025-01-01', '2025-01-27', '2025-04-18', '2025-04-21', '2025-04-25',
      '2025-06-09', '2025-10-06', '2025-12-25', '2025-12-26',
      '2026-01-01', '2026-01-26', '2026-04-03', '2026-04-06', '2026-04-27',
      '2026-06-08', '2026-10-05', '2026-12-25', '2026-12-28',
    ],
  },
];

function fmt(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function BusinessDaysWidget() {
  const today = new Date();
  const inTwoWeeks = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
  const [start, setStart] = useState(fmt(today));
  const [end, setEnd] = useState(fmt(inTwoWeeks));
  const [excludeWeekends, setExcludeWeekends] = useState(true);
  const [enabledCountries, setEnabledCountries] = useState<string[]>(['us']);

  const holidaySet = useMemo(() => {
    const s = new Set<string>();
    for (const code of enabledCountries) {
      const preset = COUNTRY_PRESETS.find((p) => p.code === code);
      if (preset) preset.holidays.forEach((h) => s.add(h));
    }
    return s;
  }, [enabledCountries]);

  const toggleCountry = (code: string) => {
    setEnabledCountries((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const result = useMemo(() => {
    const s = new Date(start + 'T00:00:00');
    const e = new Date(end + 'T00:00:00');
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;
    if (s > e) return { error: 'Start date must be before end date.' } as const;

    const days: { date: Date; isWork: boolean; isHoliday: boolean; isWeekend: boolean }[] = [];
    const cur = new Date(s);
    let total = 0;
    let workdays = 0;
    let weekends = 0;
    let holidays = 0;

    while (cur <= e) {
      total++;
      const dow = cur.getDay();
      const isWeekend = excludeWeekends && (dow === 0 || dow === 6);
      const isHoliday = holidaySet.has(fmt(cur));
      const isWork = !isWeekend && !isHoliday;
      if (isWeekend) weekends++;
      if (isHoliday) holidays++;
      if (isWork) workdays++;
      days.push({ date: new Date(cur), isWork, isHoliday, isWeekend });
      cur.setDate(cur.getDate() + 1);
    }

    return { total, workdays, weekends, holidays, days } as const;
  }, [start, end, excludeWeekends, holidaySet]);

  return (
    <div className="glass rounded-2xl border border-white/10 dark:border-white/10 border-black/10 p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Business Days Calculator</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Count working days between two dates, excluding weekends and country holiday presets.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div className="min-w-0">
          <label className="text-sm text-muted-foreground mb-2 block">Start date</label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full max-w-full box-border px-4 h-12 rounded-xl bg-black/30 border border-white/10 text-base outline-none focus:border-indigo-500/50 transition-colors [color-scheme:dark]"
          />
        </div>
        <div className="min-w-0">
          <label className="text-sm text-muted-foreground mb-2 block">End date</label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full max-w-full box-border px-4 h-12 rounded-xl bg-black/30 border border-white/10 text-base outline-none focus:border-indigo-500/50 transition-colors [color-scheme:dark]"
          />
        </div>
      </div>

      <div className="mb-5 p-4 rounded-xl bg-black/20 dark:bg-black/30 border border-white/5">
        <label className="flex items-center gap-4 cursor-pointer mb-4">
          <button
            onClick={() => setExcludeWeekends((v) => !v)}
            className={`relative w-10 h-6 rounded-full transition-colors ${excludeWeekends ? 'bg-indigo-500' : 'bg-muted'}`}
            aria-pressed={excludeWeekends}
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${excludeWeekends ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
          </button>
          <span className="text-sm">Exclude weekends (Sat &amp; Sun)</span>
        </label>

        <div className="text-xs text-muted-foreground mb-2">Holiday presets</div>
        <div className="flex flex-wrap gap-2">
          {COUNTRY_PRESETS.map((p) => {
            const active = enabledCountries.includes(p.code);
            return (
              <button
                key={p.code}
                onClick={() => toggleCountry(p.code)}
                className={`px-3 h-8 rounded-lg text-xs font-medium border transition-all ${
                  active
                    ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                    : 'glass border-white/10 text-muted-foreground hover:border-indigo-500/30'
                }`}
              >
                {active ? '✓ ' : ''}{p.label}
              </button>
            );
          })}
        </div>
      </div>

      {result && 'error' in result ? (
        <p className="text-sm text-amber-400 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
          {result.error}
        </p>
      ) : result ? (
        <div className="space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard icon={Briefcase} label="Work days" value={result.workdays} color="text-emerald-400" />
            <StatCard icon={CalendarDays} label="Total days" value={result.total} color="text-indigo-400" />
            <StatCard icon={Coffee} label="Weekends" value={result.weekends} color="text-violet-400" />
            <StatCard icon={Sun} label="Holidays" value={result.holidays} color="text-cyan-400" />
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-2">Day-by-day breakdown</div>
            <div className="flex flex-wrap gap-1 max-h-44 overflow-y-auto p-3 rounded-xl bg-black/20 border border-white/5">
              {result.days.map((d, i) => (
                <div
                  key={i}
                  className={`w-9 h-9 rounded-md flex items-center justify-center text-[10px] font-mono ${
                    d.isWork
                      ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-200'
                      : d.isHoliday
                      ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-200'
                      : 'bg-black/40 border border-white/5 text-muted-foreground/50'
                  }`}
                  title={`${fmt(d.date)}${d.isHoliday ? ' (Holiday)' : d.isWeekend ? ' (Weekend)' : ''}`}
                >
                  {d.date.getDate()}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="glass rounded-xl p-4 border border-white/10">
      <Icon className={`w-4 h-4 mb-2 ${color}`} />
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
