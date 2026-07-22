'use client';

import { useEffect, useState } from 'react';

export function UnixConverterPreview() {
  const [ts, setTs] = useState(0);

  useEffect(() => {
    setTs(Math.floor(Date.now() / 1000));
    const id = setInterval(() => setTs(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const date = new Date(ts * 1000);
  const human = date.toLocaleTimeString('en-US', { hour12: false });

  return (
    <div className="flex flex-col gap-1 w-full text-xs font-mono">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">epoch</span>
        <span className="text-cyan-400">{ts}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">UTC</span>
        <span className="text-indigo-400">{human}</span>
      </div>
    </div>
  );
}
