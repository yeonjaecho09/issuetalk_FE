import type { DebateRoomStatus } from './liveDebateRooms';

export type DebateParticipantSide = 'debater1' | 'debater2';
export type DebatePhaseKey = 'free-discussion' | 'opening' | 'break-1' | 'rebuttal' | 'break-2' | 'closing' | 'ended';

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

export type StoredParticipant = {
  userId: string;
  name: string;
  nickname: string;
  joinedAt: string;
};

export type StoredMessage = {
  id: string;
  debaterId: string;
  side: DebateParticipantSide;
  content: string;
  timestamp: string;
};

export type StoredAudienceQuestion = {
  id: string;
  actorId: string;
  author: string;
  text: string;
  timestamp: string;
};

export type RoomRuntimeState = {
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

export type RuntimeMap = Record<string, RoomRuntimeState>;
