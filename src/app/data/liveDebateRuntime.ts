import type { AuthSession } from '../features/auth/authStorage';
import { removeLiveDebateRoom, type DebateRoom, type DebateRoomStatus } from './liveDebateRooms';
import { archiveLiveDebateRoom } from './pastDebateArchive';

export type DebateParticipantSide = 'debater1' | 'debater2';
export type DebatePhaseKey = 'opening' | 'break-1' | 'rebuttal' | 'break-2' | 'closing' | 'ended';

export type DebatePhase = {
  key: DebatePhaseKey;
  label: string;
  description: string;
  durationSeconds: number;
  kind: 'speaking' | 'break' | 'ended';
};

export type DebateProgress = {
  phases: DebatePhase[];
  currentPhase: DebatePhase;
  currentPhaseIndex: number;
  elapsedSeconds: number;
  remainingPhaseSeconds: number;
  remainingTotalSeconds: number;
  startedAt: string | null;
  pausedAt: string | null;
  isPaused: boolean;
  status: DebateRoomStatus;
};

export type DebateRoomAdminState = {
  isChatRestricted: boolean;
  isPaused: boolean;
};

type StoredParticipant = {
  userId: string;
  name: string;
  nickname: string;
  joinedAt: string;
};

type StoredMessage = {
  id: string;
  debaterId: string;
  side: DebateParticipantSide;
  content: string;
  timestamp: string;
};

type StoredAudienceQuestion = {
  id: string;
  actorId: string;
  author: string;
  text: string;
  timestamp: string;
};

type RoomRuntimeState = {
  reservedUserIds: string[];
  participants: Partial<Record<DebateParticipantSide, StoredParticipant>>;
  extraMessages: StoredMessage[];
  audienceVotes?: Record<string, DebateParticipantSide>;
  audienceQuestions?: StoredAudienceQuestion[];
  statusOverride?: DebateRoomStatus;
  resumeOnNextJoin?: boolean;
  startedAt?: string;
  pausedAt?: string;
  endedAt?: string;
  resetToOpenSlots?: boolean;
  chatRestricted?: boolean;
};

type RuntimeMap = Record<string, RoomRuntimeState>;

const STORAGE_KEY = 'issuetalk.liveDebate.runtime';
const OPEN_SLOT_NAME = '참가자 모집 중';

export const DEBATE_PHASES: DebatePhase[] = [
  {
    key: 'opening',
    label: '입론',
    description: '양측이 핵심 입장을 정리해 발표하는 시간입니다.',
    durationSeconds: 3 * 60,
    kind: 'speaking',
  },
  {
    key: 'break-1',
    label: '휴식',
    description: '입론 종료 후 2분 동안 다음 라운드를 준비합니다.',
    durationSeconds: 2 * 60,
    kind: 'break',
  },
  {
    key: 'rebuttal',
    label: '반박 및 재반박',
    description: '서로의 주장을 검증하고 반박과 재반박을 주고받는 핵심 토론 구간입니다.',
    durationSeconds: 30 * 60,
    kind: 'speaking',
  },
  {
    key: 'break-2',
    label: '휴식',
    description: '최종 발언 전 2분 동안 논점을 정리합니다.',
    durationSeconds: 2 * 60,
    kind: 'break',
  },
  {
    key: 'closing',
    label: '최종 발언',
    description: '각자 마지막으로 핵심 주장을 정리해 마무리합니다.',
    durationSeconds: 5 * 60,
    kind: 'speaking',
  },
];

const ENDED_PHASE: DebatePhase = {
  key: 'ended',
  label: '토론 종료',
  description: '예정된 토론 시간이 모두 끝났습니다.',
  durationSeconds: 0,
  kind: 'ended',
};

const TOTAL_DEBATE_SECONDS = DEBATE_PHASES.reduce((sum, phase) => sum + phase.durationSeconds, 0);

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readRuntimeMap(): RuntimeMap {
  if (!isBrowser()) return {};

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};

  try {
    return JSON.parse(raw) as RuntimeMap;
  } catch {
    return {};
  }
}

function writeRuntimeMap(map: RuntimeMap) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

