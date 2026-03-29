import { useEffect, useState } from 'react';

export default function ContentPipeline() {
  const [drafts, setDrafts] = useState<string[]>([]);
  const [published, setPublished] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/content/drafts').then(res => res.json()),
      fetch('/api/content/published').then(res => res.json())
    ])
      .then(([draftsData, publishedData]) => {
        setDrafts(draftsData || []);
        setPublished(publishedData || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-gray-400 animate-pulse flex items-center gap-2"><div className="w-2 h-2 bg-teal-400 rounded-full"></div>Loading...</div>;
  if (error) return <div className="text-red-400 border border-red-900/50 bg-red-950/20 p-4 rounded-lg">Error loading data</div>;

  const extractPlatform = (filename: string) => {
    const parts = filename.split('_');
    return parts.length > 0 ? parts[0] : 'unknown';
  };

  const isEmpty = drafts.length === 0 && published.length === 0;

  const renderCard = (filename: string, isPublished: boolean) => {
    const platform = extractPlatform(filename);
    return (
      <div key={filename} className="rounded-lg border border-gray-800 bg-gray-900 p-4 hover:border-teal-500/50 hover:bg-gray-800/80 transition-all shadow-sm group">
        <div className="flex items-center justify-between mb-3">
          <span className="px-2.5 py-1 rounded text-xs font-mono bg-gray-950 border border-gray-800 text-teal-400 uppercase tracking-widest font-semibold">
            {platform}
          </span>
          <span className={`text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 ${isPublished ? 'text-green-400' : 'text-yellow-400'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${isPublished ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
            {isPublished ? 'Published' : 'Draft'}
          </span>
        </div>
        <div className="text-sm text-gray-300 font-mono truncate group-hover:text-gray-100 transition-colors" title={filename}>
          {filename}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 max-w-5xl h-full flex flex-col pb-10">
      <div className="border-b border-gray-800 pb-6">
        <h2 className="text-3xl font-bold text-gray-100 tracking-tight">Content Pipeline</h2>
        <p className="text-sm text-gray-500 mt-2 font-mono uppercase tracking-wider">Track content lifecycle across platforms</p>
      </div>

      {isEmpty ? (
        <div className="mt-4 p-12 border border-dashed border-gray-800 rounded-lg text-center bg-gray-900/30 flex-1 flex flex-col items-center justify-center">
          <p className="text-gray-400 mb-4 text-lg">No content yet.</p>
          <code className="text-teal-400 bg-gray-950 px-4 py-2 rounded-md border border-gray-800 font-mono text-sm shadow-inner">
            Run /content in your terminal
          </code>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-8 flex-1 items-start">
          <div className="space-y-5 bg-gray-900/20 p-6 rounded-xl border border-gray-800/50">
            <h3 className="text-lg font-semibold text-gray-200 flex items-center justify-between uppercase tracking-wider text-sm">
              Drafts
              <span className="bg-gray-800 text-teal-400 font-mono font-medium text-xs px-2.5 py-1 rounded-md border border-gray-700">{drafts.length}</span>
            </h3>
            <div className="space-y-4">
              {drafts.length > 0 ? drafts.map(f => renderCard(f, false)) : (
                <div className="text-sm text-gray-500 p-6 text-center border border-dashed border-gray-800/50 rounded-lg bg-gray-900/30">No drafts</div>
              )}
            </div>
          </div>

          <div className="space-y-5 bg-gray-900/20 p-6 rounded-xl border border-gray-800/50">
            <h3 className="text-lg font-semibold text-gray-200 flex items-center justify-between uppercase tracking-wider text-sm">
              Published
              <span className="bg-gray-800 text-teal-400 font-mono font-medium text-xs px-2.5 py-1 rounded-md border border-gray-700">{published.length}</span>
            </h3>
            <div className="space-y-4">
              {published.length > 0 ? published.map(f => renderCard(f, true)) : (
                <div className="text-sm text-gray-500 p-6 text-center border border-dashed border-gray-800/50 rounded-lg bg-gray-900/30">No published content</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}