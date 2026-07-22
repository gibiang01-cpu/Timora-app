'use client';

import { useEffect, useState } from 'react';

export interface CityClock {
  city: string;
  country: string;
  tz: string;
}

const DEFAULT_CITIES: CityClock[] = [
  { city: 'San Francisco', country: 'USA', tz: 'America/Los_Angeles' },
  { city: 'New York', country: 'USA', tz: 'America/New_York' },
  { city: 'London', country: 'UK', tz: 'Europe/London' },
  { city: 'Tokyo', country: 'Japan', tz: 'Asia/Tokyo' },
];

export const ORBITAL_CITIES: CityClock[] = [
  { city: 'San Francisco', country: 'USA', tz: 'America/Los_Angeles' },
  { city: 'New York', country: 'USA', tz: 'America/New_York' },
  { city: 'London', country: 'UK', tz: 'Europe/London' },
  { city: 'Tokyo', country: 'Japan', tz: 'Asia/Tokyo' },
];

export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}

export function formatCityTime(date: Date | null, tz: string, opts?: Intl.DateTimeFormatOptions): string {
  if (!date) return '--:--';
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    ...opts,
  }).format(date);
}

export function formatCityLabel(date: Date | null, tz: string): string {
  if (!date) return '--:--';
  return formatCityTime(date, tz);
}

export function getCityHour(date: Date | null, tz: string): number {
  if (!date) return 0;
  const hourStr = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: '2-digit',
    hour12: false,
  }).format(date);
  return parseInt(hourStr, 10) % 24;
}

export { DEFAULT_CITIES };
