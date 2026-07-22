import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { TZ_PAIRS, getPair } from '@/lib/timezone-data';
import { TimezoneConverterWidget } from '@/components/widgets/TimezoneConverterWidget';
import { CurrentEpochWidget } from '@/components/widgets/CurrentEpochWidget';
import { ToolRedirectCard } from '@/components/widgets/ToolRedirectCard';
import { HowToUse, UseCases } from '@/components/ToolContent';
import { FAQSection } from '@/components/FAQSection';
import { ToolHeader } from '@/components/ToolPageLayout';

export function generateStaticParams() {
  return TZ_PAIRS.map((p) => ({ pair: p.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { pair: string } }): Metadata {
  const pair = getPair(params.pair);
  if (!pair) return {};
  const url = `https://timora.app/tools/timezone-converter/${pair.slug}`;
  return {
    title: pair.title,
    description: pair.description,
    alternates: { canonical: `/tools/timezone-converter/${pair.slug}` },
    keywords: pair.keywords,
    openGraph: {
      type: 'website',
      url,
      title: pair.title,
      description: pair.description,
      siteName: 'Timora',
    },
    twitter: {
      card: 'summary_large_image',
      title: pair.title,
      description: pair.description,
    },
  };
}

function buildJsonLd(pair: typeof TZ_PAIRS[number]) {
  if (pair.kind === 'special') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: pair.title,
      description: pair.description,
      url: `https://timora.app/tools/timezone-converter/${pair.slug}`,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    };
  }
  const from = pair.from!;
  const to = pair.to!;
  const faqEntries = [
    {
      '@type': 'Question',
      name: `What is the time difference between ${from.label} and ${to.label}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `The time difference is computed live using the IANA timezone database, so daylight saving time is handled automatically. Open the converter above to see the current offset and a full 24-hour conversion table.`,
      },
    },
    {
      '@type': 'Question',
      name: `Does the ${from.abbr} to ${to.abbr} converter account for daylight saving time?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Yes. All offsets are calculated for the current date using your browser's native Intl API with the official IANA timezone database, so DST transitions in both ${from.label} and ${to.label} are reflected.`,
      },
    },
  ];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: pair.title,
        description: pair.description,
        url: `https://timora.app/tools/timezone-converter/${pair.slug}`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqEntries,
      },
    ],
  };
}

