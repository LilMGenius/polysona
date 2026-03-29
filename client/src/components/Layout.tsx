import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Personas', path: '/personas' },
    { name: 'Content', path: '/content' },
  ];

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 font-sans">
      <nav className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800 mb-4">
          <h1 className="text-xl font-bold text-teal-400 tracking-tight">Polysona</h1>
          <p className="text-xs text-gray-500 mt-1 font-mono uppercase tracking-wider">Agent Monitoring</p>
        </div>
        <div className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive 
                    ? 'bg-gray-800 text-teal-400 font-medium border border-gray-700/50 shadow-sm' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 border border-transparent'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}