import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Personas from './pages/Personas';
import PersonaDetail from './pages/PersonaDetail';
import ContentPipeline from './pages/ContentPipeline';
import VirtualFollower from './pages/VirtualFollower';
import AgentMonitor from './pages/AgentMonitor';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personas" element={<Personas />} />
          <Route path="/personas/:id" element={<PersonaDetail />} />
          <Route path="/content" element={<ContentPipeline />} />
          <Route path="/qa" element={<VirtualFollower />} />
          <Route path="/agents" element={<AgentMonitor />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
