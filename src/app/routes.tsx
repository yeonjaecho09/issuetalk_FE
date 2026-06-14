import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { MainPage } from './pages/MainPage';
import { LiveDebatePage } from './pages/LiveDebatePage';
import { LiveDebateRoomPage } from './pages/LiveDebateRoomPage';
import { PostDetail } from './pages/PostDetail';
import { PastDebatesPage } from './pages/PastDebatesPage';
import { PastDebateDetail } from './pages/PastDebateDetail';
import { CommunityPage } from './pages/CommunityPage';
import { CommunityPostDetailPage } from './pages/CommunityPostDetailPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { AdminPage } from './pages/AdminPage';
import { AdminSignupPage } from './pages/AdminSignupPage';
import { LoginPage } from './pages/LoginPage';
import { MyPage } from './pages/MyPage';
import { NewCommunityPostPage } from './pages/NewCommunityPostPage';
import { SignupPage } from './pages/SignupPage';
import { RequireAuth } from './features/auth/RequireAuth';
import { RequireAdminAuth } from './features/auth/RequireAdminAuth';

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
        element: (
          <RequireAuth>
            <NewCommunityPostPage />
          </RequireAuth>
        ),
      },
      {
        path: 'community/:id',
        Component: CommunityPostDetailPage,
      },
      {
        path: 'mypage',
        element: (
          <RequireAuth>
            <MyPage />
          </RequireAuth>
        ),
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
        path: 'admin',
        element: (
          <RequireAdminAuth>
            <AdminPage />
          </RequireAdminAuth>
        ),
      },
      {
        path: 'admin/signup',
        Component: AdminSignupPage,
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
