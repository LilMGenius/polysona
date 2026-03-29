import React from 'react';

export interface InterviewTimelineEntry {
  date: string;
  content: string;
}

export interface InterviewTimelineProps {
  entries?: InterviewTimelineEntry[];
}

export default function InterviewTimeline({ entries = [] }: InterviewTimelineProps) {
  if (!entries || entries.length === 0) {
    return (
      <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg text-sm text-gray-500">
        No interview log entries available
      </div>
    );
  }

  const getFrameworkInfo = (content: string) => {
    if (content.includes('GAP:')) return { badge: 'GAP', color: 'bg-red-500/20 text-red-400 border-red-500/30', isGap: true };
    if (content.includes('McAdams:')) return { badge: 'McAdams', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', isGap: false };
    if (content.includes('Laddering:')) return { badge: 'Laddering', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', isGap: false };
    if (content.includes('Johari:')) return { badge: 'Johari', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', isGap: false };
    return { badge: 'Note', color: 'bg-gray-800 text-gray-400 border-gray-700', isGap: false };
  };

  return (
    <div className="relative pl-4 sm:pl-0">
      {/* Center line for larger screens, left line for small */}
      <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gray-800 sm:-translate-x-1/2" />
      
      <div className="flex flex-col gap-6">
        {entries.map((entry, idx) => {
          const { badge, color, isGap } = getFrameworkInfo(entry.content);
          const isEven = idx % 2 === 0;
          
          return (
            <div key={idx} className={`relative flex sm:items-center flex-col sm:flex-row gap-4 sm:gap-0 ${isEven ? 'sm:flex-row-reverse' : ''}`}>
              
              {/* Center Dot */}
              <div className="absolute left-0 sm:left-1/2 w-3 h-3 rounded-full border-2 border-gray-900 bg-gray-600 sm:-translate-x-1/2 translate-y-1.5 sm:translate-y-0 z-10" />
              
              {/* Content Box */}
              <div className={`sm:w-1/2 pl-8 sm:pl-0 ${isEven ? 'sm:pr-8 text-left sm:text-right' : 'sm:pl-8 text-left'}`}>
                <div className={`p-4 rounded-xl border ${isGap ? 'border-red-500/50 bg-red-950/10' : 'border-gray-800 bg-gray-900'} shadow-sm`}>
                  <div className={`flex items-center gap-2 mb-2 ${isEven ? 'sm:flex-row-reverse' : ''}`}>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${color}`}>
                      {badge}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">{entry.date}</span>
                    {isGap && (
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    )}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {entry.content}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
