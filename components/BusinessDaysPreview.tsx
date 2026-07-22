'use client';

import { useState } from 'react';

export function BusinessDaysPreview() {
  const [workdays, setWorkdays] = useState(0);

  return (
    <div className="flex items-center gap-3 w-full">
      <input
        type="range"
        min={1}
        max={30}
        defaultValue={14}
        onChange={(e) => setWorkdays(parseInt(e.target.value))}
        className="flex-1 accent-indigo-500 h-1"
      />
      <div className="flex items-center gap-1.5 text-xs">
        <span className="text-violet-400 font-mono font-semibold">
          {workdays || 14 - Math.floor((workdays || 14) / 7) * 2}
        </span>
        <span className="text-muted-foreground">work days</span>
      </div>
    </div>
  );
}
