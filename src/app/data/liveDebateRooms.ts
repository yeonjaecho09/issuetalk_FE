import { notifyLiveDebateStorageUpdated } from './liveDebateSubscriptions';

export type DebateRoomStatus = 'live' | 'scheduled' | 'ended';

export type DebateRoom = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  host: string;
  roundLabel: string;
  status: DebateRoomStatus;
  startTime: string;
  viewers: number;
  messagesCount: number;
  tags: string[];
  reservation: {
    debaterCapacity: number;
    reservedDebaters: number;
    waitlistCount: number;
  };
  debater1: {
    id: string;
    name: string;
    stance: string;
  };
  debater2: {
    id: string;
    name: string;
    stance: string;
  };
  votes: {
    debater1: number;
    debater2: number;
  };
  messages: Array<{
    id: string;
    debaterId: string;
    content: string;
    timestamp: string;
  }>;
};

export const TODAY_DEBATE_TOPIC = '정책 토론에서 감정 표현은 어디까지 허용되어야 할까?';

export const STORAGE_KEY = 'issuetalk.liveDebate.rooms';
const OPEN_SLOT_NAME = '참여자 모집 중';

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function isDebateRoom(value: unknown): value is DebateRoom {
  if (!value || typeof value !== 'object') return false;

  const room = value as Record<string, unknown>;
  return (
    typeof room.id === 'string' &&
    typeof room.slug === 'string' &&
    typeof room.title === 'string' &&
    typeof room.summary === 'string' &&
    typeof room.category === 'string' &&
    typeof room.host === 'string' &&
    typeof room.roundLabel === 'string' &&
    typeof room.status === 'string' &&
    typeof room.startTime === 'string' &&
    typeof room.viewers === 'number' &&
    typeof room.messagesCount === 'number' &&
    Array.isArray(room.tags) &&
    Boolean(room.reservation) &&
    Boolean(room.debater1) &&
    Boolean(room.debater2) &&
    Boolean(room.votes) &&
    Array.isArray(room.messages)
  );
}

function readStoredRooms() {
  if (!isBrowser()) return [] as DebateRoom[];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isDebateRoom);
  } catch {
    return [];
  }
}

function writeStoredRooms(rooms: DebateRoom[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
  notifyLiveDebateStorageUpdated(STORAGE_KEY);
}

export function getLiveDebateRooms() {
  return readStoredRooms().sort((left, right) => new Date(left.startTime).getTime() - new Date(right.startTime).getTime());
}

export function createLiveDebateRoom(hostName: string) {
  const rooms = getLiveDebateRooms();
  const roomNumber = rooms.length + 1;
  const roomId = `room-user-${Date.now()}`;
  const createdAt = new Date().toISOString();

  const room: DebateRoom = {
    id: roomId,
    slug: `today-topic-user-room-${roomNumber}`,
    title: `${TODAY_DEBATE_TOPIC} - ${roomNumber}`,
    summary: `오늘의 주제 "${TODAY_DEBATE_TOPIC}"로 진행되는 사용자 생성 토론방입니다. 양측 참여자가 입장하면 바로 토론을 시작할 수 있습니다.`,
    category: '오늘의 토론',
    host: `${hostName} 님`,
    roundLabel: `사용자 생성 토론방 ${roomNumber}`,
    status: 'scheduled',
    startTime: createdAt,
    viewers: 0,
    messagesCount: 0,
    tags: ['오늘의 토론', '사용자 생성', '1:1 토론'],
    reservation: {
      debaterCapacity: 2,
      reservedDebaters: 0,
      waitlistCount: 0,
    },
    debater1: {
      id: `${roomId}-debater1`,
      name: OPEN_SLOT_NAME,
      stance: '찬성 측 참여 가능',
    },
    debater2: {
      id: `${roomId}-debater2`,
      name: OPEN_SLOT_NAME,
      stance: '반대 측 참여 가능',
    },
    votes: {
      debater1: 0,
      debater2: 0,
    },
    messages: [],
  };

  writeStoredRooms([room, ...rooms]);
  return room;
}

export function getDebateRoomById(roomId: string) {
  return getLiveDebateRooms().find(room => room.id === roomId);
}

export function removeLiveDebateRoom(roomId: string) {
  const nextRooms = getLiveDebateRooms().filter(room => room.id !== roomId);
  writeStoredRooms(nextRooms);
}
