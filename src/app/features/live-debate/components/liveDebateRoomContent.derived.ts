import { DEBATE_PHASES, type DebateParticipantSide, type DebateProgress } from '../../../data/liveDebateRuntime';
import type { DebateRoom } from '../../../data/liveDebateRooms';
import type { LiveDebateRoomDerivedState } from './liveDebateRoomContent.types';
import { getWinnerLabel } from './liveDebateRoomContent.helpers';

export function getLiveDebateRoomDerivedState(args: {
  room: DebateRoom;
  debateProgress: DebateProgress | null;
  joinedSide: DebateParticipantSide | null;
  availableSides: DebateParticipantSide[];
  canChangeParticipation: boolean;
}): LiveDebateRoomDerivedState {
  const { room, debateProgress, joinedSide, availableSides, canChangeParticipation } = args;
  const timelinePhases = debateProgress?.phases ?? DEBATE_PHASES;
  const currentStepIndex =
    room.status === 'ended' ? Math.max(timelinePhases.length - 1, 0) : debateProgress?.currentPhaseIndex ?? 0;
  const debater1Votes = room.votes.debater1;
  const debater2Votes = room.votes.debater2;
  const totalVotes = debater1Votes + debater2Votes;
  const debater1Percent = totalVotes === 0 ? 50 : (debater1Votes / totalVotes) * 100;
  const debater2Percent = totalVotes === 0 ? 50 : (debater2Votes / totalVotes) * 100;

  return {
    timelinePhases,
    currentStepIndex,
    liveVotes: {
      debater1: debater1Votes,
      debater2: debater2Votes,
      totalVotes,
      debater1Percent,
      debater2Percent,
      winnerLabel: getWinnerLabel(room, debater1Votes, debater2Votes),
    },
    latestMessage: room.messages[room.messages.length - 1] ?? null,
    isParticipant: joinedSide !== null,
    canSwitchSide: Boolean(joinedSide && canChangeParticipation && availableSides.length > 0),
    canCompose: Boolean(
      joinedSide &&
        room.status === 'live' &&
        debateProgress &&
        !debateProgress.isPaused &&
        debateProgress.currentPhase.kind === 'speaking',
    ),
  };
}
