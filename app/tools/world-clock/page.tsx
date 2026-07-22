import type { Metadata } from 'next';
import { Globe2 } from 'lucide-react';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import { WorldClockWidget } from '@/components/widgets/WorldClockWidget';
import { HowToUse, UseCases } from '@/components/ToolContent';
import { FAQSection } from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'World Clock & Team Pins — Live Global Time',
  description:
    'Pin cities from around the world and see live, accurate clocks for your remote team. Saved to your browser, 100% client-side, no tracking.',
  alternates: { canonical: '/tools/world-clock' },
};

const howTo = [
  {
    title: 'Add cities to your board',
    description: 'Click "Add city" and search for any major world city. Your pinned cities appear instantly as live clock cards.',
  },
  {
    title: 'Read the time and day phase',
    description: 'Each card shows the local time, weekday, date, and a day-phase icon (dawn, morning, afternoon, evening, night) so you know if your teammate is awake.',
  },
  {
    title: 'Compare UTC offsets',
    description: 'The bottom-right badge shows the offset difference relative to your local timezone, so you can quickly gauge how far ahead or behind a city is.',
  },
  {
    title: 'Remove cities you no longer need',
    description: 'Hover any card and click the X button to unpin. Your selection is stored in localStorage and persists across reloads on this device.',
  },
];

const useCases = [
  { title: 'Standup scheduling', description: 'See everyone\'s local time at a glance before sending that 9am Slack message.' },
  { title: 'On-call handoffs', description: 'Track follow-the-sun support rotations across regions without mental math.' },
  { title: 'Client meetings', description: 'Confirm a client\'s local time and day phase before booking a cross-continent call.' },
  { title: 'Travel planning', description: 'Quickly orient yourself to a destination\'s clock before a trip.' },
];

const faqs = [
  {
    question: 'Does Timora store my pinned cities on a server?',
    answer: 'No. Pinned cities are saved exclusively in your browser\'s localStorage. Nothing is sent to any server — the tool is 100% client-side.',
  },
  {
    question: 'How accurate are the displayed times?',
    answer: 'Times use your browser\'s native Intl API with the official IANA time zone database, which includes daylight saving time rules. Accuracy depends only on your device clock.',
  },
  {
    question: 'Will my pins survive a page reload?',
    answer: 'Yes. Pins are stored in localStorage on this device and browser. They will not carry over to a different device or a different browser profile.',
  },
  {
    question: 'Can I pin a city that is not in the list?',
    answer: 'The curated list covers the most common remote-work hubs. If you need a city we do not list, let us know via the Contact page and we will add it.',
  },
];

export default function WorldClockPage() {
  return (
    <ToolPageLayout
      meta={{ slug: 'world-clock', icon: Globe2, title: 'World Clock & Team Pins', emoji: '🌎', tagline: 'Live global clocks, pinned to your browser.' }}
      widget={<WorldClockWidget />}
    >
      <HowToUse steps={howTo} />
      <UseCases items={useCases} />
      <FAQSection faqs={faqs} />
    </ToolPageLayout>
  );
}
