import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { MainPage } from './pages/MainPage';
import { LiveDebatePage } from './pages/LiveDebatePage';
import { LiveDebateRoomPage } from './pages/LiveDebateRoomPage';
import { PostDetail } from './pages/PostDetail';
import { PastDebatesPage } from './pages/PastDebatesPage';
import { PastDebateDetail } from './pages/PastDebateDetail';
import { CommunityPage } from './pages/CommunityPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { LoginPage } from './pages/LoginPage';
import { NewCommunityPostPage } from './pages/NewCommunityPostPage';
import { SignupPage } from './pages/SignupPage';

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
        path: 'live/:roomId',
        Component: LiveDebateRoomPage,
      },
      {
        path: 'community',
        Component: CommunityPage,
      },
      {
        path: 'community/new',
        Component: NewCommunityPostPage,
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
      {
        path: 'forgot-password',
        Component: ForgotPasswordPage,
      },
      {
        path: 'login',
        Component: LoginPage,
      },
      {
        path: 'signup',
        Component: SignupPage,
      },
    ],
  },
]);