function createEmptyRuntime(): RoomRuntimeState {
  return {
    reservedUserIds: [],
    participants: {},
    extraMessages: [],
    audienceVotes: {},
    audienceQuestions: [],
    resumeOnNextJoin: false,
  };
}

function ensureRoomRuntime(roomId: string) {
  const map = readRuntimeMap();
  const current = map[roomId] ?? createEmptyRuntime();

  map[roomId] = current;
  writeRuntimeMap(map);
  return current;
}

function getStoredRoomRuntime(roomId: string) {
  return readRuntimeMap()[roomId] ?? createEmptyRuntime();
}

function deleteStoredRoomRuntime(roomId: string) {
  const map = readRuntimeMap();
  delete map[roomId];
  writeRuntimeMap(map);
}

function isOpenSlotName(name: string) {
  return name === OPEN_SLOT_NAME;
}

function getOppositeSide(side: DebateParticipantSide): DebateParticipantSide {
  return side === 'debater1' ? 'debater2' : 'debater1';
}

function getParticipantCount(participants: Partial<Record<DebateParticipantSide, StoredParticipant>>) {
  return (['debater1', 'debater2'] as DebateParticipantSide[]).filter(side => participants[side]).length;
}

function shiftStartedAt(startedAt: string, pausedAt: string, resumedAt: string) {
  const startedAtMs = Date.parse(startedAt);
  const pausedAtMs = Date.parse(pausedAt);
  const resumedAtMs = Date.parse(resumedAt);

  if (Number.isNaN(startedAtMs) || Number.isNaN(pausedAtMs) || Number.isNaN(resumedAtMs)) {
    return resumedAt;
  }

  return new Date(startedAtMs + Math.max(0, resumedAtMs - pausedAtMs)).toISOString();
}

function getRuntimeStartedAt(room: DebateRoom, runtime: RoomRuntimeState) {
  return runtime.startedAt ?? (room.status === 'live' ? new Date(room.startTime).toISOString() : null);
}

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

export function getDebateProgress(room: DebateRoom): DebateProgress | null {
  const runtime = getStoredRoomRuntime(room.id);
  const startedAt = getRuntimeStartedAt(room, runtime);

  if (!startedAt) return null;

  const startedAtMs = Date.parse(startedAt);
  if (Number.isNaN(startedAtMs)) return null;

  const pausedAt = runtime.pausedAt ?? null;
  const referenceTimeMs = pausedAt ? Date.parse(pausedAt) : Date.now();
  const elapsedSeconds = Math.max(0, Math.floor((referenceTimeMs - startedAtMs) / 1000));

  if (elapsedSeconds >= TOTAL_DEBATE_SECONDS) {
    return {
      phases: DEBATE_PHASES,
      currentPhase: ENDED_PHASE,
      currentPhaseIndex: DEBATE_PHASES.length - 1,
      elapsedSeconds: TOTAL_DEBATE_SECONDS,
      remainingPhaseSeconds: 0,
      remainingTotalSeconds: 0,
      startedAt,
      pausedAt,
      isPaused: Boolean(pausedAt),
      status: 'ended',
    };
  }

  let consumedSeconds = 0;

  for (let index = 0; index < DEBATE_PHASES.length; index += 1) {
    const phase = DEBATE_PHASES[index];
    const phaseEnd = consumedSeconds + phase.durationSeconds;

    if (elapsedSeconds < phaseEnd) {
      return {
        phases: DEBATE_PHASES,
        currentPhase: phase,
        currentPhaseIndex: index,
        elapsedSeconds,
        remainingPhaseSeconds: phaseEnd - elapsedSeconds,
        remainingTotalSeconds: TOTAL_DEBATE_SECONDS - elapsedSeconds,
        startedAt,
        pausedAt,
        isPaused: Boolean(pausedAt),
        status: room.status === 'ended' ? 'ended' : room.status,
      };
    }

    consumedSeconds = phaseEnd;
  }

  return {
    phases: DEBATE_PHASES,
    currentPhase: ENDED_PHASE,
    currentPhaseIndex: DEBATE_PHASES.length - 1,
    elapsedSeconds: TOTAL_DEBATE_SECONDS,
    remainingPhaseSeconds: 0,
    remainingTotalSeconds: 0,
    startedAt,
    pausedAt,
    isPaused: Boolean(pausedAt),
    status: 'ended',
  };
}

