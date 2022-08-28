import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ERoutes } from './utils/constants';
import { Layout } from './components/Layout/Layout';
import { About } from './pages/About/About';
import { AudioComponent } from './pages/Audio/AudioComponent';
import { Games } from './pages/Games/Games';
import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { Sprint } from './pages/Sprint/Sprint';
import './App.module.css';
import { Statistics } from './pages/Statistics/Statistics';
import { Tutorial } from './pages/Tutorial/Tutorial';
import { GroupLevel } from './pages/GroupLevel/GroupLevel';
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route>
              <Route index element={<Home />} />
              <Route path={ERoutes.about} element={<About />} />
              <Route path={ERoutes.games} element={<Games />} />
              <Route path={ERoutes.statistics} element={<Statistics />} />
              <Route path={ERoutes.tutorial} element={<Tutorial />} />
              <Route path={`${ERoutes.tutorial}/:level`} element={<GroupLevel />} />
              <Route path={`${ERoutes.games}${ERoutes.audio}`} element={<AudioComponent />} />
              <Route path={`${ERoutes.games}${ERoutes.sprint}`} element={<Sprint />} />
              <Route path={ERoutes.notFound} element={<NotFound />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}
