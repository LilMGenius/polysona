import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PloonViewer from '../components/PloonViewer';
import SelfLayerDiagram from '../components/SelfLayerDiagram';
import GapAnalysis from '../components/GapAnalysis';
import FrameworkCoverage from '../components/FrameworkCoverage';
import VoiceMixBar from '../components/VoiceMixBar';
import InterviewTimeline from '../components/InterviewTimeline';

export default function PersonaDetail() {
  const { id } = useParams();
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [log, setLog] = useState<Record<string, unknown> | null>(null);
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

  const blindGaps = persona.blind?.[0]?.gap 
    ? [persona.blind[0].gap]
    : [];

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-16">
      <div className="border-b border-gray-800 pb-6 bg-gray-950 sticky top-0 z-10 pt-2">
        <h2 className="text-3xl font-bold text-gray-100 tracking-tight">{data.name || id}</h2>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs font-mono uppercase text-gray-500 font-semibold tracking-wider">Persona ID</span>
          <code className="bg-gray-900 px-2 py-0.5 rounded border border-gray-800 text-teal-400 font-mono text-sm">{id}</code>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
            <span className="text-teal-400 font-mono text-sm">#</span>
            Self Layer Model
          </h3>
          <div className="bg-gray-900/30 border border-gray-800 p-6 rounded-xl">
            <SelfLayerDiagram persona={persona} nuance={nuance} accounts={accounts} />
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
              <span className="text-teal-400 font-mono text-sm">#</span>
              Gap Analysis
            </h3>
            <GapAnalysis gaps={blindGaps} />
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
              <span className="text-teal-400 font-mono text-sm">#</span>
              Voice Mix
            </h3>
            <div className="bg-gray-900/30 border border-gray-800 p-6 rounded-xl">
              <VoiceMixBar mix={nuance.voice?.[0]?.mix || ''} />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
              <span className="text-teal-400 font-mono text-sm">#</span>
              Framework Coverage
            </h3>
            <div className="bg-gray-900/30 border border-gray-800 p-6 rounded-xl">
              <FrameworkCoverage interviewLog={log?.interviewLog || []} />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
          <span className="text-teal-400 font-mono text-sm">#</span>
          Raw Persona Data <span className="text-gray-500 font-mono text-sm font-normal ml-2">persona.md</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {persona.core && <PloonViewer data={persona.core} tableName="core" />}
          {persona.decide && <PloonViewer data={persona.decide} tableName="decide" />}
          {persona.energy && <PloonViewer data={persona.energy} tableName="energy" />}
          {persona.blind && <PloonViewer data={persona.blind} tableName="blind" />}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
          <span className="text-teal-400 font-mono text-sm">#</span>
          Nuance <span className="text-gray-500 font-mono text-sm font-normal ml-2">nuance.md</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {nuance.voice && <PloonViewer data={nuance.voice} tableName="voice" />}
          {nuance.platform && <PloonViewer data={nuance.platform} tableName="platform" />}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
          <span className="text-teal-400 font-mono text-sm">#</span>
          Accounts <span className="text-gray-500 font-mono text-sm font-normal ml-2">accounts.md</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {accounts.accounts && <PloonViewer data={accounts.accounts} tableName="accounts" />}
          {accounts.ideal && <PloonViewer data={accounts.ideal} tableName="ideal" />}
          {accounts.rolemodel && <PloonViewer data={accounts.rolemodel} tableName="rolemodel" />}
          {accounts.virtual && <PloonViewer data={accounts.virtual} tableName="virtual" />}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
          <span className="text-teal-400 font-mono text-sm">#</span>
          Interview Timeline
        </h3>
        <InterviewTimeline entries={log?.interviewLog || []} />
      </div>
    </div>
  );
}
