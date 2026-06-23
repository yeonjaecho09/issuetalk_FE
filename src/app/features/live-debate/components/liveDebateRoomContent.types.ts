import type { DebateProgress } from '../../../data/liveDebateRuntime';
import type { DebateRoom } from '../../../data/liveDebateRooms';

export type AudienceQuestion = {
  id: string;
  author: string;
  text: string;
  createdLabel: string;
};

export type LiveDebateVoteState = {
  debater1: number;
  debater2: number;
  totalVotes: number;
  debater1Percent: number;
  debater2Percent: number;
  winnerLabel: string;
};

export type LiveDebateRoomDerivedState = {
  timelinePhases: DebateProgress['phases'];
  currentStepIndex: number;
  liveVotes: LiveDebateVoteState;
  latestMessage: DebateRoom['messages'][number] | null;
  isParticipant: boolean;
  canSwitchSide: boolean;
  canCompose: boolean;
};
