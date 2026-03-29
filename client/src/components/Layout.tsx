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
      <nav className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col shadow-xl z-10 relative">
        <div className="p-6 border-b border-gray-800 mb-4 bg-gray-900 sticky top-0">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-500 tracking-tight">Polysona</h1>
          <p className="text-xs text-gray-500 mt-1 font-mono uppercase tracking-widest">Agent Tracker</p>
        </div>
        <div className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-teal-500/10 to-indigo-500/10 text-teal-400 border border-teal-500/20 shadow-sm' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 border border-transparent hover:border-gray-700/50'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
      <main className="flex-1 overflow-auto bg-gray-950/50 p-8 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        {children}
      </main>
    </div>
  );
}
