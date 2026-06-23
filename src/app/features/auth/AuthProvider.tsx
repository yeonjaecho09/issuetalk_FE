import { useMemo, useState } from 'react';
import { AuthContext, type AuthContextValue } from './AuthContext';
import {
  getStoredSession,
  loginAccount,
  logoutAccount,
  signupAccount,
  signupAdminAccount,
} from './authStorage';

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState(() => getStoredSession());

  const value = useMemo<AuthContextValue>(
    () => ({
      currentUser,
      isLoggedIn: currentUser !== null,
      isAdmin: currentUser?.role === 'admin',
      login(payload) {
        const session = loginAccount(payload);
        setCurrentUser(session);
        return session;
      },
      signup(payload) {
        const session = signupAccount(payload);
        setCurrentUser(session);
        return session;
      },
      signupAdmin(payload) {
        const session = signupAdminAccount(payload);
        setCurrentUser(session);
        return session;
      },
      logout() {
        logoutAccount();
        setCurrentUser(null);
      },
    }),
    [currentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