export function joinDebateAsParticipant(room: DebateRoom, side: DebateParticipantSide, session: AuthSession) {
  const map = readRuntimeMap();
  const current = map[room.id] ?? ensureRoomRuntime(room.id);
  const targetSlot = current.participants[side];
  const baseSlot = room[side];

  if (!isOpenSlotName(baseSlot.name) && targetSlot?.userId !== session.userId) {
    throw new Error('이미 참가자가 확정된 자리입니다.');
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
    throw new Error('토론이 시작된 뒤에는 참가 상태를 변경할 수 없습니다.');
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
    throw new Error('먼저 참가한 뒤에만 찬반을 바꿀 수 있습니다.');
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
    throw new Error('참가자로 확정된 뒤에만 발언할 수 있습니다.');
  }

  if (!progress || progress.status !== 'live' || progress.currentPhase.kind !== 'speaking') {
    throw new Error('현재는 발언 가능한 토론 시간이 아닙니다.');
  }

  if (current.chatRestricted) {
    throw new Error('관리자에 의해 현재 채팅이 제한되어 있습니다.');
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

export function getDebateRoomAdminState(roomId: string): DebateRoomAdminState {
  const runtime = getStoredRoomRuntime(roomId);

  return {
    isChatRestricted: Boolean(runtime.chatRestricted),
    isPaused: Boolean(runtime.pausedAt && runtime.statusOverride === 'live'),
  };
}

export function toggleDebateRoomPause(roomId: string) {
  const map = readRuntimeMap();
  const current = map[roomId] ?? ensureRoomRuntime(roomId);

  if (current.pausedAt) {
    const resumedAt = new Date().toISOString();

    if (current.startedAt) {
      current.startedAt = shiftStartedAt(current.startedAt, current.pausedAt, resumedAt);
    } else {
      current.startedAt = resumedAt;
    }

    current.pausedAt = undefined;
    current.statusOverride = 'live';
  } else {
    current.pausedAt = new Date().toISOString();
    current.statusOverride = 'live';
  }

  map[roomId] = current;
  writeRuntimeMap(map);
  return current;
}

export function toggleDebateRoomChatRestriction(roomId: string) {
  const map = readRuntimeMap();
  const current = map[roomId] ?? ensureRoomRuntime(roomId);

  current.chatRestricted = !current.chatRestricted;
  map[roomId] = current;
  writeRuntimeMap(map);
  return current;
}

export function forceEndDebateRoom(room: DebateRoom) {
  const endedAt = new Date().toISOString();

  archiveLiveDebateRoom(room, endedAt);
  deleteStoredRoomRuntime(room.id);
  removeLiveDebateRoom(room.id);
}

export function getAvailableSides(room: DebateRoom) {
  const runtime = getStoredRoomRuntime(room.id);

  return (['debater1', 'debater2'] as DebateParticipantSide[]).filter(side => {
    const baseSlot = room[side];
    return isOpenSlotName(baseSlot.name) && !runtime.participants[side];
  });
}

export function applyRuntimeToRoom(room: DebateRoom): DebateRoom {
  const runtime = getStoredRoomRuntime(room.id);
  const debater1Participant = runtime.participants.debater1;
  const debater2Participant = runtime.participants.debater2;
  const shouldResetToOpenSlots = Boolean(runtime.resetToOpenSlots);
  const audienceVotes = Object.values(runtime.audienceVotes ?? {});
  const debater1AudienceVotes = audienceVotes.filter(side => side === 'debater1').length;
  const debater2AudienceVotes = audienceVotes.filter(side => side === 'debater2').length;

  const debater1 = debater1Participant
    ? {
        ...room.debater1,
        name: debater1Participant.nickname || debater1Participant.name,
        stance: '실시간 참가자',
      }
    : shouldResetToOpenSlots
      ? {
          ...room.debater1,
          name: OPEN_SLOT_NAME,
          stance: '찬성측 참가 가능',
        }
      : room.debater1;

  const debater2 = debater2Participant
    ? {
        ...room.debater2,
        name: debater2Participant.nickname || debater2Participant.name,
        stance: '실시간 참가자',
      }
    : shouldResetToOpenSlots
      ? {
          ...room.debater2,
          name: OPEN_SLOT_NAME,
          stance: '반대측 참가 가능',
        }
      : room.debater2;

  const extraMessages = runtime.extraMessages.map(message => ({
    id: message.id,
    debaterId: message.debaterId,
    content: message.content,
    timestamp: message.timestamp,
  }));

  const reservedDebaters = getParticipantCount(runtime.participants);
  const baseStatus = shouldResetToOpenSlots ? 'scheduled' : runtime.statusOverride ?? room.status;
  const draftRoom: DebateRoom = {
    ...room,
    status: baseStatus,
    debater1,
    debater2,
    messages: shouldResetToOpenSlots ? [] : [...room.messages, ...extraMessages],
    messagesCount: shouldResetToOpenSlots ? 0 : room.messagesCount + extraMessages.length,
    votes: shouldResetToOpenSlots
      ? {
          debater1: 0,
          debater2: 0,
        }
      : {
          debater1: room.votes.debater1 + debater1AudienceVotes,
          debater2: room.votes.debater2 + debater2AudienceVotes,
        },
    viewers: shouldResetToOpenSlots ? 0 : room.viewers,
    reservation: {
      ...room.reservation,
      reservedDebaters,
      waitlistCount: shouldResetToOpenSlots ? 0 : room.reservation.waitlistCount,
    },
  };
  const progress = getDebateProgress(draftRoom);

  return {
    ...draftRoom,
    status: progress?.status === 'ended' ? 'ended' : draftRoom.status,
  };
}

export function finalizeEndedDebateRoom(room: DebateRoom) {
  const map = readRuntimeMap();
  const current = map[room.id] ?? createEmptyRuntime();
  const endedAt = current.endedAt ?? new Date().toISOString();

  archiveLiveDebateRoom(room, endedAt);
  deleteStoredRoomRuntime(room.id);
  removeLiveDebateRoom(room.id);
}

export function getAudienceVote(roomId: string, actorId: string) {
  return getStoredRoomRuntime(roomId).audienceVotes?.[actorId] ?? null;
}

export function setAudienceVote(roomId: string, actorId: string, side: DebateParticipantSide) {
  const map = readRuntimeMap();
  const current = map[roomId] ?? createEmptyRuntime();

  current.audienceVotes = {
    ...(current.audienceVotes ?? {}),
    [actorId]: side,
  };

  map[roomId] = current;
  writeRuntimeMap(map);
  return current.audienceVotes[actorId];
}

export function getAudienceQuestions(roomId: string) {
  return [...(getStoredRoomRuntime(roomId).audienceQuestions ?? [])]
    .sort((left, right) => new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime())
    .map(question => ({
      id: question.id,
      author: question.author,
      text: question.text,
      createdLabel: new Date(question.timestamp).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }));
}

export function addAudienceQuestion(roomId: string, actorId: string, author: string, text: string) {
  const map = readRuntimeMap();
  const current = map[roomId] ?? createEmptyRuntime();
  const nextQuestion: StoredAudienceQuestion = {
    id: `question-${Date.now()}`,
    actorId,
    author,
    text: text.trim(),
    timestamp: new Date().toISOString(),
  };

  current.audienceQuestions = [nextQuestion, ...(current.audienceQuestions ?? [])];
  map[roomId] = current;
  writeRuntimeMap(map);
  return nextQuestion;
}

export function getActiveLiveParticipantRoomId(rooms: DebateRoom[], userId: string) {
  const activeRoom = rooms.find(room => room.status === 'live' && getJoinedSide(room.id, userId) !== null);
  return activeRoom?.id ?? null;
}

export function getParticipantRoomId(rooms: DebateRoom[], userId: string) {
  const joinedRoom = rooms.find(room => room.status !== 'ended' && getJoinedSide(room.id, userId) !== null);
  return joinedRoom?.id ?? null;
}
