import React from 'react';

export interface PersonaData {
  blind?: { johari?: string; gap?: string }[];
  core?: { tags?: string; anti?: string }[];
  decide?: { priority?: string; approach?: string }[];
}

export interface NuanceData {
  voice?: { register?: string; mix?: string }[];
}

export interface AccountsData {
  ideal?: { id?: string; name?: string; why?: string }[];
  rolemodel?: { id?: string; handle?: string; platform?: string; domain?: string; metric?: string }[];
}

export interface SelfLayerDiagramProps {
  persona?: PersonaData;
  nuance?: NuanceData;
  accounts?: AccountsData;
}

type TableRow = Record<string, unknown>
type TableValue = TableRow[] | { table?: TableRow[] } | undefined

function extractRows(value: TableValue): TableRow[] {
  if (!value) {
    return []
  }

  if (Array.isArray(value)) {
    return value
  }

  return Array.isArray(value.table) ? value.table : []
}

function firstNonEmptyString(row: TableRow | undefined, keys: string[]): string | undefined {
  if (!row) {
    return undefined
  }

  for (const key of keys) {
    const value = row[key]
    if (typeof value === 'string' && value.trim()) {
      return value
    }
  }

  return undefined
}

export default function SelfLayerDiagram({ persona, nuance, accounts }: SelfLayerDiagramProps) {
  const getSafeStr = (val: string | undefined, fallback = 'Unknown') => val || fallback;
  const blindRows = extractRows(persona?.blind as TableValue)
  const voiceRows = extractRows(nuance?.voice as TableValue)
  const idealRows = extractRows(accounts?.ideal as TableValue)
  const rolemodelRows = extractRows(accounts?.rolemodel as TableValue)
  const coreRows = extractRows(persona?.core as TableValue)
  const decideRows = extractRows(persona?.decide as TableValue)

  const layer1 = getSafeStr(firstNonEmptyString(blindRows[0], ['johari', 'description', 'type']));
  const layer2 = getSafeStr(firstNonEmptyString(voiceRows[0], ['register', 'style', 'tone']));
  const layer3 = idealRows.map((row) => firstNonEmptyString(row, ['name', 'why', 'id'])).filter(Boolean).join(', ') || decideRows.map((row) => firstNonEmptyString(row, ['priority', 'approach'])).filter(Boolean).join(', ') || 'No ideal signal captured yet';
  const layer4 = rolemodelRows.map((row) => firstNonEmptyString(row, ['handle', 'domain', 'platform', 'name', 'id'])).filter(Boolean).join(', ') || 'No rolemodels set';

  const tags = coreRows.map((row) => firstNonEmptyString(row, ['tags', 'value', 'layer'])).filter(Boolean).join(' · ');
  const anti = coreRows.map((row) => firstNonEmptyString(row, ['anti', 'source'])).filter(Boolean).join(' · ');
  const layer5 = [tags, anti].filter(Boolean).join(' | ') || 'Unknown core';

  const gap = firstNonEmptyString(blindRows[0], ['gap']);

  const LayerCard = ({ num, title, content, badge, colorClass }: { num: number, title: string, content: string, badge: string, colorClass: string }) => (
    <div className={`relative flex flex-col p-4 rounded-xl border ${colorClass} transition-all hover:scale-[1.01]`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center text-xs font-bold font-mono">
            {num}
          </div>
          <h4 className="font-semibold text-sm tracking-wide uppercase">{title}</h4>
        </div>
        <span className="text-xs px-2 py-1 rounded-md bg-black/30 font-mono text-white/80">{badge}</span>
      </div>
      <p className="text-sm opacity-90">{content}</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-3 w-full max-w-2xl mx-auto">
      <LayerCard 
        num={1} 
        title="Observed Self" 
        content={layer1} 
        badge="Johari / 五倫" 
        colorClass="bg-teal-900/40 border-teal-500/30 text-teal-100" 
      />
      <div className="flex justify-center -my-2 z-10">
        <svg className="w-5 h-5 text-teal-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>
      <LayerCard 
        num={2} 
        title="Presented Self" 
        content={layer2} 
        badge="Goffman" 
        colorClass="bg-teal-800/50 border-teal-500/40 text-teal-50" 
      />
      <div className="flex justify-center -my-2 z-10">
        <svg className="w-5 h-5 text-indigo-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>
      
      {gap && (
        <div className="flex justify-center z-20 my-1">
          <div className="bg-red-950/80 border border-red-500/50 text-red-200 text-xs px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg max-w-sm text-center">
            <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span className="font-mono truncate">GAP: {gap}</span>
          </div>
        </div>
      )}

      <LayerCard 
        num={3} 
        title="Conscious Ideal" 
        content={layer3} 
        badge="Accounts" 
        colorClass="bg-indigo-900/40 border-indigo-500/30 text-indigo-100" 
      />
      <div className="flex justify-center -my-2 z-10">
        <svg className="w-5 h-5 text-indigo-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>
      <LayerCard 
        num={4} 
        title="Rolemodel" 
        content={layer4} 
        badge="Benchmark" 
        colorClass="bg-indigo-800/50 border-indigo-500/40 text-indigo-50" 
      />
      <div className="flex justify-center -my-2 z-10">
        <svg className="w-5 h-5 text-purple-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>
      <LayerCard 
        num={5} 
        title="Unconscious Self" 
        content={layer5} 
        badge="McAdams / IFS / Koan" 
        colorClass="bg-purple-900/60 border-purple-500/50 text-purple-50" 
      />
    </div>
  );
}
