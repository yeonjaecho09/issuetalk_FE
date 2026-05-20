import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { MainPage } from './pages/MainPage';
import { LiveDebatePage } from './pages/LiveDebatePage';
import { PostDetail } from './pages/PostDetail';
import { PastDebatesPage } from './pages/PastDebatesPage';
import { PastDebateDetail } from './pages/PastDebateDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: MainPage,
      },
      {
        path: 'live',
        Component: LiveDebatePage,
      },
      {
        path: 'past-debates',
        Component: PastDebatesPage,
      },
      {
        path: 'past-debate/:id',
        Component: PastDebateDetail,
      },
      {
        path: 'post/:id',
        Component: PostDetail,
      },
    ],
  },
]);
