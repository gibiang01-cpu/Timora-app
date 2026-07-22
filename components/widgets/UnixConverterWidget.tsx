'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeftRight, Copy, Check, Clock } from 'lucide-react';

type Direction = 'ts-to-date' | 'date-to-ts';

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

export function UnixConverterWidget() {
  const [direction, setDirection] = useState<Direction>('ts-to-date');
  const [tsInput, setTsInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [now, setNow] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const update = () => setNow(Math.floor(Date.now() / 1000));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (direction === 'ts-to-date' && !tsInput) {
      setTsInput(String(now));
    }
  }, [now, direction, tsInput]);

  const result = useMemo(() => {
    if (direction === 'ts-to-date') {
      const ts = parseInt(tsInput, 10);
      if (!tsInput || isNaN(ts)) return null;
      const isMs = tsInput.length > 10;
      const ms = isMs ? ts : ts * 1000;
      const d = new Date(ms);
      if (isNaN(d.getTime())) return null;
      return {
        utc: d.toUTCString(),
        local: d.toLocaleString(),
        iso: d.toISOString(),
        relative: ts - now,
        isMs,
        ms,
      };
    } else {
      if (!dateInput) return null;
      const d = new Date(dateInput);
      if (isNaN(d.getTime())) return null;
      return {
        seconds: Math.floor(d.getTime() / 1000),
        ms: d.getTime(),
        utc: d.toUTCString(),
        iso: d.toISOString(),
      };
    }
  }, [direction, tsInput, dateInput, now]);

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="glass rounded-2xl border border-white/10 dark:border-white/10 border-black/10 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Unix Timestamp Converter</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Convert between epoch time and human-readable dates.
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Current epoch</div>
          <div className="text-sm font-mono text-cyan-400">{now}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => { setDirection('ts-to-date'); setDateInput(''); }}
          className={`px-4 h-9 rounded-lg text-sm font-medium transition-all ${
            direction === 'ts-to-date'
              ? 'bg-indigo-500/20 border border-indigo-500/50 text-indigo-300'
              : 'glass border border-white/10 text-muted-foreground hover:text-foreground'
          }`}
        >
          Timestamp → Date
        </button>
        <button
          onClick={() => { setDirection('date-to-ts'); setTsInput(''); }}
          className={`px-4 h-9 rounded-lg text-sm font-medium transition-all ${
            direction === 'date-to-ts'
              ? 'bg-indigo-500/20 border border-indigo-500/50 text-indigo-300'
              : 'glass border border-white/10 text-muted-foreground hover:text-foreground'
          }`}
        >
          Date → Timestamp
        </button>
        <button
          onClick={() => setDirection((d) => (d === 'ts-to-date' ? 'date-to-ts' : 'ts-to-date'))}
          className="ml-auto w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-indigo-400 hover:border-indigo-500/40 transition-all"
          aria-label="Swap direction"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>
      </div>

      {direction === 'ts-to-date' ? (
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Unix timestamp (seconds or milliseconds)</label>
            <div className="relative">
              <input
                value={tsInput}
                onChange={(e) => setTsInput(e.target.value)}
                placeholder="1700000000"
                className="w-full px-4 h-12 rounded-xl bg-black/30 border border-white/10 text-lg font-mono outline-none focus:border-indigo-500/50 transition-colors"
              />
              {tsInput && (
                <button
                  onClick={() => setTsInput('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              Detected: {tsInput.length > 10 ? 'milliseconds' : 'seconds'}
            </p>
          </div>

          {result && (
            <div className="space-y-3 animate-fade-in">
              <ResultRow label="UTC" value={result.utc!} onCopy={copy} copied={copied} mono />
              <ResultRow label="Local time" value={result.local!} onCopy={copy} copied={copied} />
              <ResultRow label="ISO 8601" value={result.iso!} onCopy={copy} copied={copied} mono />
              {result.relative !== undefined && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                  <Clock className="w-3.5 h-3.5" />
                  {result.relative === 0
                    ? 'This is now.'
                    : result.relative > 0
                    ? `${result.relative} seconds in the future`
                    : `${Math.abs(result.relative)} seconds ago`}
                </div>
              )}
            </div>
          )}
          {tsInput && !result && (
            <p className="text-sm text-amber-400">Invalid timestamp. Enter a numeric epoch value.</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Date &amp; time (local)</label>
            <input
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full px-4 h-12 rounded-xl bg-black/30 border border-white/10 text-lg font-mono outline-none focus:border-indigo-500/50 transition-colors [color-scheme:dark]"
            />
          </div>

          {result && (
            <div className="space-y-3 animate-fade-in">
              <ResultRow label="Unix seconds" value={String(result.seconds)} onCopy={copy} copied={copied} mono highlight />
              <ResultRow label="Unix milliseconds" value={String(result.ms)} onCopy={copy} copied={copied} mono />
              <ResultRow label="UTC" value={result.utc!} onCopy={copy} copied={copied} />
              <ResultRow label="ISO 8601" value={result.iso!} onCopy={copy} copied={copied} mono />
            </div>
          )}
          {dateInput && !result && (
            <p className="text-sm text-amber-400">Invalid date. Pick a valid date and time.</p>
          )}
        </div>
      )}
    </div>
  );
}

function ResultRow({
  label,
  value,
  onCopy,
  copied,
  mono,
  highlight,
}: {
  label: string;
  value: string;
  onCopy: (v: string) => void;
  copied: boolean;
  mono?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between gap-3 p-3 rounded-xl ${highlight ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-black/20 border border-white/5'}`}>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
        <div className={`text-sm truncate ${mono ? 'font-mono' : ''} ${highlight ? 'text-cyan-300' : 'text-foreground'}`}>
          {value}
        </div>
      </div>
      <button
        onClick={() => onCopy(value)}
        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
        aria-label="Copy"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}
