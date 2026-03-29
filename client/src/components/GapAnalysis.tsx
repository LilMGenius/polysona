import React from 'react';

export interface GapAnalysisProps {
  gaps?: string[];
}

export default function GapAnalysis({ gaps = [] }: GapAnalysisProps) {
  if (!gaps || gaps.length === 0) {
    return (
      <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg text-sm text-gray-500">
        No gap data available
      </div>
    );
  }

  // Parses string like "추구미:미니멀↔실제:오버엔지니어링;롤모델:머스크급실행↔실제:리스크회피경향"
  // If `gaps` is array of strings, we join then split by ';'
  const gapItems = gaps.join(';').split(';').map(g => g.trim()).filter(Boolean);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {gapItems.map((item, idx) => {
        const parts = item.split('↔');
        const left = parts[0] || 'Unknown Ideal';
        const right = parts[1] || 'Unknown Reality';

        return (
          <div key={idx} className="flex flex-col rounded-lg border border-amber-500/30 bg-amber-950/10 overflow-hidden">
            <div className="bg-amber-900/20 px-3 py-1.5 border-b border-amber-500/20 flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span className="text-xs font-mono font-medium text-amber-400">GAP IDENTIFIED</span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch p-3 gap-3">
              <div className="flex-1 bg-indigo-900/20 rounded p-3 border border-indigo-500/20">
                <span className="text-[10px] font-mono text-indigo-400 uppercase block mb-1">Conscious / Ideal</span>
                <p className="text-sm text-gray-200">{left.trim()}</p>
              </div>
              <div className="flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-amber-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              </div>
              <div className="flex-1 bg-teal-900/20 rounded p-3 border border-teal-500/20">
                <span className="text-[10px] font-mono text-teal-400 uppercase block mb-1">Unconscious / Reality</span>
                <p className="text-sm text-gray-200">{right.trim()}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
