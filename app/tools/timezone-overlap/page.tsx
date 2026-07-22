import type { Metadata } from 'next';
import { Clock4 } from 'lucide-react';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import { TimezoneOverlapWidget } from '@/components/widgets/TimezoneOverlapWidget';
import { HowToUse, UseCases } from '@/components/ToolContent';
import { FAQSection } from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'Time Zone Overlap Finder — Find Meeting Hours',
  description:
    'Visually find overlapping working hours across multiple time zones. Set your work window, add cities, and see exactly when your whole team is online.',
  alternates: { canonical: '/tools/timezone-overlap' },
};

const howTo = [
  {
    title: 'Add the cities your team is spread across',
    description: 'Click "Add city" to add the locations of each teammate. The tool computes each city\'s UTC offset for the current date, including DST.',
  },
  {
    title: 'Set your working-hours window',
    description: 'Use the From and To selectors to define acceptable local working hours (e.g. 09:00–18:00). The grid highlights those hours per city.',
  },
  {
    title: 'Read the 24-hour grid',
    description: 'Each row is a city; each cell is one UTC hour. Indigo cells are local working hours; cyan cells are hours that fall inside every teammate\'s window.',
  },
  {
    title: 'Review the overlap analysis',
    description: 'The summary panel lists every overlapping UTC hour block. Pick any of those for a meeting everyone can actually attend.',
  },
];

const useCases = [
  { title: 'All-hands scheduling', description: 'Find the single hour where SF, London, and Tokyo are all on the clock.' },
  { title: 'Async handoff windows', description: 'Identify a 1–2 hour overlap for a live handoff between shifts.' },
  { title: 'Hiring across regions', description: 'Plan interview slots that respect candidate working hours in any country.' },
  { title: 'Onboarding cohorts', description: 'Schedule recurring sessions that fit a globally distributed new-hire group.' },
];

const faqs = [
  {
    question: 'What does the cyan highlight mean?',
    answer: 'Cyan marks UTC hours where every selected city is inside the working-hours window you set. Those are the hours your whole team can meet live.',
  },
  {
    question: 'Does the overlap account for daylight saving time?',
    answer: 'Yes. Each city\'s offset is computed for the current date using the IANA time zone database, so DST transitions are reflected automatically.',
  },
  {
    question: 'Why does it show no overlap?',
    answer: 'If the working window is too narrow or the cities are too far apart (e.g. Honolulu and Auckland), there may be no overlapping working hour. Try widening the window or removing the most distant city.',
  },
  {
    question: 'Are my selected cities saved?',
    answer: 'Selections persist for the session. Pinned cities for long-term use belong in the World Clock tool, which saves to localStorage.',
  },
];

export default function TimezoneOverlapPage() {
  return (
    <ToolPageLayout
      meta={{ slug: 'timezone-overlap', icon: Clock4, title: 'Time Zone Overlap Finder', emoji: '🕒', tagline: 'See when your whole team is online.' }}
      widget={<TimezoneOverlapWidget />}
    >
      <HowToUse steps={howTo} />
      <UseCases items={useCases} />
      <FAQSection faqs={faqs} />
    </ToolPageLayout>
  );
}
