'use client';

import { Globe2, Clock4, Binary, CalendarRange } from 'lucide-react';
import { ToolCard, type ToolCardData } from './ToolCard';
import { WorldClockPreview } from './WorldClockPreview';
import { TimezoneOverlapPreview } from './TimezoneOverlapPreview';
import { UnixConverterPreview } from './UnixConverterPreview';
import { BusinessDaysPreview } from './BusinessDaysPreview';

const TOOLS: ToolCardData[] = [
  {
    slug: 'world-clock',
    icon: Globe2,
    iconColor: 'bg-indigo-500/15 text-indigo-400',
    glowColor: 'from-indigo-500/5 to-transparent',
    title: 'World Clock & Team Pins',
    emoji: '🌎',
    description: 'Interactive live clocks with localStorage city pinning for your remote team.',
    preview: <WorldClockPreview />,
  },
  {
    slug: 'timezone-overlap',
    icon: Clock4,
    iconColor: 'bg-cyan-500/15 text-cyan-400',
    glowColor: 'from-cyan-500/5 to-transparent',
    title: 'Time Zone Overlap Finder',
    emoji: '🕒',
    description: 'Visual working hours slider across cities to find meeting sweet spots.',
    preview: <TimezoneOverlapPreview />,
  },
  {
    slug: 'unix-converter',
    icon: Binary,
    iconColor: 'bg-violet-500/15 text-violet-400',
    glowColor: 'from-violet-500/5 to-transparent',
    title: 'Unix Timestamp Converter',
    emoji: '⚡',
    description: 'Convert human-readable time to epoch and back. Instant, bidirectional.',
    preview: <UnixConverterPreview />,
  },
  {
    slug: 'business-days',
    icon: CalendarRange,
    iconColor: 'bg-emerald-500/15 text-emerald-400',
    glowColor: 'from-emerald-500/5 to-transparent',
    title: 'Business Days Calculator',
    emoji: '📅',
    description: 'Calculate working days between dates, excluding weekends and holidays.',
    preview: <BusinessDaysPreview />,
  },
];

export function ToolGrid() {
  return (
    <section id="tools" className="relative py-20 sm:py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/10 text-[11px] font-medium text-muted-foreground mb-4">
            Core Tools
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Four tools. One remote-work toolkit.
          </h2>
          <p className="text-muted-foreground">
            Each tool runs entirely in your browser — no servers, no sign-ups, no
            data leaving your device. Pin a city, find an overlap, convert a
            timestamp, plan a sprint.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