export default function PairPage({ params }: { params: { pair: string } }) {
  const pair = getPair(params.pair);
  if (!pair) notFound();

  const jsonLd = buildJsonLd(pair);

  const howTo =
    pair.kind === 'pair'
      ? [
          { title: `Pick an hour in ${pair.from!.label.split(' / ')[0]}`, description: 'Drag the slider to any hour of the day. The destination time updates instantly with DST-aware math.' },
          { title: 'Read the side-by-side cards', description: `The two cards show the selected time in ${pair.from!.abbr} and the equivalent in ${pair.to!.abbr}, with offsets and full dates.` },
          { title: 'Scan the 24-hour table', description: 'The table below maps every hour of the source zone to the destination zone. Click any row to jump to that hour.' },
          { title: 'Copy any time', description: 'Use the copy buttons to grab either the source or destination time string for a calendar invite or message.' },
        ]
      : pair.slug === 'current-epoch-time'
      ? [
          { title: 'Read the live epoch', description: 'The large number is the current Unix time in seconds, updating every second automatically.' },
          { title: 'Copy the timestamp', description: 'Click "Copy timestamp" to put the current epoch seconds on your clipboard.' },
          { title: 'Reference other formats', description: 'Milliseconds, UTC, ISO 8601, and local time are all shown for the current instant.' },
          { title: 'Use in APIs or logs', description: 'Paste the epoch into an API field, a cron config, or a log query.' },
        ]
      : [
          { title: 'Open the full tool', description: 'Click the button to launch Timora\'s full interactive converter or calculator.' },
          { title: 'Use the widget', description: 'The dedicated tool page offers copy buttons, live results, and a richer interface.' },
        ];

  const useCases =
    pair.kind === 'pair'
      ? [
          { title: 'Scheduling meetings', description: `Find a time that works for colleagues in ${pair.from!.label.split(' / ')[0]} and ${pair.to!.label.split(' / ')[0]}.` },
          { title: 'Calendar invites', description: 'Copy the converted time straight into a meeting invitation.' },
          { title: 'Travel planning', description: 'See what local time your flight lands in the destination zone.' },
          { title: 'Support handoffs', description: 'Coordinate follow-the-sun rotations across the two regions.' },
        ]
      : pair.slug === 'current-epoch-time'
      ? [
          { title: 'Log correlation', description: 'Grab the current epoch to correlate with log timestamps.' },
          { title: 'API testing', description: 'Generate a live timestamp for request payloads and assertions.' },
          { title: 'Cron scheduling', description: 'Confirm the current epoch before setting up a delayed job.' },
          { title: 'Debugging', description: 'Quick reference for "what is the epoch right now?"' },
        ]
      : [
          { title: 'Sprint planning', description: 'Count real working days in an iteration.' },
          { title: 'Delivery dates', description: 'Estimate ship dates excluding weekends and holidays.' },
        ];

  const faqs =
    pair.kind === 'pair'
      ? [
          { question: `What is the time difference between ${pair.from!.label} and ${pair.to!.label}?`, answer: `The time difference is computed live using the IANA timezone database, so daylight saving time is handled automatically. The converter above shows the current offset and a full 24-hour conversion table.` },
          { question: `Does the ${pair.from!.abbr} to ${pair.to!.abbr} converter account for daylight saving time?`, answer: `Yes. All offsets are calculated for the current date using your browser's native Intl API with the official IANA timezone database, so DST transitions in both zones are reflected.` },
          { question: 'Is this converter free and private?', answer: 'Yes. Timora is 100% client-side, free, and tracks nothing. No data leaves your browser.' },
          { question: 'Can I copy the converted time?', answer: 'Yes — use the copy buttons under the cards to copy either the source or destination time to your clipboard.' },
        ]
      : pair.slug === 'current-epoch-time'
      ? [
          { question: 'What is the current epoch time?', answer: 'The current Unix epoch time is shown in the large number above, updating every second. It is the number of seconds since 00:00:00 UTC on 1 January 1970.' },
          { question: 'Is the current epoch in seconds or milliseconds?', answer: 'The headline number is in seconds. The milliseconds equivalent is also shown below it.' },
          { question: 'How accurate is the current epoch?', answer: 'It is derived from your device clock and updates every second, so accuracy depends only on your system clock.' },
        ]
      : [
          { question: 'How do I calculate business days between two dates?', answer: 'Open the Business Days Calculator, pick a start and end date, and toggle holiday exclusion. The tool counts working days instantly.' },
          { question: 'Which holidays are excluded?', answer: 'The calculator supports country holiday presets including US federal holidays for 2025 and 2026.' },
        ];

  const widget =
    pair.kind === 'pair' ? (
      <TimezoneConverterWidget pair={pair} />
    ) : pair.slug === 'current-epoch-time' ? (
      <CurrentEpochWidget />
    ) : (
      <ToolRedirectCard tool={pair.tool!} title={pair.h1} />
    );

  return (
    <>
      <ToolHeader
        meta={{
          slug: pair.slug,
          icon: ChevronRight,
          title: pair.h1,
          emoji: pair.kind === 'pair' ? '🌐' : pair.tool === 'unix-converter' ? '⚡' : '📅',
          tagline: pair.tagline,
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">{widget}</div>

          <HowToUse steps={howTo} />
          <UseCases items={useCases} />
          <FAQSection faqs={faqs} />

          <div className="mt-12 p-6 rounded-2xl glass border border-white/10 text-center">
            <h3 className="font-semibold mb-2">Explore more time tools</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Timora has four core tools and 15+ conversion pages — all client-side and instant.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link href="/tools/world-clock" className="px-3 h-8 inline-flex items-center rounded-lg glass border border-white/10 text-xs hover:border-indigo-500/40 transition-all">World Clock</Link>
              <Link href="/tools/timezone-overlap" className="px-3 h-8 inline-flex items-center rounded-lg glass border border-white/10 text-xs hover:border-indigo-500/40 transition-all">Timezone Overlap</Link>
              <Link href="/tools/unix-converter" className="px-3 h-8 inline-flex items-center rounded-lg glass border border-white/10 text-xs hover:border-indigo-500/40 transition-all">Unix Converter</Link>
              <Link href="/tools/business-days" className="px-3 h-8 inline-flex items-center rounded-lg glass border border-white/10 text-xs hover:border-indigo-500/40 transition-all">Business Days</Link>
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
