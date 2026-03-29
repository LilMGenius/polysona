import React from 'react';

export interface AgentStatusCardProps {
  name: string;
  description: string;
  status: 'idle' | 'active' | 'error';
  lastActivity: string | null;
  skillCount: number;
}

export default function AgentStatusCard({
  name,
  description,
  status,
  lastActivity,
  skillCount
}: AgentStatusCardProps) {
  
  const statusStyles = {
    idle: { dot: 'bg-gray-500', text: 'text-gray-400', border: 'border-gray-800' },
    active: { dot: 'bg-teal-500 animate-pulse-teal', text: 'text-teal-400', border: 'border-teal-500/30' },
    error: { dot: 'bg-red-500', text: 'text-red-400', border: 'border-red-500/30' }
  };

  const style = statusStyles[status];

  return (
    <div className={`flex flex-col p-4 rounded-xl bg-gray-900 border ${style.border} transition-colors`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-gray-100 font-mono">{name}</h3>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-mono uppercase ${style.text}`}>{status}</span>
          <div className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
        </div>
      </div>
      
      <p className="text-sm text-gray-400 mb-4 h-10">{description}</p>
      
      <div className="mt-auto grid grid-cols-2 gap-2 pt-3 border-t border-gray-800">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-gray-500 uppercase">Last Activity</span>
          <span className="text-xs text-gray-300 truncate">{lastActivity || 'Never'}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-mono text-gray-500 uppercase">Skills</span>
          <span className="text-xs text-gray-300">{skillCount} loaded</span>
        </div>
      </div>
    </div>
  );
}
