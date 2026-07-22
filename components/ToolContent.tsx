import { Check } from 'lucide-react';

export interface UseCase {
  title: string;
  description: string;
}

export interface ToolContent {
  howTo: { title: string; description: string }[];
  useCases: UseCase[];
  faqs: { question: string; answer: string }[];
}

export function HowToUse({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <section className="py-12">
      <div className="max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">How to Use</h2>
        <p className="text-muted-foreground mb-8">
          Follow these steps to get the most out of this tool.
        </p>
        <ol className="space-y-5">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/15 border border-indigo-500/40 text-indigo-400 flex items-center justify-center text-sm font-semibold">
                {i + 1}
              </div>
              <div className="pt-1">
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function UseCases({ items }: { items: UseCase[] }) {
  return (
    <section className="py-12">
      <div className="max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Key Features & Use Cases</h2>
        <p className="text-muted-foreground mb-8">
          Built for the real workflows of distributed teams.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="glass rounded-xl p-5 border border-white/10 dark:border-white/10 border-black/10 hover:border-indigo-500/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-md bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
