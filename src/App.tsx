import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { About } from './pages/About/About';
import { Audio } from './pages/Audio/Audio';
import { Games } from './pages/Games/Games';
import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { Sprint } from './pages/Sprint/Sprint';
import './App.module.css';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/audio" element={<Audio />} />
            <Route path="/games/sprint" element={<Sprint />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
