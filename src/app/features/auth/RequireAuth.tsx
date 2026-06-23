import { Navigate, useLocation } from 'react-router';
import { useAuth } from './useAuth';

type RequireAuthProps = {
  children: React.ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: `${location.pathname}${location.search}${location.hash}`,
          message: '로그인 후 이용할 수 있는 기능입니다.',
        }}
      />
    );
  }

  return <>{children}</>;
}
