import { createContext } from 'react';
import type { AdminSignupPayload, AuthSession, LoginPayload, SignupPayload } from './authStorage';

export type AuthContextValue = {
  currentUser: AuthSession | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (payload: LoginPayload) => AuthSession;
  signup: (payload: SignupPayload) => AuthSession;
  signupAdmin: (payload: AdminSignupPayload) => AuthSession;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
