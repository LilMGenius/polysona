import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import VirtualFollowerGrid, { Follower } from '../components/VirtualFollowerGrid';

export default function VirtualFollower() {
  const [searchParams] = useSearchParams();
  const [personas, setPersonas] = useState<{ id: string; name?: string }[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState(true);
  const selectedContent = searchParams.get('content') || '';

  useEffect(() => {
    fetch('/api/personas')
      .then(r => r.json())
      .then(data => {
        const pList = Array.isArray(data) ? data : (data?.personas || []);
        setPersonas(pList);
        if (pList.length > 0) {
          setSelectedPersona(pList[0].id);
        } else {
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedPersona) return;
    
    setLoading(true);
    const query = selectedContent ? `?content=${encodeURIComponent(selectedContent)}` : '';
    fetch(`/api/personas/${selectedPersona}/qa-simulation${query}`)
      .then(r => r.json())
      .then(data => {
        setFollowers(data?.followers || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedPersona, selectedContent]);

  if (!loading && personas.length === 0) {
    return (
      <div className="max-w-7xl mx-auto h-full flex flex-col pb-10">
        <div className="border-b border-gray-800 pb-6 mb-8">
          <h2 className="text-3xl font-bold text-gray-100 tracking-tight">QA Simulation</h2>
          <p className="text-sm text-gray-500 mt-2 font-mono uppercase tracking-wider">Virtual Follower Testing</p>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-12 border border-dashed border-gray-800 rounded-xl bg-gray-900/30">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">👥</span>
          </div>
          <h3 className="text-xl font-bold text-gray-200 mb-2">No Personas Found</h3>
          <p className="text-gray-400 text-center max-w-md mb-6">
            You need to create a persona before running a QA simulation.
          </p>
          <div className="flex gap-4">
            <code className="bg-gray-950 px-4 py-2 border border-gray-800 rounded text-sm text-teal-400 font-mono">
              $interview
            </code>
            <code className="bg-gray-950 px-4 py-2 border border-gray-800 rounded text-sm text-indigo-400 font-mono">
              /interview
            </code>
          </div>
        </div>
      </div>
    );
  }

  const top5 = followers.filter(f => f.isTop5).sort((a, b) => b.total - a.total);
  const remainingFollowers = followers.filter((f) => !f.isTop5);
  const avgTotal = followers.length > 0 ? Math.round(followers.reduce((acc, f) => acc + f.total, 0) / followers.length) : 0;
  const avgHook = followers.length > 0 ? Math.round(followers.reduce((acc, f) => acc + f.scores.hook, 0) / followers.length) : 0;
  const avgPlatform = followers.length > 0 ? Math.round(followers.reduce((acc, f) => acc + f.scores.platform_fit, 0) / followers.length) : 0;

  const getLeadSignal = (follower: Follower) => {
    const pairs = [
      ['Hook', follower.scores.hook],
      ['Empathy', follower.scores.empathy],
      ['Share', follower.scores.share],
      ['CTA', follower.scores.cta],
      ['Platform fit', follower.scores.platform_fit],
    ] as const;

    return pairs.sort((left, right) => right[1] - left[1])[0];
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-800 pb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-100 tracking-tight">QA Simulation</h2>
          <p className="text-sm text-gray-500 mt-2 font-mono uppercase tracking-wider">Virtual Follower Testing</p>
          {selectedContent ? (
            <div className="mt-3 inline-flex rounded-md border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-mono text-indigo-300">
              Content: {selectedContent}
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs font-mono text-gray-500 uppercase">Persona</label>
          <select 
            className="bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5 font-mono"
            value={selectedPersona || ''}
            onChange={(e) => setSelectedPersona(e.target.value)}
            disabled={loading}
          >
            {personas.map(p => (
              <option key={p.id} value={p.id}>{p.name || p.id}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-8 h-8 bg-teal-500 rounded-full mb-4 animate-bounce"></div>
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">Simulating Audience...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex flex-col">
              <span className="text-gray-500 font-mono text-xs uppercase mb-2 tracking-widest">Avg Total Score</span>
              <span className="text-3xl font-bold text-teal-400 font-mono">{avgTotal}</span>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex flex-col">
              <span className="text-gray-500 font-mono text-xs uppercase mb-2 tracking-widest">Avg Hook Score</span>
              <span className="text-3xl font-bold text-indigo-400 font-mono">{avgHook}</span>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex flex-col">
              <span className="text-gray-500 font-mono text-xs uppercase mb-2 tracking-widest">Avg Platform Fit</span>
              <span className="text-3xl font-bold text-amber-400 font-mono">{avgPlatform}</span>
            </div>
          </div>

          {top5.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-800 pb-2">
                <h3 className="text-xl font-bold text-gray-100">Top 5 Responders</h3>
                <span className="text-[10px] font-bold bg-teal-500/20 text-teal-400 px-2 py-0.5 rounded uppercase tracking-widest">
                  High Conversion
                </span>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.65fr] gap-6 items-start">
                <VirtualFollowerGrid followers={top5} />
                <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-5">
                  <h4 className="text-sm font-mono uppercase tracking-widest text-gray-400">Top 5 Recommendation Notes</h4>
                  <div className="mt-4 space-y-3">
                    {top5.map((follower, index) => {
                      const leadSignal = getLeadSignal(follower);

                      return (
                        <div key={follower.id} className="rounded-lg border border-gray-800 bg-gray-950/70 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-gray-100">#{index + 1} {follower.label}</p>
                            <span className="text-xs font-mono text-teal-400">{follower.total}</span>
                          </div>
                          <p className="mt-2 text-sm text-gray-400">
                            Best signal: <span className="text-gray-200">{leadSignal[0]}</span> at <span className="text-gray-200">{leadSignal[1]}</span>.
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-100 border-b border-gray-800 pb-2">Remaining Audience Profiles</h3>
            <VirtualFollowerGrid followers={remainingFollowers} />
          </div>
        </>
      )}
    </div>
  );
}
