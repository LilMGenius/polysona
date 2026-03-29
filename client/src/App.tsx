import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Personas from './pages/Personas';
import PersonaDetail from './pages/PersonaDetail';
import ContentPipeline from './pages/ContentPipeline';
import Domains from './pages/Domains';
import Trends from './pages/Trends';
import Sites from './pages/Sites';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/personas" element={<Personas />} />
          <Route path="/personas/:id" element={<PersonaDetail />} />
          <Route path="/content" element={<ContentPipeline />} />
          <Route path="/domains" element={<Domains />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}