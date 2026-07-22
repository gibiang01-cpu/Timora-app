'use client';

import { useEffect, useState } from 'react';

const PINNED_KEY = 'timora:pinned-cities';

export interface PinnedCity {
  id: string;
  city: string;
  country: string;
  tz: string;
}

const DEFAULT_PINNED: PinnedCity[] = [
  { id: 'sf', city: 'San Francisco', country: 'USA', tz: 'America/Los_Angeles' },
  { id: 'ny', city: 'New York', country: 'USA', tz: 'America/New_York' },
  { id: 'london', city: 'London', country: 'UK', tz: 'Europe/London' },
  { id: 'tokyo', city: 'Tokyo', country: 'Japan', tz: 'Asia/Tokyo' },
];

export function usePinnedCities() {
  const [pinned, setPinned] = useState<PinnedCity[]>(DEFAULT_PINNED);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PINNED_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PinnedCity[];
        if (Array.isArray(parsed)) setPinned(parsed);
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(PINNED_KEY, JSON.stringify(pinned));
    } catch {
      // ignore
    }
  }, [pinned, loaded]);

  const addCity = (city: PinnedCity) => {
    setPinned((prev) =>
      prev.some((c) => c.tz === city.tz) ? prev : [...prev, city]
    );
  };

  const removeCity = (id: string) => {
    setPinned((prev) => prev.filter((c) => c.id !== id));
  };

  return { pinned, addCity, removeCity, loaded };
}
