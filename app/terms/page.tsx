import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms governing your use of Timora.',
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().getFullYear()}</p>

          <div className="space-y-6 text-muted-foreground leading-relaxed mt-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Acceptance</h2>
              <p>By using Timora you agree to these terms. If you do not agree, do not use the service.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">As-is service</h2>
              <p>Timora is provided &quot;as is&quot; without warranty of any kind. Time calculations depend on your device clock and the browser&apos;s time zone database; we are not liable for decisions made based on the tool&apos;s output.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Acceptable use</h2>
              <p>Do not attempt to disrupt or reverse-engineer the service for malicious purposes. The tools are provided for legitimate personal and professional use.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Changes</h2>
              <p>We may update these terms from time to time. Continued use after changes constitutes acceptance.</p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
