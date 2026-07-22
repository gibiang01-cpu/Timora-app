import type { Metadata } from 'next';
import { Mail, MessageSquare, Github } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Timora',
  description: 'Get in touch with the Timora team for feedback, feature requests, or partnerships.',
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Contact</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            Have a feature request, found a bug, or want to suggest a city for the World
            Clock? We would love to hear from you.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <a href="mailto:hello@timora.app" className="glass rounded-xl p-5 border border-white/10 hover:border-indigo-500/40 transition-all group">
              <Mail className="w-5 h-5 text-indigo-400 mb-3" />
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-sm text-muted-foreground">hello@timora.app</p>
            </a>
            <a href="#" className="glass rounded-xl p-5 border border-white/10 hover:border-indigo-500/40 transition-all group">
              <MessageSquare className="w-5 h-5 text-cyan-400 mb-3" />
              <h3 className="font-semibold mb-1">Feedback</h3>
              <p className="text-sm text-muted-foreground">Send us your tool ideas.</p>
            </a>
            <a href="#" className="glass rounded-xl p-5 border border-white/10 hover:border-indigo-500/40 transition-all group">
              <Github className="w-5 h-5 text-violet-400 mb-3" />
              <h3 className="font-semibold mb-1">Open source</h3>
              <p className="text-sm text-muted-foreground">File issues and PRs on GitHub.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
