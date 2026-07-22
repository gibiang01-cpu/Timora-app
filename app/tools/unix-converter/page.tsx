import type { Metadata } from 'next';
import { Binary } from 'lucide-react';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import { UnixConverterWidget } from '@/components/widgets/UnixConverterWidget';
import { HowToUse, UseCases } from '@/components/ToolContent';
import { FAQSection } from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter — Epoch & Human Time',
  description:
    'Convert Unix timestamps (seconds or milliseconds) to human-readable UTC, local, and ISO 8601 dates — and back. Instant, bidirectional, 100% client-side.',
  alternates: { canonical: '/tools/unix-converter' },
};

const howTo = [
  {
    title: 'Pick a direction',
    description: 'Choose "Timestamp → Date" to decode an epoch value, or "Date → Timestamp" to encode a date. Use the swap button to flip instantly.',
  },
  {
    title: 'Enter your value',
    description: 'For epoch input, paste any integer. The tool auto-detects seconds vs. milliseconds based on digit count (10 vs. 13). For date input, use the datetime picker.',
  },
  {
    title: 'Read the converted outputs',
    description: 'Results show UTC, your local time, ISO 8601, and (for epoch input) a relative "seconds ago / in the future" line referencing the current moment.',
  },
  {
    title: 'Copy any output',
    description: 'Each result row has a copy button. Click to copy the value to your clipboard — handy for logs, APIs, and cron jobs.',
  },
];

const useCases = [
  { title: 'Debugging log entries', description: 'Decode the epoch timestamps in server logs into readable local times without reaching for a shell.' },
  { title: 'API payload building', description: 'Generate correct Unix seconds or milliseconds for expires_at, scheduled_for, and similar API fields.' },
  { title: 'Cron and scheduler setup', description: 'Confirm what a given epoch corresponds to in human time before you commit it to a config file.' },
  { title: 'Database queries', description: 'Translate a stored epoch column into a readable date when eyeballing query results.' },
];

const faqs = [
  {
    question: 'Does the tool handle milliseconds as well as seconds?',
    answer: 'Yes. The converter auto-detects whether your input is in seconds (≤10 digits) or milliseconds (13 digits) and converts accordingly. Outputs always show both where relevant.',
  },
  {
    question: 'What timezone are the results shown in?',
    answer: 'You get three representations: UTC (universal), your device\'s local time, and ISO 8601 with the timezone offset. Use whichever suits your context.',
  },
  {
    question: 'Is the conversion done on a server?',
    answer: 'No. Everything runs in your browser using native JavaScript Date and Intl APIs. No value you paste is transmitted anywhere.',
  },
  {
    question: 'What is the Unix epoch?',
    answer: 'The Unix epoch is 00:00:00 UTC on 1 January 1970. A Unix timestamp is the number of seconds (or milliseconds) that have elapsed since that moment, not counting leap seconds.',
  },
];

export default function UnixConverterPage() {
  return (
    <ToolPageLayout
      meta={{ slug: 'unix-converter', icon: Binary, title: 'Unix Timestamp Converter', emoji: '⚡', tagline: 'Epoch in, human time out. Bidirectional.' }}
      widget={<UnixConverterWidget />}
    >
      <HowToUse steps={howTo} />
      <UseCases items={useCases} />
      <FAQSection faqs={faqs} />
    </ToolPageLayout>
  );
}
