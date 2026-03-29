import React from 'react';

export interface VoiceMixBarProps {
  mix?: string;
}

export default function VoiceMixBar({ mix = '' }: VoiceMixBarProps) {
  if (!mix) {
    return (
      <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg text-sm text-gray-500">
        No voice mix data available
      </div>
    );
  }

  // Parses string like "도발40%;기술30%;유머20%;진심10%"
  const segments = mix.split(';').map(s => s.trim()).filter(Boolean).map(s => {
    const match = s.match(/(.+?)(\d+)%?/);
    if (match) {
      return {
        label: match[1].trim(),
        percent: parseInt(match[2], 10)
      };
    }
    return null;
  }).filter((s): s is { label: string; percent: number } => s !== null);

  if (segments.length === 0) {
    return (
      <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg text-sm text-gray-500">
        Invalid voice mix format
      </div>
    );
  }

  const colors = [
    'bg-teal-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-blue-500',
    'bg-cyan-500'
  ];

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex h-8 w-full rounded-lg overflow-hidden border border-gray-700">
        {segments.map((seg, idx) => (
          <div 
            key={idx}
            className={`${colors[idx % colors.length]} h-full transition-all duration-500 hover:brightness-110 flex items-center justify-center`}
            style={{ width: `${seg.percent}%` }}
            title={`${seg.label} ${seg.percent}%`}
          >
            {seg.percent >= 10 && (
              <span className="text-[10px] font-bold text-white/90 drop-shadow-md">
                {seg.percent}%
              </span>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap items-center gap-4 mt-1">
        {segments.map((seg, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded-sm ${colors[idx % colors.length]}`} />
            <span className="text-xs text-gray-300 font-medium">{seg.label}</span>
            <span className="text-xs font-mono text-gray-500">{seg.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
