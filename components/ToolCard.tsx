'use client';

import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

export interface ToolCardData {
  slug: string;
  icon: LucideIcon;
  iconColor: string;
  glowColor: string;
  title: string;
  emoji: string;
  description: string;
  preview: React.ReactNode;
}

export function ToolCard({ tool }: { tool: ToolCardData }) {
  const [hovered, setHovered] = useState(false);
  const Icon = tool.icon;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative glass rounded-2xl p-6 border border-white/10 dark:border-white/10 border-black/10 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:glow-violet overflow-hidden"
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${tool.glowColor} pointer-events-none`} />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tool.iconColor}`}>
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-2xl" aria-hidden>{tool.emoji}</span>
        </div>

        <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-400 transition-colors">
          {tool.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 min-h-[40px]">
          {tool.description}
        </p>

        <div className="mb-4 rounded-lg bg-black/20 dark:bg-black/30 border border-white/5 dark:border-white/5 px-3 py-2.5 min-h-[56px] flex items-center">
          {tool.preview}
        </div>

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live preview
          </span>
          <span className={`inline-flex items-center gap-1 text-xs font-medium text-indigo-400 transition-all ${hovered ? 'translate-x-0.5' : ''}`}>
            Open tool
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
