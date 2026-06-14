import { DEBATE_PHASES, type DebateParticipantSide, type DebateProgress } from '../../../data/liveDebateRuntime';
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

export function formatRoomStatus(status: DebateRoom['status']) {
  if (status === 'live') return 'LIVE';
  if (status === 'scheduled') return '?덉젙';
  return '醫낅즺';
}

export function formatStartTime(startTime: string) {
  return new Date(startTime).toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatMessageTime(timestamp: string) {
  return new Date(timestamp).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function getSideLabel(side: DebateParticipantSide) {
  return side === 'debater1' ? '李ъ꽦痢?' : '諛섎?痢?';
}

export function getTimelineDescription(progress: DebateProgress | null, index: number) {
  const phase = progress?.phases[index];
  if (!phase) return '';

  const durationLabel = `${Math.floor(phase.durationSeconds / 60)}遺?`;
  if (progress?.currentPhaseIndex === index && progress.status === 'live') {
    return `${phase.description} 吏湲??④퀎 醫낅즺源뚯? ${formatDuration(progress.remainingPhaseSeconds)} ?⑥븯?듬땲??`;
  }

  if (progress?.currentPhaseIndex === index && progress.isPaused) {
    return `${phase.description} 李멸????ъ엯???꾧퉴吏 ???④퀎?먯꽌 ?쇱떆以묒??섏뼱 ?덉뒿?덈떎.`;
  }

  return `${phase.description} 諛곗젙 ?쒓컙? ${durationLabel}?낅땲??`;
}

export function getSessionStatusText(room: DebateRoom, progress: DebateProgress | null) {
  if (room.status === 'ended') return '?덉젙??紐⑤뱺 ?좊줎 ?쒓컙??醫낅즺?섏뿀?듬땲??';
  if (!progress) return '?몄뀡 ?쒖옉 ??以鍮??④퀎?낅땲??';
  if (progress.isPaused) return `${progress.currentPhase.label} ?④퀎?먯꽌 以묐떒?섏뿀怨??ъ엯?μ쓣 湲곕떎由ш퀬 ?덉뒿?덈떎.`;
  if (room.status === 'live') return `${progress.currentPhase.label} 吏꾪뻾 以?쨌 ${formatDuration(progress.remainingPhaseSeconds)} ?⑥쓬`;
  return '?몄뀡 ?쒖옉 ??以鍮??④퀎?낅땲??';
}

export function getComposerPlaceholder(room: DebateRoom, progress: DebateProgress | null) {
  if (room.status === 'ended') return '?좊줎??醫낅즺?섏뼱 ???댁긽 諛쒖뼵???낅젰?????놁뒿?덈떎.';
  if (room.status !== 'live') return '?몄뀡 ?쒖옉 ??諛쒖뼵???낅젰?????덉뒿?덈떎.';
  if (progress?.isPaused) return '李멸????댄깉濡??좊줎???쇱떆以묒??섏뼱 ?덉뒿?덈떎.';
  if (progress?.currentPhase.kind === 'break') return '?댁떇 ?쒓컙?먮뒗 諛쒖뼵???낅젰?????놁뒿?덈떎.';
  return '吏湲?諛쒖뼵???낅젰??蹂댁꽭??';
}

export function getWinnerLabel(room: DebateRoom, debater1Votes: number, debater2Votes: number) {
  if (debater1Votes === debater2Votes) return '臾댁듅遺';
  return debater1Votes > debater2Votes ? `${room.debater1.name} ?곗꽭` : `${room.debater2.name} ?곗꽭`;
}

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
