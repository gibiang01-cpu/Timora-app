'use client';

import Link from 'next/link';
import { ArrowRight, Binary, CalendarRange } from 'lucide-react';

export function ToolRedirectCard({ tool, title }: { tool: 'unix-converter' | 'business-days'; title: string }) {
  const href = `/tools/${tool}`;
  const Icon = tool === 'unix-converter' ? Binary : CalendarRange;
  return (
    <div className="glass rounded-2xl border border-white/10 dark:border-white/10 border-black/10 p-6 sm:p-8 text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 mb-4 glow-violet">
        <Icon className="w-7 h-7 text-indigo-400" />
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
        This page links to Timora&apos;s full interactive {tool === 'unix-converter' ? 'Unix timestamp' : 'business days'} tool — open it to use the converter with copy buttons, live results, and more.
      </p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 px-6 h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-lg glow-violet hover:scale-[1.02] transition-transform"
      >
        Open {tool === 'unix-converter' ? 'Unix Converter' : 'Business Days Calculator'}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
