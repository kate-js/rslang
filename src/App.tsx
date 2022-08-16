import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { About } from './pages/About';
import { Audio } from './pages/Audio';
import { Games } from './pages/Games';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Sprint } from './pages/Sprint';
import { Layout } from './components/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/audio" element={<Audio />} />
          <Route path="/games/sprint" element={<Sprint />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
