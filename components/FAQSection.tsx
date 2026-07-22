'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSection({ faqs }: { faqs: FAQItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <section className="py-12">
      <div className="max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground mb-8">
          Quick answers about how this tool works.
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="glass rounded-xl px-5 mb-3 border border-white/10 dark:border-white/10 border-black/10"
            >
              <AccordionTrigger className="text-left font-medium hover:text-indigo-400 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
