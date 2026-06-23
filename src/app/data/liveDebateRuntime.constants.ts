import type { DebatePhase } from './liveDebateRuntime.types';

export const STORAGE_KEY = 'issuetalk.liveDebate.runtime';
export const OPEN_SLOT_NAME = '참여자 모집 중';

export const DEBATE_PHASES: DebatePhase[] = [
  {
    key: 'free-discussion',
    label: '자유 토론',
    description: '정해진 순서 없이 30분 동안 자유롭게 주장과 반론을 주고받는 토론 구간입니다.',
    durationSeconds: 30 * 60,
    kind: 'speaking',
  },
];

export const ENDED_PHASE: DebatePhase = {
  key: 'ended',
  label: '토론 종료',
  description: '예정된 토론 시간이 모두 끝난 상태입니다.',
  durationSeconds: 0,
  kind: 'ended',
};

export const TOTAL_DEBATE_SECONDS = DEBATE_PHASES.reduce((sum, phase) => sum + phase.durationSeconds, 0);
