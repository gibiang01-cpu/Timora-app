import type { Metadata } from 'next';
import { Orbit, Zap, Shield, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Timora',
  description: 'Timora is a 100% client-side suite of time and remote-work tools — fast, private, and free.',
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2.5 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/40 blur-md rounded-full" />
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-indigo-600 flex items-center justify-center">
                <Orbit className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">About Timora</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            Timora is a modern, ultra-fast suite of time and remote-work utilities. Every
            tool runs entirely in your browser — no backend, no database, no tracking.
            You get instant results and total privacy.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {[
              { icon: Zap, title: '0ms server lag', desc: 'Everything runs client-side. No round trips.' },
              { icon: Shield, title: 'Zero tracking', desc: 'No analytics, no cookies, no data leaving your device.' },
              { icon: Globe, title: 'Built for remote teams', desc: 'Made by people who schedule across timezones daily.' },
            ].map((f) => (
              <div key={f.title} className="glass rounded-xl p-5 border border-white/10">
                <f.icon className="w-5 h-5 text-indigo-400 mb-3" />
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mb-3">Our principles</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li><strong className="text-foreground">Speed first.</strong> Tools should answer in the time it takes to blink.</li>
            <li><strong className="text-foreground">Privacy by default.</strong> Your data never leaves your device unless you choose to share it.</li>
            <li><strong className="text-foreground">No account needed.</strong> Open a tool, use it, close the tab. That is the whole flow.</li>
            <li><strong className="text-foreground">Open and free.</strong> Timora is free to use and free of dark patterns.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
