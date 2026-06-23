import type { AuthSession } from '../features/auth/authStorage';
import type { DebateRoom } from './liveDebateRooms';
import { getDebateProgress } from './liveDebateRuntime.progress';
import { getOppositeSide, getParticipantCount, isOpenSlotName, shiftStartedAt } from './liveDebateRuntime.helpers';
import { ensureRoomRuntime, getStoredRoomRuntime, readRuntimeMap, writeRuntimeMap } from './liveDebateRuntime.storage';
import type { DebateParticipantSide } from './liveDebateRuntime.types';

export function reserveDebateRoom(roomId: string, userId: string) {
  const map = readRuntimeMap();
  const current = map[roomId] ?? ensureRoomRuntime(roomId);

  if (!current.reservedUserIds.includes(userId)) {
    current.reservedUserIds = [...current.reservedUserIds, userId];
    map[roomId] = current;
    writeRuntimeMap(map);
  }

  return current;
}

export function getReservedRoomIds(userId: string) {
  const map = readRuntimeMap();
  return Object.entries(map)
    .filter(([, value]) => value.reservedUserIds.includes(userId))
    .map(([roomId]) => roomId);
}

export function getRuntimeState(roomId: string) {
  return getStoredRoomRuntime(roomId);
}

export function getJoinedSide(roomId: string, userId: string): DebateParticipantSide | null {
  const runtime = getStoredRoomRuntime(roomId);

  if (runtime.participants.debater1?.userId === userId) return 'debater1';
  if (runtime.participants.debater2?.userId === userId) return 'debater2';
  return null;
}

export function joinDebateAsParticipant(room: DebateRoom, side: DebateParticipantSide, session: AuthSession) {
  const map = readRuntimeMap();
  const current = map[room.id] ?? ensureRoomRuntime(room.id);
  const targetSlot = current.participants[side];
  const baseSlot = room[side];

  if (!isOpenSlotName(baseSlot.name) && targetSlot?.userId !== session.userId) {
    throw new Error('이미 참여자가 확정된 자리입니다.');
  }

  current.participants[side] = {
    userId: session.userId,
    name: session.name,
    nickname: session.nickname,
    joinedAt: new Date().toISOString(),
  };
  current.resetToOpenSlots = false;

  if (!current.reservedUserIds.includes(session.userId)) {
    current.reservedUserIds = [...current.reservedUserIds, session.userId];
  }

  if (current.resumeOnNextJoin && getParticipantCount(current.participants) >= room.reservation.debaterCapacity) {
    const resumedAt = new Date().toISOString();

    if (current.startedAt && current.pausedAt) {
      current.startedAt = shiftStartedAt(current.startedAt, current.pausedAt, resumedAt);
    } else if (!current.startedAt) {
      current.startedAt = resumedAt;
    }

    current.pausedAt = undefined;
    current.statusOverride = 'live';
    current.resumeOnNextJoin = false;
  }

  map[room.id] = current;
  writeRuntimeMap(map);
  return current;
}

export function leaveDebateParticipant(room: DebateRoom, userId: string) {
  if (room.status !== 'scheduled') {
    throw new Error('토론이 시작된 뒤에는 참여 상태를 변경할 수 없습니다.');
  }

  const map = readRuntimeMap();
  const current = map[room.id] ?? ensureRoomRuntime(room.id);
  const side = getJoinedSide(room.id, userId);

  if (!side) return current;

  delete current.participants[side];
  map[room.id] = current;
  writeRuntimeMap(map);
  return current;
}

export function abandonLiveDebateParticipant(room: DebateRoom, userId: string) {
  const map = readRuntimeMap();
  const current = map[room.id] ?? ensureRoomRuntime(room.id);
  const side = getJoinedSide(room.id, userId);

  if (!side) return current;

  delete current.participants[side];
  current.statusOverride = 'scheduled';
  current.resumeOnNextJoin = true;
  current.pausedAt = new Date().toISOString();

  map[room.id] = current;
  writeRuntimeMap(map);
  return current;
}

export function switchDebateSide(room: DebateRoom, userId: string) {
  if (room.status !== 'scheduled') {
    throw new Error('토론이 시작된 뒤에는 찬반을 바꿀 수 없습니다.');
  }

  const map = readRuntimeMap();
  const current = map[room.id] ?? ensureRoomRuntime(room.id);
  const currentSide = getJoinedSide(room.id, userId);

  if (!currentSide) {
    throw new Error('먼저 참여한 뒤에만 찬반을 바꿀 수 있습니다.');
  }

  const nextSide = getOppositeSide(currentSide);
  const nextBaseSlot = room[nextSide];

  if (!isOpenSlotName(nextBaseSlot.name) || current.participants[nextSide]) {
    throw new Error('반대편 자리가 비어 있을 때만 찬반을 바꿀 수 있습니다.');
  }

  const participant = current.participants[currentSide];
  if (!participant) return current;

  delete current.participants[currentSide];
  current.participants[nextSide] = {
    ...participant,
    joinedAt: new Date().toISOString(),
  };

  map[room.id] = current;
  writeRuntimeMap(map);
  return current;
}

export function canStartDebate(room: DebateRoom) {
  return room.status === 'scheduled' && room.reservation.reservedDebaters >= room.reservation.debaterCapacity;
}

export function startDebate(roomId: string) {
  const map = readRuntimeMap();
  const current = map[roomId] ?? ensureRoomRuntime(roomId);
  current.statusOverride = 'live';
  current.resumeOnNextJoin = false;
  current.resetToOpenSlots = false;
  current.startedAt = new Date().toISOString();
  current.pausedAt = undefined;
  current.endedAt = undefined;
  map[roomId] = current;
  writeRuntimeMap(map);
}

export function appendDebateMessage(room: DebateRoom, side: DebateParticipantSide, content: string) {
  const map = readRuntimeMap();
  const current = map[room.id] ?? ensureRoomRuntime(room.id);
  const participant = current.participants[side];
  const progress = getDebateProgress(room);

  if (!participant) {
    throw new Error('참여자로 확정된 뒤에만 발언할 수 있습니다.');
  }

  if (!progress || progress.status !== 'live' || progress.currentPhase.kind !== 'speaking') {
    throw new Error('현재는 발언 가능한 토론 단계가 아닙니다.');
  }

  if (current.chatRestricted) {
    throw new Error('관리자 설정으로 현재 채팅이 제한되어 있습니다.');
  }

  current.extraMessages = [
    ...current.extraMessages,
    {
      id: `extra-${Date.now()}`,
      debaterId: room[side].id,
      side,
      content,
      timestamp: new Date().toISOString(),
    },
  ];

  map[room.id] = current;
  writeRuntimeMap(map);
}

export function getAvailableSides(room: DebateRoom) {
  const runtime = getStoredRoomRuntime(room.id);

  return (['debater1', 'debater2'] as DebateParticipantSide[]).filter(side => {
    const baseSlot = room[side];
    return isOpenSlotName(baseSlot.name) && !runtime.participants[side];
  });
}

export function getActiveLiveParticipantRoomId(rooms: DebateRoom[], userId: string) {
  const activeRoom = rooms.find(room => room.status === 'live' && getJoinedSide(room.id, userId) !== null);
  return activeRoom?.id ?? null;
}

export function getParticipantRoomId(rooms: DebateRoom[], userId: string) {
  const joinedRoom = rooms.find(room => room.status !== 'ended' && getJoinedSide(room.id, userId) !== null);
  return joinedRoom?.id ?? null;
}

