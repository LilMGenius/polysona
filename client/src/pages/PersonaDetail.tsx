import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PloonViewer from '../components/PloonViewer';

export default function PersonaDetail() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [log, setLog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/personas/${id}`).then(res => res.json()),
      fetch(`/api/personas/${id}/interview-log`).then(res => res.json())
    ])
      .then(([personaData, logData]) => {
        setData(personaData);
        setLog(logData);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-gray-400 animate-pulse flex items-center gap-2"><div className="w-2 h-2 bg-teal-400 rounded-full"></div>Loading...</div>;
  if (error || !data) return <div className="text-red-400 border border-red-900/50 bg-red-950/20 p-4 rounded-lg">Error loading data</div>;

  const { persona = {}, nuance = {}, accounts = {} } = data;

  return (
    <div className="space-y-12 max-w-5xl pb-16">
      <div className="border-b border-gray-800 pb-6 bg-gray-950 sticky top-0 z-10 pt-2">
        <h2 className="text-3xl font-bold text-gray-100 tracking-tight">{data.name}</h2>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs font-mono uppercase text-gray-500 font-semibold tracking-wider">Persona ID</span>
          <code className="bg-gray-900 px-2 py-0.5 rounded border border-gray-800 text-teal-400 font-mono text-sm">{id}</code>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
          <span className="text-teal-400 font-mono text-sm">#</span>
          Persona <span className="text-gray-500 font-mono text-sm font-normal ml-2">persona.md</span>
        </h3>
        <div className="grid gap-6">
          {persona.core && <PloonViewer data={persona.core.table} tableName="core" />}
          {persona.decide && <PloonViewer data={persona.decide.table} tableName="decide" />}
          {persona.energy && <PloonViewer data={persona.energy.table} tableName="energy" />}
          {persona.blind && <PloonViewer data={persona.blind.table} tableName="blind" />}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
          <span className="text-teal-400 font-mono text-sm">#</span>
          Nuance <span className="text-gray-500 font-mono text-sm font-normal ml-2">nuance.md</span>
        </h3>
        <div className="grid gap-6">
          {nuance.voice && <PloonViewer data={nuance.voice.table} tableName="voice" />}
          {nuance.platform && <PloonViewer data={nuance.platform.table} tableName="platform" />}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
          <span className="text-teal-400 font-mono text-sm">#</span>
          Accounts <span className="text-gray-500 font-mono text-sm font-normal ml-2">accounts.md</span>
        </h3>
        <div className="grid gap-6">
          {accounts.accounts && <PloonViewer data={accounts.accounts.table} tableName="accounts" />}
          {accounts.ideal && <PloonViewer data={accounts.ideal.table} tableName="ideal" />}
          {accounts.rolemodel && <PloonViewer data={accounts.rolemodel.table} tableName="rolemodel" />}
          {accounts.virtual && <PloonViewer data={accounts.virtual.table} tableName="virtual" />}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
          <span className="text-teal-400 font-mono text-sm">#</span>
          Interview Log
        </h3>
        {log?.interviewLog?.length > 0 ? (
          <div className="relative border-l-2 border-gray-800 ml-3 space-y-8 py-2">
            {log.interviewLog.map((entry: any, i: number) => (
              <div key={i} className="pl-6 relative">
                <div className="absolute w-3.5 h-3.5 bg-gray-950 border-2 border-teal-500 rounded-full -left-[8.5px] top-1"></div>
                <div className="text-xs font-mono text-teal-400 mb-2 font-semibold tracking-widest uppercase">{entry.date}</div>
                <div className="text-sm text-gray-300 bg-gray-900/80 border border-gray-800 p-4 rounded-lg leading-relaxed shadow-sm hover:border-gray-700 transition-colors">
                  {entry.content}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-sm bg-gray-900/50 p-6 rounded-lg border border-dashed border-gray-800 text-center">
            No interview logs available.
          </div>
        )}
      </div>
    </div>
  );
}