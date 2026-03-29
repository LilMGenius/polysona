import { useEffect, useState } from 'react';
import AgentStatusCard, { AgentStatusCardProps } from '../components/AgentStatusCard';

export default function AgentMonitor() {
  const [agents, setAgents] = useState<AgentStatusCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/agents/status')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAgents(data);
        } else {
          setAgents([]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-10 max-w-7xl mx-auto h-full flex flex-col pb-10">
      <div className="border-b border-gray-800 pb-6">
        <h2 className="text-3xl font-bold text-gray-100 tracking-tight">Agent Monitor</h2>
        <p className="text-sm text-gray-500 mt-2 font-mono uppercase tracking-wider">Background Task Orchestration</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-100 border-b border-gray-800 pb-2">Active Agents</h3>
        
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="w-8 h-8 bg-teal-500 rounded-full animate-pulse"></div>
          </div>
        ) : agents.length === 0 ? (
          <div className="p-8 border border-dashed border-gray-800 rounded-lg text-center bg-gray-900/30">
            <p className="text-gray-400 text-sm">No agents available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {agents.map((agent, i) => (
              <AgentStatusCard key={i} {...agent} />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-100 border-b border-gray-800 pb-2">How to Invoke</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl relative overflow-hidden group hover:border-teal-500/50 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl -z-10 group-hover:bg-teal-500/10 transition-colors"></div>
            <h4 className="text-teal-400 font-mono font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>Codex Compatible</span>
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-4 border border-gray-800 bg-gray-950 p-3 rounded">
                <code className="text-sm text-teal-400 font-mono w-28 shrink-0">$interview</code>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Trigger Profiler</span>
              </div>
              <div className="flex items-center gap-4 border border-gray-800 bg-gray-950 p-3 rounded">
                <code className="text-sm text-teal-400 font-mono w-28 shrink-0">$trend</code>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Trigger Trendsetter</span>
              </div>
              <div className="flex items-center gap-4 border border-gray-800 bg-gray-950 p-3 rounded">
                <code className="text-sm text-teal-400 font-mono w-28 shrink-0">$content</code>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Trigger Content Writer</span>
              </div>
              <div className="flex items-center gap-4 border border-gray-800 bg-gray-950 p-3 rounded">
                <code className="text-sm text-teal-400 font-mono w-28 shrink-0">$qa</code>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Trigger Virtual Follower</span>
              </div>
              <div className="flex items-center gap-4 border border-gray-800 bg-gray-950 p-3 rounded">
                <code className="text-sm text-teal-400 font-mono w-28 shrink-0">$publish</code>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Trigger Admin</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl -z-10 group-hover:bg-indigo-500/10 transition-colors"></div>
            <h4 className="text-indigo-400 font-mono font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>Claude Code</span>
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-4 border border-gray-800 bg-gray-950 p-3 rounded">
                <code className="text-sm text-indigo-400 font-mono w-28 shrink-0">/interview</code>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Trigger Profiler</span>
              </div>
              <div className="flex items-center gap-4 border border-gray-800 bg-gray-950 p-3 rounded">
                <code className="text-sm text-indigo-400 font-mono w-28 shrink-0">/trend</code>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Trigger Trendsetter</span>
              </div>
              <div className="flex items-center gap-4 border border-gray-800 bg-gray-950 p-3 rounded">
                <code className="text-sm text-indigo-400 font-mono w-28 shrink-0">/content</code>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Trigger Content Writer</span>
              </div>
              <div className="flex items-center gap-4 border border-gray-800 bg-gray-950 p-3 rounded">
                <code className="text-sm text-indigo-400 font-mono w-28 shrink-0">/qa</code>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Trigger Virtual Follower</span>
              </div>
              <div className="flex items-center gap-4 border border-gray-800 bg-gray-950 p-3 rounded">
                <code className="text-sm text-indigo-400 font-mono w-28 shrink-0">/publish</code>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Trigger Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}