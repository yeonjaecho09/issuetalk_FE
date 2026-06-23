import type { DebateRoom } from './liveDebateRooms';
import { OPEN_SLOT_NAME } from './liveDebateRuntime.constants';
import type { DebateParticipantSide, RoomRuntimeState, StoredParticipant } from './liveDebateRuntime.types';

export function isOpenSlotName(name: string) {
  return name === OPEN_SLOT_NAME;
}

export function getOppositeSide(side: DebateParticipantSide): DebateParticipantSide {
  return side === 'debater1' ? 'debater2' : 'debater1';
}

export function getParticipantCount(participants: Partial<Record<DebateParticipantSide, StoredParticipant>>) {
  return (['debater1', 'debater2'] as DebateParticipantSide[]).filter(side => participants[side]).length;
}

export function shiftStartedAt(startedAt: string, pausedAt: string, resumedAt: string) {
  const startedAtMs = Date.parse(startedAt);
  const pausedAtMs = Date.parse(pausedAt);
  const resumedAtMs = Date.parse(resumedAt);

  if (Number.isNaN(startedAtMs) || Number.isNaN(pausedAtMs) || Number.isNaN(resumedAtMs)) {
    return resumedAt;
  }

  return new Date(startedAtMs + Math.max(0, resumedAtMs - pausedAtMs)).toISOString();
}

export function getRuntimeStartedAt(room: DebateRoom, runtime: RoomRuntimeState) {
  return runtime.startedAt ?? (room.status === 'live' ? new Date(room.startTime).toISOString() : null);
}
