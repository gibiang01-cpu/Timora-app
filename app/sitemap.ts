import { MetadataRoute } from 'next';
import { TZ_PAIRS } from '@/lib/timezone-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://timora.app';
  const now = new Date();

  const coreRoutes = [
    { route: '', priority: 1 },
    { route: '/about', priority: 0.6 },
    { route: '/contact', priority: 0.6 },
    { route: '/privacy', priority: 0.4 },
    { route: '/terms', priority: 0.4 },
    { route: '/tools/world-clock', priority: 0.9 },
    { route: '/tools/timezone-overlap', priority: 0.9 },
    { route: '/tools/unix-converter', priority: 0.9 },
    { route: '/tools/business-days', priority: 0.9 },
  ];

  const core = coreRoutes.map(({ route, priority }) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority,
  }));

  const converterRoutes = TZ_PAIRS.map((p) => ({
    url: `${base}/tools/timezone-converter/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...core, ...converterRoutes];
}
