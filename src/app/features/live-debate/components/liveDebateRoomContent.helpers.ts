import type { DebateParticipantSide, DebateProgress } from '../../../data/liveDebateRuntime';
import type { DebateRoom } from '../../../data/liveDebateRooms';

export function formatRoomStatus(status: DebateRoom['status']) {
  if (status === 'live') return 'LIVE';
  if (status === 'scheduled') return '예정';
  return '종료';
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
  return side === 'debater1' ? '찬성' : '반대';
}

export function getTimelineDescription(progress: DebateProgress | null, index: number) {
  const phase = progress?.phases[index];
  if (!phase) return '';

  const durationLabel = `${Math.floor(phase.durationSeconds / 60)}분`;
  if (progress?.currentPhaseIndex === index && progress.status === 'live') {
    return `${phase.description} 현재 단계가 진행 중이며 ${formatDuration(progress.remainingPhaseSeconds)} 남았습니다.`;
  }

  if (progress?.currentPhaseIndex === index && progress.isPaused) {
    return `${phase.description} 현재 토론이 잠시 멈춘 상태입니다.`;
  }

  return `${phase.description} 총 ${durationLabel} 진행됩니다.`;
}

export function getSessionStatusText(room: DebateRoom, progress: DebateProgress | null) {
  if (room.status === 'ended') return '예정된 토론 시간이 모두 끝나 최종 결과가 기록되었습니다.';
  if (!progress) return '아직 토론이 시작되지 않았습니다.';
  if (progress.isPaused) return `${progress.currentPhase.label} 단계가 일시 중지되어 있습니다.`;
  if (room.status === 'live') return `${progress.currentPhase.label} 진행 중 · ${formatDuration(progress.remainingPhaseSeconds)} 남음`;
  return '아직 토론이 시작되지 않았습니다.';
}

export function getComposerPlaceholder(room: DebateRoom, progress: DebateProgress | null) {
  if (room.status === 'ended') return '종료된 토론에서는 새 발언을 입력할 수 없습니다.';
  if (room.status !== 'live') return '토론이 시작되면 이곳에서 발언을 입력할 수 있습니다.';
  if (progress?.isPaused) return '토론이 일시 중지된 상태입니다.';
  if (progress?.currentPhase.kind === 'break') return '휴식 시간에는 발언을 입력할 수 없습니다.';
  return '현재 단계에 맞는 발언을 입력해 주세요.';
}

export function getWinnerLabel(room: DebateRoom, debater1Votes: number, debater2Votes: number) {
  if (debater1Votes === debater2Votes) return '무승부';
  return debater1Votes > debater2Votes ? `${room.debater1.name} 승리` : `${room.debater2.name} 승리`;
}

