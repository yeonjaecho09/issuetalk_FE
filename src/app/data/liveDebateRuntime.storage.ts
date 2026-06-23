import { STORAGE_KEY } from './liveDebateRuntime.constants';
import { notifyLiveDebateStorageUpdated } from './liveDebateSubscriptions';
import type { RoomRuntimeState, RuntimeMap } from './liveDebateRuntime.types';

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function readRuntimeMap(): RuntimeMap {
  if (!isBrowser()) return {};

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};

  try {
    return JSON.parse(raw) as RuntimeMap;
  } catch {
    return {};
  }
}

export function writeRuntimeMap(map: RuntimeMap) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  notifyLiveDebateStorageUpdated(STORAGE_KEY);
}

export function createEmptyRuntime(): RoomRuntimeState {
  return {
    reservedUserIds: [],
    participants: {},
    extraMessages: [],
    audienceVotes: {},
    audienceQuestions: [],
    resumeOnNextJoin: false,
  };
}

export function ensureRoomRuntime(roomId: string) {
  const map = readRuntimeMap();
  const current = map[roomId] ?? createEmptyRuntime();

  map[roomId] = current;
  writeRuntimeMap(map);
  return current;
}

export function getStoredRoomRuntime(roomId: string) {
  return readRuntimeMap()[roomId] ?? createEmptyRuntime();
}

export function deleteStoredRoomRuntime(roomId: string) {
  const map = readRuntimeMap();
  delete map[roomId];
  writeRuntimeMap(map);
}
