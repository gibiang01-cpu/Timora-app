import Link from 'next/link';
import { ChevronRight, ArrowLeft, type LucideIcon } from 'lucide-react';

export interface ToolMeta {
  slug: string;
  icon: LucideIcon;
  title: string;
  emoji: string;
  tagline: string;
}

export function ToolHeader({ meta }: { meta: ToolMeta }) {
  const Icon = meta.icon;
  return (
    <div className="pt-28 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/#tools" className="hover:text-foreground transition-colors">Tools</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{meta.title}</span>
        </nav>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center glow-violet">
            <Icon className="w-7 h-7 text-indigo-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{meta.title}</h1>
              <span className="text-xl" aria-hidden>{meta.emoji}</span>
            </div>
            <p className="text-muted-foreground mt-1">{meta.tagline}</p>
          </div>
          <Link
            href="/#tools"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 h-9 rounded-lg glass border border-white/10 text-sm text-muted-foreground hover:text-foreground hover:border-indigo-500/40 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All tools
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ToolPageLayout({
  meta,
  widget,
  children,
}: {
  meta: ToolMeta;
  widget: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolHeader meta={meta} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">{widget}</div>
          <div className="space-y-2">{children}</div>
        </div>
      </div>
    </>
  );
}
