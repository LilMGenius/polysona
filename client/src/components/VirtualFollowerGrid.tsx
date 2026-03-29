import React from 'react';

export interface Follower {
  id: string;
  label: string;
  age: number;
  gender: string;
  occupation: string;
  scores: {
    hook: number;
    empathy: number;
    share: number;
    cta: number;
    platform_fit: number;
  };
  total: number;
  isTop5: boolean;
}

export interface VirtualFollowerGridProps {
  followers: Follower[];
}

export default function VirtualFollowerGrid({ followers = [] }: VirtualFollowerGridProps) {
  if (!followers || followers.length === 0) {
    return (
      <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg text-sm text-gray-500">
        No followers generated
      </div>
    );
  }

  const MiniBar = ({ label, value }: { label: string; value: number }) => (
    <div className="flex items-center gap-2">
      <span className="w-6 text-[9px] font-mono text-gray-500 uppercase">{label}</span>
      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${value > 70 ? 'bg-teal-500' : value > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-6 text-[9px] font-mono text-right text-gray-400">{value}</span>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {followers.map(f => (
        <div 
          key={f.id} 
          className={`flex flex-col p-3 rounded-xl border transition-all ${
            f.isTop5 
              ? 'bg-teal-950/10 border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.1)]' 
              : 'bg-gray-900 border-gray-800 hover:border-gray-700'
          }`}
        >
          <div className="flex items-start justify-between mb-3 border-b border-gray-800/50 pb-2">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-200 truncate" title={f.label}>
                {f.label}
              </span>
              <span className="text-[10px] text-gray-500 font-mono mt-0.5">
                {f.age}{f.gender} · {f.occupation}
              </span>
            </div>
            {f.isTop5 && (
              <span className="text-[9px] font-bold bg-teal-500/20 text-teal-400 px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
                Top 5
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5 mb-3">
            <MiniBar label="HK" value={f.scores.hook} />
            <MiniBar label="EM" value={f.scores.empathy} />
            <MiniBar label="SH" value={f.scores.share} />
            <MiniBar label="CT" value={f.scores.cta} />
            <MiniBar label="PF" value={f.scores.platform_fit} />
          </div>

          <div className="mt-auto pt-2 border-t border-gray-800/50 flex items-center justify-between">
            <span className="text-[10px] font-mono text-gray-500">TOTAL SCORE</span>
            <span className={`text-sm font-bold font-mono ${f.isTop5 ? 'text-teal-400' : 'text-gray-300'}`}>
              {f.total}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
