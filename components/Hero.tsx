'use client';

import Link from 'next/link';
import { ArrowRight, Pin, Zap } from 'lucide-react';
import { OrbitalGlobe } from './OrbitalGlobe';

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-indigo-500/30 text-xs font-medium text-indigo-300 mb-6">
              <Zap className="w-3.5 h-3.5" />
              100% Client-Side & Instant
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
              Time & Remote Work,
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Made Simple.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              The fastest, cleanest suite for time zones, global clocks,
              timestamps, and business planning. No backend, no tracking, no
              waiting — just answers.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <Link
                href="/#tools"
                className="group inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-lg glow-violet hover:shadow-indigo-500/50 transition-all hover:scale-[1.02]"
              >
                Explore Tools
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/tools/world-clock"
                className="inline-flex items-center gap-2 px-6 h-12 rounded-xl glass border border-white/15 dark:border-white/15 border-black/15 text-foreground font-semibold hover:border-indigo-500/50 transition-all"
              >
                <Pin className="w-4 h-4" />
                Pin World Clock
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              {[
                { label: 'Tools', value: '4' },
                { label: 'Server lag', value: '0ms' },
                { label: 'Tracking', value: 'None' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-scale-in">
            <OrbitalGlobe />
          </div>
        </div>
      </div>
    </section>
  );
}
