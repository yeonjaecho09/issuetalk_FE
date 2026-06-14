import type { AuthSession } from '../features/auth/authStorage';

const GUEST_VIEWER_ID_KEY = 'issuetalk.viewer.guestId';

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function getViewerActorId(currentUser: AuthSession | null) {
  if (currentUser) {
    return currentUser.userId;
  }

  if (!isBrowser()) {
    return 'guest-server';
  }

  const stored = window.localStorage.getItem(GUEST_VIEWER_ID_KEY);
  if (stored) {
    return stored;
  }

  const nextId = `guest-${Date.now()}`;
  window.localStorage.setItem(GUEST_VIEWER_ID_KEY, nextId);
  return nextId;
}

