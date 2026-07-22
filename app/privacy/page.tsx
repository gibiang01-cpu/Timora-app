import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Timora does not track you. All tools run client-side and no personal data is collected.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose prose-invert max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().getFullYear()}</p>

          <div className="space-y-6 text-muted-foreground leading-relaxed mt-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">No tracking</h2>
              <p>Timora does not use analytics, advertising trackers, cookies, or fingerprinting. We do not collect personal data.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Client-side storage</h2>
              <p>Some tools store preferences (such as pinned cities) in your browser&apos;s localStorage. This data never leaves your device and is not accessible to us.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">No backend</h2>
              <p>Timora is a fully static site. There is no server processing your input. Everything runs in your browser.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Contact</h2>
              <p>If you have questions about this policy, reach us at hello@timora.app.</p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
