import React from 'react';

const FRAMEWORKS = [
  { id: 'mcadams', name: 'McAdams Life Story', category: 'western-deep', extracts: 'core (narrative, turning points)' },
  { id: 'laddering', name: 'Laddering +MI+ACT', category: 'western-deep', extracts: 'decide (value hierarchy)' },
  { id: 'clean-lang', name: 'Clean Language', category: 'western-deep', extracts: 'voice (metaphor system)' },
  { id: 'johari', name: 'Johari Window', category: 'western-deep', extracts: 'blind (blind spots)' },
  { id: 'ifs', name: 'IFS', category: 'western-deep', extracts: 'blind (inner parts)' },
  { id: 'repertory', name: 'Repertory Grid', category: 'western-deep', extracts: 'decide (judgment grid)' },
  { id: 'object-rel', name: 'Object Relations', category: 'western-supp', extracts: 'core (relationship patterns)' },
  { id: 'projective', name: 'Projective Technique', category: 'western-supp', extracts: 'blind (defense bypass)' },
  { id: 'zen-koan', name: 'Zen Koan', category: 'eastern', extracts: 'core (intuitive response)' },
  { id: 'olyun', name: '五倫+陰陽', category: 'eastern', extracts: 'core (relational self + polarity)' },
];

export interface InterviewLogEntry {
  date: string;
  content: string;
}

export interface FrameworkCoverageProps {
  interviewLog?: InterviewLogEntry[];
}

export default function FrameworkCoverage({ interviewLog = [] }: FrameworkCoverageProps) {
  const combinedLog = interviewLog.map(l => l.content.toLowerCase()).join(' ');

  const getAppliedStatus = (id: string, name: string) => {
    // Basic keyword match
    return combinedLog.includes(id.toLowerCase()) || combinedLog.includes(name.toLowerCase().split(' ')[0]);
  };

  let appliedCount = 0;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {FRAMEWORKS.map(fw => {
          const isApplied = getAppliedStatus(fw.id, fw.name);
          if (isApplied) appliedCount++;
          
          return (
            <div 
              key={fw.id} 
              className={`p-3 rounded-lg border flex flex-col gap-2 transition-colors ${
                isApplied 
                  ? 'bg-teal-950/30 border-teal-500/50' 
                  : 'bg-gray-900/30 border-gray-800'
              }`}
            >
              <div className="flex items-start justify-between gap-1">
                <h4 className={`text-sm font-semibold leading-tight ${isApplied ? 'text-teal-300' : 'text-gray-500'}`}>
                  {fw.name}
                </h4>
                {isApplied && (
                  <svg className="w-4 h-4 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                )}
              </div>
              <div className="mt-auto flex flex-col gap-1">
                <span className={`text-[10px] px-1.5 py-0.5 rounded w-fit font-mono ${
                  isApplied ? 'bg-teal-900/50 text-teal-200' : 'bg-gray-800 text-gray-500'
                }`}>
                  {fw.category}
                </span>
                <span className={`text-xs ${isApplied ? 'text-teal-100/70' : 'text-gray-600'}`}>
                  {fw.extracts}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900/50 rounded-lg border border-gray-800">
        <span className="text-sm text-gray-400 font-mono">COVERAGE</span>
        <div className="flex items-center gap-2">
          <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-teal-500 transition-all duration-500" 
              style={{ width: `${(appliedCount / 10) * 100}%` }}
            />
          </div>
          <span className="text-sm font-bold text-teal-400 font-mono">{appliedCount}/10</span>
        </div>
      </div>
    </div>
  );
}
