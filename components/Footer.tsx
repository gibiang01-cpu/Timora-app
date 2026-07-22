import Link from 'next/link';
import { Orbit, Github, Twitter, Linkedin } from 'lucide-react';

const footerLinks = [
  {
    title: 'Tools',
    links: [
      { label: 'World Clock', href: '/tools/world-clock' },
      { label: 'Timezone Overlap', href: '/tools/timezone-overlap' },
      { label: 'Unix Converter', href: '/tools/unix-converter' },
      { label: 'Business Days', href: '/tools/business-days' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Time Zone Map', href: '/#tools' },
      { label: 'UTC Reference', href: '/tools/unix-converter' },
      { label: 'Remote Work Guide', href: '/about' },
      { label: 'Sitemap', href: '/sitemap.xml' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-950/20 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 group mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/40 blur-md rounded-full" />
                <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Orbit className="w-4 h-4 text-white" />
                </div>
              </div>
              <span className="text-lg font-semibold tracking-tight">Timora</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              The fastest, cleanest suite for time zones, global clocks, timestamps, and remote work planning. 100% client-side, instant, no tracking.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-lg glass border border-white/10 dark:border-white/10 border-black/10 flex items-center justify-center text-muted-foreground hover:text-indigo-400 hover:border-indigo-500/50 transition-all" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg glass border border-white/10 dark:border-white/10 border-black/10 flex items-center justify-center text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/50 transition-all" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg glass border border-white/10 dark:border-white/10 border-black/10 flex items-center justify-center text-muted-foreground hover:text-indigo-400 hover:border-indigo-500/50 transition-all" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="md:col-span-2.5 md:col-span-[2.5] flex flex-col">
              <h3 className="text-sm font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Timora. All rights reserved. Built for remote teams worldwide.
          </p>
          <p className="text-xs text-muted-foreground">
            100% client-side · Zero tracking · 0ms server lag
          </p>
        </div>
      </div>
    </footer>
  );
}
