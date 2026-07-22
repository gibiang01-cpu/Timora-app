import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-32 pb-20 min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-indigo-500/30 blur-2xl rounded-full animate-pulse-glow" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/40 flex items-center justify-center glow-violet">
              <Compass className="w-8 h-8 text-indigo-400" />
            </div>
          </div>

          <h1 className="text-6xl font-bold tracking-tight mb-3 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-xl font-semibold mb-3">Lost in a different time zone</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The page you are looking for has drifted out of sync. Let&apos;s get you back to
            a timezone that exists.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-lg glow-violet hover:scale-[1.02] transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Timora
          </Link>
        </div>
      </div>
    </div>
  );
}
