/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';
import {
  type AdminSignupPayload,
  type AuthSession,
  type LoginPayload,
  type SignupPayload,
  getStoredSession,
  loginAccount,
  logoutAccount,
  signupAccount,
  signupAdminAccount,
} from './authStorage';

type AuthContextValue = {
  currentUser: AuthSession | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (payload: LoginPayload) => AuthSession;
  signup: (payload: SignupPayload) => AuthSession;
  signupAdmin: (payload: AdminSignupPayload) => AuthSession;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<AuthSession | null>(() => getStoredSession());

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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}
