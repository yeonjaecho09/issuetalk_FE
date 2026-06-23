import type { DebateRoom } from './liveDebateRooms';
import { DEBATE_PHASES, ENDED_PHASE, TOTAL_DEBATE_SECONDS } from './liveDebateRuntime.constants';
import { getRuntimeStartedAt } from './liveDebateRuntime.helpers';
import { getStoredRoomRuntime } from './liveDebateRuntime.storage';
import type { DebateProgress } from './liveDebateRuntime.types';

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
