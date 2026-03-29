export default function PloonViewer({ data, tableName }: { data: Record<string, unknown> | Record<string, unknown>[], tableName: string }) {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg text-gray-500 text-sm">
        No data for {tableName}
      </div>
    );
  }

  const isArray = Array.isArray(data);
  const rows = isArray ? data : [data];
  const keys = Object.keys(rows[0] || {});

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-gray-800 bg-gray-900/50 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-teal-400 font-mono tracking-wide">[{tableName}]</h3>
        <span className="text-xs text-gray-500 font-mono">{rows.length} {rows.length === 1 ? 'row' : 'rows'}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-gray-950/30 border-b border-gray-800">
            <tr>
              {keys.map(key => (
                <th key={key} className="px-4 py-3 font-medium tracking-wider">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                {keys.map(key => (
                  <td key={key} className="px-4 py-3.5 text-gray-300">
                    {String(row[key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
