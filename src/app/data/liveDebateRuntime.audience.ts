import { createEmptyRuntime, getStoredRoomRuntime, readRuntimeMap, writeRuntimeMap } from './liveDebateRuntime.storage';
import type { DebateParticipantSide, StoredAudienceQuestion } from './liveDebateRuntime.types';

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
