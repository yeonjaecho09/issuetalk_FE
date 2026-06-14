import type { DebateRoom } from './liveDebateRooms';
import { pastDebates } from './mockData';
import type { LiveDebate, Post, User } from '../types';

type RawPastDebate = {
  id: string;
  topic: Omit<Post, 'createdAt'> & { createdAt: string };
  debater1: User;
  debater2: User;
  status: 'ended';
  startTime: string;
  endTime: string;
  messages: Array<{
    id: string;
    debaterId: string;
    content: string;
    timestamp: string;
  }>;
  votes: {
    debater1: number;
    debater2: number;
  };
  viewers: number;
};

const STORAGE_KEY = 'issuetalk.pastDebates.archive';

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function toRawPastDebate(debate: LiveDebate): RawPastDebate {
  return {
    id: debate.id,
    topic: {
      ...debate.topic,
      createdAt: debate.topic.createdAt.toISOString(),
    },
    debater1: debate.debater1,
    debater2: debate.debater2,
    status: 'ended',
    startTime: debate.startTime.toISOString(),
    endTime: (debate.endTime ?? debate.startTime).toISOString(),
    messages: debate.messages.map(message => ({
      id: message.id,
      debaterId: message.debaterId,
      content: message.content,
      timestamp: message.timestamp.toISOString(),
    })),
    votes: debate.votes,
    viewers: debate.viewers,
  };
}

function fromRawPastDebate(raw: RawPastDebate): LiveDebate {
  return {
    id: raw.id,
    topic: {
      ...raw.topic,
      createdAt: new Date(raw.topic.createdAt),
    },
    debater1: raw.debater1,
    debater2: raw.debater2,
    status: 'ended',
    startTime: new Date(raw.startTime),
    endTime: new Date(raw.endTime),
    messages: raw.messages.map(message => ({
      ...message,
      timestamp: new Date(message.timestamp),
    })),
    votes: raw.votes,
    viewers: raw.viewers,
  };
}

function isRawPastDebate(value: unknown): value is RawPastDebate {
  if (!value || typeof value !== 'object') return false;

  const item = value as Record<string, unknown>;
  return (
    typeof item.id === 'string' &&
    typeof item.startTime === 'string' &&
    typeof item.endTime === 'string' &&
    item.status === 'ended' &&
    typeof item.topic === 'object' &&
    Array.isArray(item.messages) &&
    typeof item.votes === 'object'
  );
}

function getDefaultArchive() {
  return pastDebates.map(toRawPastDebate);
}

function readArchive(): RawPastDebate[] {
  if (!isBrowser()) return getDefaultArchive();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultArchive();

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return getDefaultArchive();

    return parsed.filter(isRawPastDebate);
  } catch {
    return getDefaultArchive();
  }
}

function writeArchive(debates: RawPastDebate[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(debates));
}

function buildTopicFromRoom(room: DebateRoom): Post {
  return {
    id: `topic-${room.id}`,
    type: 'debate-topic',
    title: room.title,
    content: room.summary,
    author: {
      id: `host-${room.id}`,
      name: room.host,
    },
    category: room.category,
    likes: 0,
    commentCount: room.messages.length,
    views: room.viewers,
    createdAt: new Date(room.startTime),
  };
}

export function getPastDebates() {
  return readArchive()
    .map(fromRawPastDebate)
    .sort((left, right) => right.startTime.getTime() - left.startTime.getTime());
}

export function getPastDebateById(id: string) {
  return getPastDebates().find(debate => debate.id === id);
}

export function archiveLiveDebateRoom(room: DebateRoom, endTime: string) {
  const archive = readArchive();
  const nextDebate = toRawPastDebate({
    id: room.id,
    topic: buildTopicFromRoom(room),
    debater1: {
      id: room.debater1.id,
      name: room.debater1.name,
    },
    debater2: {
      id: room.debater2.id,
      name: room.debater2.name,
    },
    status: 'ended',
    startTime: new Date(room.startTime),
    endTime: new Date(endTime),
    messages: room.messages.map(message => ({
      id: message.id,
      debaterId: message.debaterId,
      content: message.content,
      timestamp: new Date(message.timestamp),
    })),
    votes: room.votes,
    viewers: room.viewers,
  });

  const withoutCurrent = archive.filter(debate => debate.id !== room.id);
  writeArchive([nextDebate, ...withoutCurrent]);
}
