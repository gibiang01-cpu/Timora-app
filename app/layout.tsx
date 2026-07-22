import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CommandPalette } from '@/components/CommandPalette';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://timora.app'),
  title: {
    default: 'Timora — Time & Remote Work, Made Simple',
    template: '%s · Timora',
  },
  description:
    'The fastest, cleanest suite for time zones, global clocks, Unix timestamps, and business day planning. 100% client-side, instant, no tracking.',
  keywords: [
    'world clock',
    'time zone converter',
    'unix timestamp converter',
    'business days calculator',
    'remote work tools',
    'timezone overlap',
    'global time',
  ],
  authors: [{ name: 'Timora' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://timora.app',
    siteName: 'Timora',
    title: 'Timora — Time & Remote Work, Made Simple',
    description:
      'The fastest, cleanest suite for time zones, global clocks, Unix timestamps, and business day planning. 100% client-side.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Timora — Time & Remote Work, Made Simple',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Timora — Time & Remote Work, Made Simple',
    description:
      'The fastest, cleanest suite for time zones, global clocks, Unix timestamps, and business day planning.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="relative min-h-screen mesh-bg dark:mesh-bg bg-white dark:mesh-bg mesh-bg-light">
            <Header />
            <main className="relative">{children}</main>
            <Footer />
            <CommandPalette />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
