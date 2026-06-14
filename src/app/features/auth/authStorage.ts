export type AuthAccount = {
  id: string;
  name: string;
  nickname: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: string;
};

export type AuthSession = {
  userId: string;
  name: string;
  nickname: string;
  email: string;
  role: 'user' | 'admin';
  loginAt: string;
};

export type SignupPayload = {
  name: string;
  nickname: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AdminSignupPayload = SignupPayload & {
  adminCode: string;
  verificationToken: string;
};

const ACCOUNTS_KEY = 'issuetalk.auth.accounts';
const SESSION_KEY = 'issuetalk.auth.session';
const ADMIN_ACCESS_CODE = 'ISSUETALK-ADMIN';
const ADMIN_VERIFICATION_TOKEN = 'ADMIN-ACCESS-2026';

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function parseJson<T>(value: string | null, fallback: T) {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function normalizeStoredRole(role: unknown): 'user' | 'admin' {
  return role === 'admin' ? 'admin' : 'user';
}

function isAccount(value: unknown): value is AuthAccount {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const account = value as Record<string, unknown>;
  return (
    typeof account.id === 'string' &&
    typeof account.name === 'string' &&
    typeof account.nickname === 'string' &&
    typeof account.email === 'string' &&
    typeof account.password === 'string' &&
    typeof account.createdAt === 'string'
  );
}

function isSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const session = value as Record<string, unknown>;
  return (
    typeof session.userId === 'string' &&
    typeof session.name === 'string' &&
    typeof session.nickname === 'string' &&
    typeof session.email === 'string' &&
    typeof session.loginAt === 'string'
  );
}

export function getStoredAccounts() {
  if (!isBrowser()) {
    return [] as AuthAccount[];
  }

  const parsed = parseJson<unknown[]>(window.localStorage.getItem(ACCOUNTS_KEY), []);
  return parsed.filter(isAccount).map(account => ({
    ...account,
    role: normalizeStoredRole((account as Partial<AuthAccount>).role),
  }));
}

function setStoredAccounts(accounts: AuthAccount[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function getStoredSession() {
  if (!isBrowser()) {
    return null;
  }

  const parsed = parseJson<unknown | null>(window.localStorage.getItem(SESSION_KEY), null);
  return isSession(parsed)
    ? {
        ...parsed,
        role: normalizeStoredRole((parsed as Partial<AuthSession>).role),
      }
    : null;
}

function setStoredSession(session: AuthSession | null) {
  if (!isBrowser()) {
    return;
  }

  if (!session) {
    window.localStorage.removeItem(SESSION_KEY);
    return;
  }

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function createSession(account: AuthAccount): AuthSession {
  return {
    userId: account.id,
    name: account.name,
    nickname: account.nickname,
    email: account.email,
    role: account.role,
    loginAt: new Date().toISOString(),
  };
}

export function signupAccount(payload: SignupPayload) {
  const email = normalizeEmail(payload.email);
  const accounts = getStoredAccounts();

  if (accounts.some(account => normalizeEmail(account.email) === email)) {
    throw new Error('이미 가입된 이메일입니다.');
  }

  const account: AuthAccount = {
    id: `account-${Date.now()}`,
    name: payload.name.trim(),
    nickname: payload.nickname.trim(),
    email,
    password: payload.password,
    role: 'user',
    createdAt: new Date().toISOString(),
  };

  setStoredAccounts([account, ...accounts]);

  const session = createSession(account);
  setStoredSession(session);
  return session;
}

export function signupAdminAccount(payload: AdminSignupPayload) {
  if (payload.adminCode.trim() !== ADMIN_ACCESS_CODE) {
    throw new Error('관리자 접근 코드가 올바르지 않습니다.');
  }

  if (payload.verificationToken.trim() !== ADMIN_VERIFICATION_TOKEN) {
    throw new Error('관리자 인증 토큰이 올바르지 않습니다.');
  }

  const email = normalizeEmail(payload.email);
  const accounts = getStoredAccounts();

  if (accounts.some(account => normalizeEmail(account.email) === email)) {
    throw new Error('이미 가입된 이메일입니다.');
  }

  const account: AuthAccount = {
    id: `account-admin-${Date.now()}`,
    name: payload.name.trim(),
    nickname: payload.nickname.trim(),
    email,
    password: payload.password,
    role: 'admin',
    createdAt: new Date().toISOString(),
  };

  setStoredAccounts([account, ...accounts]);

  const session = createSession(account);
  setStoredSession(session);
  return session;
}

export function loginAccount(payload: LoginPayload) {
  const email = normalizeEmail(payload.email);
  const account = getStoredAccounts().find(item => normalizeEmail(item.email) === email);

  if (!account || account.password !== payload.password) {
    throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
  }

  const session = createSession(account);
  setStoredSession(session);
  return session;
}

export function logoutAccount() {
  setStoredSession(null);
}
