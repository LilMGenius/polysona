import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AgentStatusCard, { AgentStatusCardProps } from '../components/AgentStatusCard';

export default function Home() {
  const [status, setStatus] = useState<{ version?: string; workspace?: string } | null>(null);
  const [personas, setPersonas] = useState<{ id: string; name?: string }[]>([]);
  const [agents, setAgents] = useState<AgentStatusCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/status').then(r => r.json()),
      fetch('/api/personas').then(r => r.json()),
      fetch('/api/agents/status').then(r => r.json())
    ])
      .then(([statusData, personasData, agentsData]) => {
        setStatus(statusData);
        setPersonas(Array.isArray(personasData) ? personasData : (personasData?.personas || []));

        if (Array.isArray(agentsData)) {
          setAgents(agentsData);
        } else if (agentsData?.agents) {
          setAgents(agentsData.agents);
        } else {
          setAgents([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-10 max-w-7xl mx-auto h-full flex flex-col pb-10">
      <div className="border-b border-gray-800 pb-6">
        <h2 className="text-3xl font-bold text-gray-100 tracking-tight">System Status</h2>
        <p className="text-sm text-gray-500 mt-2 font-mono uppercase tracking-wider">Polysona Orchestrator Dashboard</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex flex-col">
          <span className="text-gray-500 font-mono text-xs uppercase mb-2 tracking-widest">Version</span>
          <span className="text-2xl font-bold text-teal-400 font-mono">{status?.version || '1.2.1'}</span>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex flex-col">
          <span className="text-gray-500 font-mono text-xs uppercase mb-2 tracking-widest">Workspace</span>
          <span className="text-sm font-bold text-gray-200 truncate">{status?.workspace || 'Local'}</span>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex flex-col">
          <span className="text-gray-500 font-mono text-xs uppercase mb-2 tracking-widest">Personas</span>
          <span className="text-2xl font-bold text-indigo-400 font-mono">{personas.length}</span>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex flex-col">
          <span className="text-gray-500 font-mono text-xs uppercase mb-2 tracking-widest">System Status</span>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse-teal"></div>
            <span className="text-lg font-bold text-gray-200">Online</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-100 border-b border-gray-800 pb-2">Active Personas</h3>
        {personas.length === 0 ? (
           <div className="p-8 border border-dashed border-gray-800 rounded-lg text-center bg-gray-900/30">
             <p className="text-gray-400 text-sm">No personas found.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {personas.map((p: { id: string; name?: string }) => (
              <Link to={`/personas/${p.id}`} key={p.id} className="block group">
                <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl hover:border-teal-500/50 transition-colors">
                  <h4 className="text-lg font-bold text-gray-100 group-hover:text-teal-400 transition-colors">{p.name || p.id}</h4>
                  <p className="text-xs text-gray-500 font-mono mt-1">{p.id}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-100 border-b border-gray-800 pb-2">Agents Status</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {agents.map((agent, i) => (
            <AgentStatusCard key={i} {...agent} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-100 border-b border-gray-800 pb-2">Quick Start</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <h4 className="text-teal-400 font-mono font-bold text-sm uppercase tracking-wider mb-4">Codex Compatible</h4>
            <div className="space-y-3">
              <code className="block bg-gray-950 px-3 py-2 border border-gray-800 rounded text-sm text-gray-300 font-mono">$interview</code>
              <code className="block bg-gray-950 px-3 py-2 border border-gray-800 rounded text-sm text-gray-300 font-mono">$content [platform]</code>
              <code className="block bg-gray-950 px-3 py-2 border border-gray-800 rounded text-sm text-gray-300 font-mono">$qa</code>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <h4 className="text-indigo-400 font-mono font-bold text-sm uppercase tracking-wider mb-4">Claude Code</h4>
            <div className="space-y-3">
              <code className="block bg-gray-950 px-3 py-2 border border-gray-800 rounded text-sm text-gray-300 font-mono">/interview</code>
              <code className="block bg-gray-950 px-3 py-2 border border-gray-800 rounded text-sm text-gray-300 font-mono">/content [platform]</code>
              <code className="block bg-gray-950 px-3 py-2 border border-gray-800 rounded text-sm text-gray-300 font-mono">/qa</code>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
