'use client';

import { useEffect, useState } from 'react';
import { Copy, Check, Clock, Zap } from 'lucide-react';

export function CurrentEpochWidget() {
  const [now, setNow] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setNow(Math.floor(Date.now() / 1000));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const copy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  if (now === null) return <div className="glass rounded-2xl border border-white/10 p-8 h-48 animate-pulse" />;

  const ms = now * 1000;
  const date = new Date(ms);
  const utc = date.toUTCString();
  const iso = date.toISOString();
  const local = date.toLocaleString();

  return (
    <div className="glass rounded-2xl border border-white/10 dark:border-white/10 border-black/10 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            Current Epoch Time
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Updating live every second.</p>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/15 to-indigo-500/10 border border-cyan-500/30 mb-5">
        <div className="text-xs text-muted-foreground mb-1">Unix seconds</div>
        <div className="text-4xl sm:text-5xl font-mono font-bold text-cyan-300 tracking-tight">{now}</div>
        <button
          onClick={() => copy(String(now), 's')}
          className="mt-3 inline-flex items-center gap-2 px-3 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-xs text-cyan-200 hover:bg-cyan-500/30 transition-all"
        >
          {copied === 's' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          Copy timestamp
        </button>
      </div>

      <div className="space-y-2.5">
        <Row label="Milliseconds" value={String(ms)} onCopy={() => copy(String(ms), 'ms')} copied={copied === 'ms'} mono />
        <Row label="UTC" value={utc} onCopy={() => copy(utc, 'utc')} copied={copied === 'utc'} />
        <Row label="ISO 8601" value={iso} onCopy={() => copy(iso, 'iso')} copied={copied === 'iso'} mono />
        <Row label="Local time" value={local} onCopy={() => copy(local, 'local')} copied={copied === 'local'} />
      </div>

      <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="w-3.5 h-3.5" />
        The Unix epoch is 00:00:00 UTC on 1 January 1970.
      </div>
    </div>
  );
}

function Row({ label, value, onCopy, copied, mono }: { label: string; value: string; onCopy: () => void; copied: boolean; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-black/20 border border-white/5">
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
        <div className={`text-sm truncate ${mono ? 'font-mono' : ''} text-foreground`}>{value}</div>
      </div>
      <button onClick={onCopy} className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-indigo-400 hover:bg-indigo-500/10 transition-all">
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}
