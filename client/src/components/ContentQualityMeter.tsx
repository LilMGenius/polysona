import React from 'react';

export interface ContentQualityMeterProps {
  hookStrength: number;
  empathy: number;
  shareIntent: number;
  ctaResponse: number;
  platformFit: number;
}

export default function ContentQualityMeter({
  hookStrength,
  empathy,
  shareIntent,
  ctaResponse,
  platformFit
}: ContentQualityMeterProps) {
  
  const getColor = (val: number) => {
    if (val <= 40) return 'bg-red-500 text-red-500';
    if (val <= 70) return 'bg-amber-500 text-amber-500';
    return 'bg-teal-500 text-teal-500';
  };

  const getBgColor = (val: number) => {
    if (val <= 40) return 'bg-red-500/20';
    if (val <= 70) return 'bg-amber-500/20';
    return 'bg-teal-500/20';
  };

  const total = hookStrength + empathy + shareIntent + ctaResponse + platformFit;
  const avg = Math.round(total / 5);

  const MetricBar = ({ label, value }: { label: string, value: number }) => (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-end">
        <span className="text-xs font-mono text-gray-400">{label}</span>
        <span className={`text-sm font-bold ${getColor(value).split(' ')[1]}`}>{value}</span>
      </div>
      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${getColor(value).split(' ')[0]}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="p-4 rounded-xl border border-gray-800 bg-gray-900 flex flex-col gap-5">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <h3 className="text-sm font-semibold text-gray-300">Quality Dimensions</h3>
        <div className={`px-2 py-1 rounded-md ${getBgColor(avg)} flex items-center gap-2`}>
          <span className="text-xs font-mono text-gray-300">AVG SCORE</span>
          <span className={`text-sm font-bold ${getColor(avg).split(' ')[1]}`}>{avg}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <MetricBar label="HOOK STRENGTH" value={hookStrength} />
        <MetricBar label="EMPATHY" value={empathy} />
        <MetricBar label="SHARE INTENT" value={shareIntent} />
        <MetricBar label="CTA RESPONSE" value={ctaResponse} />
        <div className="sm:col-span-2">
          <MetricBar label="PLATFORM FIT" value={platformFit} />
        </div>
      </div>
    </div>
  );
}
