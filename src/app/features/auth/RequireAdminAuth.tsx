import { Navigate, useLocation } from 'react-router';
import { useAuth } from './AuthContext';

type RequireAdminAuthProps = {
  children: React.ReactNode;
};

export function RequireAdminAuth({ children }: RequireAdminAuthProps) {
  const location = useLocation();
  const { isLoggedIn, isAdmin } = useAuth();

  if (!isLoggedIn || !isAdmin) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: `${location.pathname}${location.search}${location.hash}`,
          message: '관리자 페이지는 관리자 계정으로만 접근할 수 있습니다.',
        }}
      />
    );
  }

  return <>{children}</>;
}
