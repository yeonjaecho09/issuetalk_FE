import { STORAGE_KEY as LIVE_DEBATE_ROOMS_STORAGE_KEY } from './liveDebateRooms';
import { STORAGE_KEY as LIVE_DEBATE_RUNTIME_STORAGE_KEY } from './liveDebateRuntime.constants';

const LIVE_DEBATE_STORAGE_KEYS = [LIVE_DEBATE_ROOMS_STORAGE_KEY, LIVE_DEBATE_RUNTIME_STORAGE_KEY] as const;
const LIVE_DEBATE_STORAGE_EVENT = 'issuetalk:live-debate-storage-updated';

function isBrowser() {
  return typeof window !== 'undefined';
}

export function notifyLiveDebateStorageUpdated(storageKey: string) {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(LIVE_DEBATE_STORAGE_EVENT, { detail: { storageKey } }));
}

export function subscribeLiveDebateStorageUpdates(onUpdate: () => void) {
  if (!isBrowser()) return () => undefined;

  const handleStorage = (event: StorageEvent) => {
    if (!event.key || !LIVE_DEBATE_STORAGE_KEYS.includes(event.key as (typeof LIVE_DEBATE_STORAGE_KEYS)[number])) return;
    onUpdate();
  };

  const handleCustomEvent = (event: Event) => {
    const customEvent = event as CustomEvent<{ storageKey?: string }>;
    const storageKey = customEvent.detail?.storageKey;
    if (!storageKey || !LIVE_DEBATE_STORAGE_KEYS.includes(storageKey as (typeof LIVE_DEBATE_STORAGE_KEYS)[number])) return;
    onUpdate();
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener(LIVE_DEBATE_STORAGE_EVENT, handleCustomEvent as EventListener);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(LIVE_DEBATE_STORAGE_EVENT, handleCustomEvent as EventListener);
  };
}
