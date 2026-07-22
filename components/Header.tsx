'use client';

import Link from 'next/link';
import { Orbit, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2.5 bg-background/70 backdrop-blur-xl border-b border-border/40'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/40 blur-md rounded-full group-hover:bg-indigo-500/60 transition-colors" />
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <Orbit className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Timora
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            <Link
              href="/#tools"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Tools
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-lg glass border border-white/10 dark:border-white/10 border-black/10 text-muted-foreground hover:text-foreground hover:border-indigo-500/40 transition-all text-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Search tools</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-muted/60 text-[10px] font-mono border border-border/60">
                ⌘K
              </kbd>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
