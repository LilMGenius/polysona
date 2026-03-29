import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface SystemStatus {
  personaCount: number;
  contentCount: number;
  lastActivity: string | null;
  version: string;
}

interface PersonaCard {
  id: string;
  name: string;
}

export default function Home() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [personas, setPersonas] = useState<PersonaCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/status').then(res => res.json()),
      fetch('/api/personas').then(res => res.json())
    ])
      .then(([statusData, personasData]) => {
        setStatus(statusData);
        setPersonas(personasData);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-gray-400 animate-pulse flex items-center gap-2"><div className="w-2 h-2 bg-teal-400 rounded-full"></div>Loading...</div>;
  if (error) return <div className="text-red-400 border border-red-900/50 bg-red-950/20 p-4 rounded-lg">Error loading data</div>;

  return (
    <div className="space-y-10 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-100 tracking-tight flex items-center gap-2">
          System Status
        </h2>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-5 shadow-sm">
            <div className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-semibold">Personas</div>
            <div className="text-3xl font-mono text-teal-400 font-light">{status?.personaCount || 0}</div>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-5 shadow-sm">
            <div className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-semibold">Contents</div>
            <div className="text-3xl font-mono text-teal-400 font-light">{status?.contentCount || 0}</div>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-5 shadow-sm flex flex-col justify-between">
            <div className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-semibold">Last Activity</div>
            <div className="text-base font-mono text-gray-300 mt-1 truncate">
              {status?.lastActivity ? new Date(status.lastActivity).toLocaleDateString() : 'None'}
            </div>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-5 shadow-sm flex flex-col justify-between">
            <div className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-semibold">Version</div>
            <div className="text-base font-mono text-gray-300 mt-1">{status?.version || 'v1.0.0'}</div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-100 tracking-tight">Active Personas</h2>
        {personas.length === 0 ? (
          <div className="mt-4 p-10 border border-dashed border-gray-800 rounded-lg text-center bg-gray-900/30">
            <p className="text-gray-400 mb-3 text-lg">No personas found.</p>
            <code className="text-teal-400 bg-gray-950 px-3 py-1.5 rounded-md border border-gray-800 font-mono text-sm shadow-inner">
              Run /interview in your terminal to create a persona
            </code>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-5 mt-4">
            {personas.map(p => (
              <Link 
                key={p.id} 
                to={`/personas/${p.id}`}
                className="rounded-lg border border-gray-800 bg-gray-900 p-5 hover:border-teal-500/50 hover:bg-gray-800 transition-all group shadow-sm hover:shadow-md"
              >
                <div className="text-lg font-medium text-gray-100 group-hover:text-teal-400 transition-colors">{p.name}</div>
                <div className="text-sm text-gray-500 font-mono mt-2">ID: {p.id}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {!personas.length && (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-5 mt-8 border-l-4 border-l-teal-500">
           <h3 className="text-sm font-semibold text-gray-200 mb-2 uppercase tracking-wide">Quick Action Guide</h3>
           <p className="text-sm text-gray-400">Run <code className="text-teal-400 font-mono bg-gray-950 px-1.5 py-0.5 rounded border border-gray-800">/interview</code> in your terminal to create a persona.</p>
        </div>
      )}
    </div>
  );
}