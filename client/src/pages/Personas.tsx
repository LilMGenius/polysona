import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type PersonaListItem = {
  id: string;
  name?: string;
};

export default function Personas() {
  const [personas, setPersonas] = useState<PersonaListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/personas')
      .then((response) => response.json())
      .then((data) => {
        setPersonas(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex items-center gap-2 text-gray-400"><div className="h-2 w-2 rounded-full bg-teal-400"></div>Loading...</div>;
  }

  if (error) {
    return <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-4 text-red-400">Error loading personas</div>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-10 pb-10">
      <div className="border-b border-gray-800 pb-6">
        <h2 className="text-3xl font-bold tracking-tight text-gray-100">Personas</h2>
        <p className="mt-2 text-sm font-mono uppercase tracking-wider text-gray-500">Browse extracted persona profiles</p>
      </div>

      {personas.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-800 bg-gray-900/30 p-12 text-center">
          <p className="text-lg font-medium text-gray-200">No personas yet.</p>
          <p className="mt-3 text-sm text-gray-400">Run the profiler flow first, then come back here to inspect each persona in detail.</p>
          <div className="mt-6 inline-flex rounded-md border border-gray-800 bg-gray-950 px-4 py-2 font-mono text-sm text-teal-400 shadow-inner">
            Run /interview in your terminal
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {personas.map((persona) => (
            <Link key={persona.id} to={`/personas/${persona.id}`} className="group rounded-xl border border-gray-800 bg-gray-900/40 p-5 transition-colors hover:border-teal-500/40 hover:bg-gray-900/70">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 group-hover:text-teal-300">{persona.name || persona.id}</h3>
                  <p className="mt-1 text-xs font-mono uppercase tracking-widest text-gray-500">{persona.id}</p>
                </div>
                <span className="rounded-md border border-teal-500/20 bg-teal-500/10 px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-teal-300">
                  detail
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-400">Open the full psychology view, gap analysis, framework coverage, and raw PLOON tables.</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
