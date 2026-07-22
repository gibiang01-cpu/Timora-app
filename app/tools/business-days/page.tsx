import type { Metadata } from 'next';
import { CalendarRange } from 'lucide-react';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import { BusinessDaysWidget } from '@/components/widgets/BusinessDaysWidget';
import { HowToUse, UseCases } from '@/components/ToolContent';
import { FAQSection } from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'Business Days Calculator — Working Days Between Dates',
  description:
    'Calculate the number of working days between two dates, excluding weekends and US federal holidays. Visual day-by-day breakdown, 100% client-side.',
  alternates: { canonical: '/tools/business-days' },
};

const howTo = [
  {
    title: 'Pick a start and end date',
    description: 'Use the two date pickers to define your range. The end date is inclusive — it counts toward the total.',
  },
  {
    title: 'Toggle holiday exclusion',
    description: 'By default, US federal holidays for 2025–2026 are excluded from the work-day count. Turn the toggle off if you only want to exclude weekends.',
  },
  {
    title: 'Read the summary cards',
    description: 'The four stat cards show work days, total calendar days, weekend days, and excluded holidays for your range.',
  },
  {
    title: 'Inspect the day-by-day grid',
    description: 'Below the stats, a calendar-style grid marks every day as a work day (green), holiday (cyan), or weekend (dim) so you can verify the count visually.',
  },
];

const useCases = [
  { title: 'Sprint planning', description: 'Quickly see how many working days a two-week sprint actually contains once holidays are removed.' },
  { title: 'SLA and delivery dates', description: 'Compute a realistic delivery date by counting only business days from today.' },
  { title: 'Invoice and billing periods', description: 'Count billable working days for contractors paid per business day.' },
  { title: 'PTO coverage planning', description: 'See how many working days a leave request spans, excluding public holidays.' },
];

const faqs = [
  {
    question: 'Which holidays are excluded?',
    answer: 'The tool excludes US federal holidays for 2025 and 2026 (New Year\'s Day, MLK Day, Presidents\' Day, Memorial Day, Juneteenth, Independence Day, Labor Day, Columbus Day, Veterans Day, Thanksgiving, and Christmas). Toggle the switch off to count those as work days.',
  },
  {
    question: 'Can I customize the holiday list?',
    answer: 'The current version ships with a fixed US federal holiday set. Region-specific holiday customization is on the roadmap.',
  },
  {
    question: 'Does the calculator account for weekends in non-Saturday/Sunday calendars?',
    answer: 'The tool assumes a Saturday/Sunday weekend, which is the most common pattern. Workweeks with Friday/Sunday weekends (common in parts of the Middle East) are not yet supported.',
  },
  {
    question: 'Is the end date inclusive?',
    answer: 'Yes. If your start and end dates are the same working day, the result is 1 business day. The end date always counts toward the total.',
  },
];

export default function BusinessDaysPage() {
  return (
    <ToolPageLayout
      meta={{ slug: 'business-days', icon: CalendarRange, title: 'Business Days Calculator', emoji: '📅', tagline: 'Working days between two dates, weekends and holidays excluded.' }}
      widget={<BusinessDaysWidget />}
    >
      <HowToUse steps={howTo} />
      <UseCases items={useCases} />
      <FAQSection faqs={faqs} />
    </ToolPageLayout>
  );
}
