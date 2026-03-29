import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PersonaDetail from './pages/PersonaDetail';
import ContentPipeline from './pages/ContentPipeline';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personas/:id" element={<PersonaDetail />} />
          <Route path="/content" element={<ContentPipeline />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}