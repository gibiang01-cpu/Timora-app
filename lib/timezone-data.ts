export interface TzEndpoint {
  label: string;
  abbr: string;
  tz: string;
}

export interface TzPair {
  slug: string;
  kind: 'pair' | 'special';
  from?: TzEndpoint;
  to?: TzEndpoint;
  title: string;
  h1: string;
  tagline: string;
  description: string;
  keywords: string[];
  tool?: 'unix-converter' | 'business-days';
  ctaHref?: string;
}

const EST: TzEndpoint = { label: 'EST / Eastern Time', abbr: 'EST', tz: 'America/New_York' };
const PST: TzEndpoint = { label: 'PST / Pacific Time', abbr: 'PST', tz: 'America/Los_Angeles' };
const CST: TzEndpoint = { label: 'CST / Central Time', abbr: 'CST', tz: 'America/Chicago' };
const GMT: TzEndpoint = { label: 'GMT', abbr: 'GMT', tz: 'Etc/GMT' };
const UTC: TzEndpoint = { label: 'UTC', abbr: 'UTC', tz: 'Etc/UTC' };

export const TZ_PAIRS: TzPair[] = [
  {
    slug: 'est-to-gmt',
    kind: 'pair',
    from: EST,
    to: GMT,
    title: 'EST to GMT Converter — Eastern Time to Greenwich Mean Time',
    h1: 'EST to GMT Converter',
    tagline: 'Convert Eastern Time (EST/EDT) to Greenwich Mean Time instantly.',
    description: 'Free EST to GMT converter. Convert Eastern Time to Greenwich Mean Time with live DST-aware results, offset, and a 24-hour overlap table. 100% client-side.',
    keywords: ['est to gmt', 'eastern time to gmt', 'est to gmt converter', 'est to utc', 'new york to london time'],
  },
  {
    slug: 'pst-to-est',
    kind: 'pair',
    from: PST,
    to: EST,
    title: 'PST to EST Converter — Pacific Time to Eastern Time',
    h1: 'PST to EST Converter',
    tagline: 'Convert Pacific Time (PST/PDT) to Eastern Time (EST/EDT) instantly.',
    description: 'Free PST to EST converter. Convert Pacific Time to Eastern Time with live DST-aware results, 3-hour offset, and overlap table. 100% client-side.',
    keywords: ['pst to est', 'pacific to eastern time', 'pst to est converter', 'los angeles to new york', '3 hour time difference'],
  },
  {
    slug: 'utc-to-est',
    kind: 'pair',
    from: UTC,
    to: EST,
    title: 'UTC to EST Converter — Coordinated Universal Time to Eastern Time',
    h1: 'UTC to EST Converter',
    tagline: 'Convert UTC to Eastern Time (EST/EDT) with DST awareness.',
    description: 'Free UTC to EST converter. Convert Coordinated Universal Time to Eastern Time with live DST-aware results and offset. 100% client-side.',
    keywords: ['utc to est', 'utc to eastern time', 'utc to est converter', 'coordinated universal time to est', 'utc offset'],
  },
  {
    slug: 'gmt-to-pst',
    kind: 'pair',
    from: GMT,
    to: PST,
    title: 'GMT to PST Converter — Greenwich Mean Time to Pacific Time',
    h1: 'GMT to PST Converter',
    tagline: 'Convert GMT to Pacific Time (PST/PDT) with DST awareness.',
    description: 'Free GMT to PST converter. Convert Greenwich Mean Time to Pacific Time with live DST-aware results and 8-hour offset. 100% client-side.',
    keywords: ['gmt to pst', 'greenwich to pacific time', 'gmt to pst converter', 'london to los angeles time', '8 hour time difference'],
  },
  {
    slug: 'cst-to-est',
    kind: 'pair',
    from: CST,
    to: EST,
    title: 'CST to EST Converter — Central Time to Eastern Time',
    h1: 'CST to EST Converter',
    tagline: 'Convert Central Time (CST/CDT) to Eastern Time (EST/EDT) instantly.',
    description: 'Free CST to EST converter. Convert Central Time to Eastern Time with live DST-aware results and 1-hour offset. 100% client-side.',
    keywords: ['cst to est', 'central to eastern time', 'cst to est converter', 'chicago to new york', '1 hour time difference'],
  },
  {
    slug: 'london-to-new-york',
    kind: 'pair',
    from: { label: 'London', abbr: 'GMT/BST', tz: 'Europe/London' },
    to: { label: 'New York', abbr: 'EST/EDT', tz: 'America/New_York' },
    title: 'London to New York Time Converter — Time Difference & Overlap',
    h1: 'London to New York Time Converter',
    tagline: 'Convert London time to New York time and find meeting overlaps.',
    description: 'Free London to New York time converter. See the live time difference, DST-aware offset, and overlapping working hours between London and New York. 100% client-side.',
    keywords: ['london to new york time', 'london to new york converter', 'uk to us time', 'time difference london new york', '5 hour time difference'],
  },
  {
    slug: 'tokyo-to-london',
    kind: 'pair',
    from: { label: 'Tokyo', abbr: 'JST', tz: 'Asia/Tokyo' },
    to: { label: 'London', abbr: 'GMT/BST', tz: 'Europe/London' },
    title: 'Tokyo to London Time Converter — Time Difference & Overlap',
    h1: 'Tokyo to London Time Converter',
    tagline: 'Convert Tokyo time to London time and find meeting overlaps.',
    description: 'Free Tokyo to London time converter. See the live time difference, JST to GMT/BST offset, and overlapping working hours. 100% client-side.',
    keywords: ['tokyo to london time', 'tokyo to london converter', 'japan to uk time', 'time difference tokyo london', '9 hour time difference'],
  },
  {
    slug: 'sydney-to-los-angeles',
    kind: 'pair',
    from: { label: 'Sydney', abbr: 'AEDT/AEST', tz: 'Australia/Sydney' },
    to: { label: 'Los Angeles', abbr: 'PST/PDT', tz: 'America/Los_Angeles' },
    title: 'Sydney to Los Angeles Time Converter — Time Difference & Overlap',
    h1: 'Sydney to Los Angeles Time Converter',
    tagline: 'Convert Sydney time to Los Angeles time and find meeting overlaps.',
    description: 'Free Sydney to Los Angeles time converter. See the live time difference, AEDT to PST offset, and overlapping working hours. 100% client-side.',
    keywords: ['sydney to los angeles time', 'sydney to la converter', 'australia to us time', 'time difference sydney los angeles'],
  },
  {
    slug: 'singapore-to-utc',
    kind: 'pair',
    from: { label: 'Singapore', abbr: 'SGT', tz: 'Asia/Singapore' },
    to: UTC,
    title: 'Singapore to UTC Converter — Singapore Time to Coordinated Universal Time',
    h1: 'Singapore to UTC Converter',
    tagline: 'Convert Singapore Time (SGT) to UTC with live offset.',
    description: 'Free Singapore to UTC converter. Convert Singapore Time to Coordinated Universal Time with live results and 8-hour offset. 100% client-side.',
    keywords: ['singapore to utc', 'sgt to utc', 'singapore to utc converter', 'singapore time to utc', '8 hour offset'],
  },
  {
    slug: 'dubai-to-gmt',
    kind: 'pair',
    from: { label: 'Dubai', abbr: 'GST', tz: 'Asia/Dubai' },
    to: GMT,
    title: 'Dubai to GMT Converter — Gulf Standard Time to Greenwich Mean Time',
    h1: 'Dubai to GMT Converter',
    tagline: 'Convert Dubai Time (GST) to GMT with live offset.',
    description: 'Free Dubai to GMT converter. Convert Gulf Standard Time to Greenwich Mean Time with live results and 4-hour offset. 100% client-side.',
    keywords: ['dubai to gmt', 'gst to gmt', 'dubai to gmt converter', 'dubai time to greenwich', '4 hour offset'],
  },
  {
    slug: 'berlin-to-est',
    kind: 'pair',
    from: { label: 'Berlin', abbr: 'CET/CEST', tz: 'Europe/Berlin' },
    to: EST,
    title: 'Berlin to EST Converter — Central European Time to Eastern Time',
    h1: 'Berlin to EST Converter',
    tagline: 'Convert Berlin Time (CET/CEST) to Eastern Time with DST awareness.',
    description: 'Free Berlin to EST converter. Convert Central European Time to Eastern Time with live DST-aware results and offset. 100% client-side.',
    keywords: ['berlin to est', 'cet to est', 'berlin to eastern time', 'germany to us time', 'berlin to new york'],
  },
  {
    slug: 'paris-to-pst',
    kind: 'pair',
    from: { label: 'Paris', abbr: 'CET/CEST', tz: 'Europe/Paris' },
    to: PST,
    title: 'Paris to PST Converter — Central European Time to Pacific Time',
    h1: 'Paris to PST Converter',
    tagline: 'Convert Paris Time (CET/CEST) to Pacific Time with DST awareness.',
    description: 'Free Paris to PST converter. Convert Central European Time to Pacific Time with live DST-aware results and offset. 100% client-side.',
    keywords: ['paris to pst', 'cet to pst', 'paris to pacific time', 'france to us time', 'paris to los angeles'],
  },
  {
    slug: 'unix-timestamp-to-date',
    kind: 'special',
    tool: 'unix-converter',
    ctaHref: '/tools/unix-converter',
    title: 'Unix Timestamp to Date Converter — Epoch to Human Readable Time',
    h1: 'Unix Timestamp to Date Converter',
    tagline: 'Convert any Unix epoch timestamp to a human-readable date.',
    description: 'Free Unix timestamp to date converter. Convert epoch seconds or milliseconds to UTC, local, and ISO 8601 human-readable dates instantly. 100% client-side.',
    keywords: ['unix timestamp to date', 'epoch to date', 'unix to human readable', 'timestamp converter', 'epoch to date converter'],
  },
  {
    slug: 'current-epoch-time',
    kind: 'special',
    tool: 'unix-converter',
    ctaHref: '/tools/unix-converter',
    title: 'Current Epoch Time — Live Unix Timestamp Now',
    h1: 'Current Epoch Time',
    tagline: 'See the current Unix epoch timestamp, updating live every second.',
    description: 'Free live current epoch time tool. See the current Unix timestamp in seconds and milliseconds, updating in real time. Copy with one click. 100% client-side.',
    keywords: ['current epoch time', 'unix timestamp now', 'current unix time', 'epoch now', 'current timestamp'],
  },
  {
    slug: 'business-days-calculator',
    kind: 'special',
    tool: 'business-days',
    ctaHref: '/tools/business-days',
    title: 'Business Days Calculator — Working Days Between Two Dates',
    h1: 'Business Days Calculator',
    tagline: 'Calculate working days between two dates, excluding weekends and holidays.',
    description: 'Free business days calculator. Count working days between two dates, excluding weekends and country holiday presets. Visual day-by-day breakdown. 100% client-side.',
    keywords: ['business days calculator', 'working days calculator', 'days between dates', 'work days calculator', 'business days between dates'],
  },
];

export const PAIR_MAP: Record<string, TzPair> = Object.fromEntries(
  TZ_PAIRS.map((p) => [p.slug, p])
);

export function getPair(slug: string): TzPair | undefined {
  return PAIR_MAP[slug];
}
