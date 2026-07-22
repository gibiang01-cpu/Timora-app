'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Globe2,
  Clock4,
  Binary,
  CalendarRange,
  Info,
  Mail,
  ShieldCheck,
  ScrollText,
  ArrowRight,
} from 'lucide-react';
import { TZ_PAIRS } from '@/lib/timezone-data';

interface Entry {
  label: string;
  hint: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  keywords?: string;
}

const TOOLS: Entry[] = [
  { label: 'World Clock & Team Pins', hint: 'Tool', href: '/tools/world-clock', icon: Globe2, keywords: 'world clock pin city timezone' },
  { label: 'Time Zone Overlap Finder', hint: 'Tool', href: '/tools/timezone-overlap', icon: Clock4, keywords: 'timezone overlap meeting hours' },
  { label: 'Unix Timestamp Converter', hint: 'Tool', href: '/tools/unix-converter', icon: Binary, keywords: 'unix epoch timestamp converter' },
  { label: 'Business Days Calculator', hint: 'Tool', href: '/tools/business-days', icon: CalendarRange, keywords: 'business days working days calculator' },
];

const PAGES: Entry[] = [
  { label: 'About Timora', hint: 'Page', href: '/about', icon: Info },
  { label: 'Contact', hint: 'Page', href: '/contact', icon: Mail },
  { label: 'Privacy Policy', hint: 'Page', href: '/privacy', icon: ShieldCheck },
  { label: 'Terms of Service', hint: 'Page', href: '/terms', icon: ScrollText },
];

const PAIR_ENTRIES: Entry[] = TZ_PAIRS.map((p) => ({
  label: p.title.split(' — ')[0],
  hint: 'Convert',
  href: `/tools/timezone-converter/${p.slug}`,
  icon: ArrowRight,
  keywords: p.keywords.join(' '),
}));

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const run = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search tools, conversions, cities, pages..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Tools">
          {TOOLS.map((t) => (
            <CommandItem
              key={t.href}
              value={`${t.label} ${t.keywords ?? ''}`}
              onSelect={() => run(t.href)}
            >
              <t.icon className="mr-2 h-4 w-4 text-indigo-400" />
              <span>{t.label}</span>
              <span className="ml-auto text-xs text-muted-foreground">{t.hint}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Conversions">
          {PAIR_ENTRIES.map((t) => (
            <CommandItem
              key={t.href}
              value={`${t.label} ${t.keywords ?? ''}`}
              onSelect={() => run(t.href)}
            >
              <t.icon className="mr-2 h-4 w-4 text-cyan-400" />
              <span>{t.label}</span>
              <span className="ml-auto text-xs text-muted-foreground">{t.hint}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Pages">
          {PAGES.map((t) => (
            <CommandItem
              key={t.href}
              value={t.label}
              onSelect={() => run(t.href)}
            >
              <t.icon className="mr-2 h-4 w-4 text-violet-400" />
              <span>{t.label}</span>
              <span className="ml-auto text-xs text-muted-foreground">{t.hint}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
