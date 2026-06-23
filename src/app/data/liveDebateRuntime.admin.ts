import { archiveLiveDebateRoom } from './pastDebateArchive';
import { removeLiveDebateRoom, type DebateRoom } from './liveDebateRooms';
import { OPEN_SLOT_NAME } from './liveDebateRuntime.constants';
import { getParticipantCount, shiftStartedAt } from './liveDebateRuntime.helpers';
import { getDebateProgress } from './liveDebateRuntime.progress';
import { createEmptyRuntime, deleteStoredRoomRuntime, ensureRoomRuntime, getStoredRoomRuntime, readRuntimeMap, writeRuntimeMap } from './liveDebateRuntime.storage';
import type { DebateRoomAdminState } from './liveDebateRuntime.types';

export function getDebateRoomAdminState(roomId: string): DebateRoomAdminState {
  const runtime = getStoredRoomRuntime(roomId);

  return {
    isChatRestricted: Boolean(runtime.chatRestricted),
    isPaused: Boolean(runtime.pausedAt && runtime.statusOverride === 'live'),
  };
}

export function toggleDebateRoomPause(roomId: string) {
  const map = readRuntimeMap();
  const current = map[roomId] ?? ensureRoomRuntime(roomId);

  if (current.pausedAt) {
    const resumedAt = new Date().toISOString();

    if (current.startedAt) {
      current.startedAt = shiftStartedAt(current.startedAt, current.pausedAt, resumedAt);
    } else {
      current.startedAt = resumedAt;
    }

    current.pausedAt = undefined;
    current.statusOverride = 'live';
  } else {
    current.pausedAt = new Date().toISOString();
    current.statusOverride = 'live';
  }

  map[roomId] = current;
  writeRuntimeMap(map);
  return current;
}

export function toggleDebateRoomChatRestriction(roomId: string) {
  const map = readRuntimeMap();
  const current = map[roomId] ?? ensureRoomRuntime(roomId);

  current.chatRestricted = !current.chatRestricted;
  map[roomId] = current;
  writeRuntimeMap(map);
  return current;
}

export function forceEndDebateRoom(room: DebateRoom) {
  const endedAt = new Date().toISOString();

  archiveLiveDebateRoom(room, endedAt);
  deleteStoredRoomRuntime(room.id);
  removeLiveDebateRoom(room.id);
}

export function finalizeEndedDebateRoom(room: DebateRoom) {
  const map = readRuntimeMap();
  const current = map[room.id] ?? createEmptyRuntime();
  const endedAt = current.endedAt ?? new Date().toISOString();

  archiveLiveDebateRoom(room, endedAt);
  deleteStoredRoomRuntime(room.id);
  removeLiveDebateRoom(room.id);
}

export function applyRuntimeToRoom(room: DebateRoom): DebateRoom {
  const runtime = getStoredRoomRuntime(room.id);
  const baseStatus = runtime.resetToOpenSlots ? 'scheduled' : runtime.statusOverride ?? room.status;
  const debater1Participant = runtime.participants.debater1;
  const debater2Participant = runtime.participants.debater2;
  const shouldResetToOpenSlots = Boolean(runtime.resetToOpenSlots);
  const audienceVotes = Object.values(runtime.audienceVotes ?? {});
  const debater1AudienceVotes = audienceVotes.filter(side => side === 'debater1').length;
  const debater2AudienceVotes = audienceVotes.filter(side => side === 'debater2').length;

  const debater1 = debater1Participant
    ? {
        ...room.debater1,
        name: debater1Participant.nickname || debater1Participant.name,
        stance: '실시간 참여 중',
      }
    : baseStatus === 'scheduled'
      ? {
          ...room.debater1,
          name: OPEN_SLOT_NAME,
          stance: '찬성 측 참여 가능',
        }
      : room.debater1;

  const debater2 = debater2Participant
    ? {
        ...room.debater2,
        name: debater2Participant.nickname || debater2Participant.name,
        stance: '실시간 참여 중',
      }
    : baseStatus === 'scheduled'
      ? {
          ...room.debater2,
          name: OPEN_SLOT_NAME,
          stance: '반대 측 참여 가능',
        }
      : room.debater2;

  const extraMessages = runtime.extraMessages.map(message => ({
    id: message.id,
    debaterId: message.debaterId,
    content: message.content,
    timestamp: message.timestamp,
  }));

  const reservedDebaters = getParticipantCount(runtime.participants);
  const draftRoom: DebateRoom = {
    ...room,
    status: baseStatus,
    debater1,
    debater2,
    messages: shouldResetToOpenSlots ? [] : [...room.messages, ...extraMessages],
    messagesCount: shouldResetToOpenSlots ? 0 : room.messagesCount + extraMessages.length,
    votes: shouldResetToOpenSlots
      ? {
          debater1: 0,
          debater2: 0,
        }
      : {
          debater1: room.votes.debater1 + debater1AudienceVotes,
          debater2: room.votes.debater2 + debater2AudienceVotes,
        },
    viewers: shouldResetToOpenSlots ? 0 : room.viewers,
    reservation: {
      ...room.reservation,
      reservedDebaters,
      waitlistCount: shouldResetToOpenSlots ? 0 : room.reservation.waitlistCount,
    },
  };
  const progress = getDebateProgress(draftRoom);

  return {
    ...draftRoom,
    status: progress?.status === 'ended' ? 'ended' : draftRoom.status,
  };
}
