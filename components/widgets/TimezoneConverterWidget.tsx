'use client';

import { useEffect, useMemo, useState } from 'react';
import type { TzPair } from '@/lib/timezone-data';
import { ArrowRight, Copy, Check, Clock } from 'lucide-react';

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

function fmtOffset(o: number): string {
  const sign = o >= 0 ? '+' : '-';
  const abs = Math.abs(o);
  const h = Math.floor(abs);
  const m = Math.round((abs - h) * 60);
  return `UTC${sign}${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

function fmtTime(date: Date, tz: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
}

function fmtDate(date: Date, tz: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function TimezoneConverterWidget({ pair }: { pair: TzPair }) {
  const [now, setNow] = useState<Date | null>(null);
  const [hour, setHour] = useState(12);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const from = pair.from!;
  const to = pair.to!;

  const data = useMemo(() => {
    const ref = now ?? new Date();
    const fromOffset = getOffset(from.tz, ref);
    const toOffset = getOffset(to.tz, ref);
    const diff = toOffset - fromOffset;

    const base = new Date(ref);
    base.setUTCSeconds(0, 0);
    base.setUTCHours(0);
    const dayRows: { hour: number; fromTime: Date; toTime: Date }[] = [];
    for (let h = 0; h < 24; h++) {
      const fromTime = new Date(base);
      const utcHour = h - fromOffset;
      fromTime.setUTCHours(((utcHour % 24) + 24) % 24);
      const toTime = new Date(fromTime);
      toTime.setUTCMinutes(toTime.getUTCMinutes() + Math.round(diff * 60));
      dayRows.push({ hour: h, fromTime, toTime });
    }

    return { fromOffset, toOffset, diff, dayRows };
  }, [now, from.tz, to.tz]);

  const copy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const selectedFrom = data.dayRows[hour]?.fromTime ?? now ?? new Date();
  const selectedTo = data.dayRows[hour]?.toTime ?? now ?? new Date();

  return (
    <div className="glass rounded-2xl border border-white/10 dark:border-white/10 border-black/10 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-semibold">{from.label} → {to.label}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Live, DST-aware conversion. Time difference: {data.diff >= 0 ? '+' : ''}{data.diff} hours.
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Updated</div>
          <div className="text-sm font-mono text-cyan-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {now ? fmtTime(now, from.tz) : '--:--:--'}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
          <div className="text-xs text-muted-foreground mb-1">{from.abbr} · {fmtOffset(data.fromOffset)}</div>
          <div className="text-2xl font-mono font-semibold text-indigo-300">{fmtTime(selectedFrom, from.tz)}</div>
          <div className="text-xs text-muted-foreground mt-1">{fmtDate(selectedFrom, from.tz)}</div>
        </div>
        <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
          <div className="text-xs text-muted-foreground mb-1">{to.abbr} · {fmtOffset(data.toOffset)}</div>
          <div className="text-2xl font-mono font-semibold text-cyan-300">{fmtTime(selectedTo, to.tz)}</div>
          <div className="text-xs text-muted-foreground mt-1">{fmtDate(selectedTo, to.tz)}</div>
        </div>
      </div>

      <div className="mb-6">
        <label className="text-sm text-muted-foreground mb-2 block">
          Pick an hour in {from.label.split(' / ')[0]}:
        </label>
        <input
          type="range"
          min={0}
          max={23}
          value={hour}
          onChange={(e) => setHour(parseInt(e.target.value))}
          className="w-full accent-indigo-500"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>23:00</span>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 dark:border-white/10 border-black/10 overflow-hidden">
        <div className="grid grid-cols-3 text-xs font-semibold bg-black/30 px-4 py-2.5 border-b border-white/10">
          <span>{from.abbr}</span>
          <span className="text-center">{to.abbr}</span>
          <span className="text-right">Diff</span>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {data.dayRows.map((row) => {
            const isActive = row.hour === hour;
            return (
              <button
                key={row.hour}
                onClick={() => setHour(row.hour)}
                className={`w-full grid grid-cols-3 text-sm px-4 py-2 text-left transition-colors ${
                  isActive
                    ? 'bg-indigo-500/20 border-l-2 border-indigo-500'
                    : 'hover:bg-white/5 dark:hover:bg-white/5 hover:bg-black/5'
                }`}
              >
                <span className="font-mono">{fmtTime(row.fromTime, from.tz)}</span>
                <span className="font-mono text-cyan-400 text-center">{fmtTime(row.toTime, to.tz)}</span>
                <span className="font-mono text-muted-foreground text-right text-xs">
                  {row.hour === hour ? `${data.diff >= 0 ? '+' : ''}${data.diff}h` : ''}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-6">
        <button
          onClick={() => copy(fmtTime(selectedFrom, from.tz), 'from')}
          className="flex items-center justify-between px-4 h-11 rounded-lg glass border border-white/10 hover:border-indigo-500/40 transition-all text-sm"
        >
          <span>Copy {from.abbr} time</span>
          {copied === 'from' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
        <button
          onClick={() => copy(fmtTime(selectedTo, to.tz), 'to')}
          className="flex items-center justify-between px-4 h-11 rounded-lg glass border border-white/10 hover:border-cyan-500/40 transition-all text-sm"
        >
          <span>Copy {to.abbr} time</span>
          {copied === 'to' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
        <ArrowRight className="w-3.5 h-3.5" />
        Offsets computed live using the IANA timezone database — DST transitions are handled automatically.
      </div>
    </div>
  );
}
