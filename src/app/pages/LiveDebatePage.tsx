import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  applyRuntimeToRoom,
  getAvailableSides,
  getDebateProgress,
  getJoinedSide,
  getParticipantRoomId,
  getReservedRoomIds,
  joinDebateAsParticipant,
  reserveDebateRoom,
  type DebateParticipantSide,
} from '../data/liveDebateRuntime';
import { createLiveDebateRoom, getLiveDebateRooms, TODAY_DEBATE_TOPIC } from '../data/liveDebateRooms';
import { useAuth } from '../features/auth/AuthContext';
import { LiveDebatePageContent } from '../features/live-debate/components/LiveDebatePageContent';

const ITEMS_PER_PAGE = 5;

export function LiveDebatePage() {
  const navigate = useNavigate();
  const { currentUser, isLoggedIn } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const rooms = useMemo(() => getLiveDebateRooms().map(room => applyRuntimeToRoom(room)), [refreshKey]);
  const reservedRoomIds = useMemo(
    () => (currentUser ? getReservedRoomIds(currentUser.userId) : []),
    [currentUser, refreshKey],
  );
  const participantRoomId = useMemo(
    () => (currentUser ? getParticipantRoomId(rooms, currentUser.userId) : null),
    [rooms, currentUser],
  );
  const totalPages = Math.max(1, Math.ceil(rooms.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const currentRooms = rooms.slice((safeCurrentPage - 1) * ITEMS_PER_PAGE, safeCurrentPage * ITEMS_PER_PAGE);

  const participationStateByRoomId = useMemo(
    () =>
      Object.fromEntries(
        rooms.map(room => [
          room.id,
          {
            roomId: room.id,
            availableSides: getAvailableSides(room),
            joinedSide: currentUser ? getJoinedSide(room.id, currentUser.userId) : null,
            isReserved: reservedRoomIds.includes(room.id),
          },
        ]),
      ),
    [rooms, currentUser, reservedRoomIds, refreshKey],
  );

  const debateProgressByRoomId = useMemo(
    () =>
      Object.fromEntries(rooms.map(room => [room.id, getDebateProgress(room)])),
    [rooms, refreshKey],
  );

  const handleReserve = (roomId: string) => {
    if (!currentUser || (participantRoomId && participantRoomId !== roomId)) return;
    reserveDebateRoom(roomId, currentUser.userId);
    setRefreshKey(value => value + 1);
  };

  const handleJoin = (roomId: string, side: DebateParticipantSide) => {
    if (!currentUser || (participantRoomId && participantRoomId !== roomId)) return;
    const room = rooms.find(item => item.id === roomId);
    if (!room) return;
    joinDebateAsParticipant(room, side, currentUser);
    setRefreshKey(value => value + 1);
  };

  const handleCreateRoom = () => {
    if (!currentUser) return;

    const room = createLiveDebateRoom(currentUser.nickname || currentUser.name);
    setRefreshKey(value => value + 1);
    navigate(`/live/${room.id}`);
  };

  return (
    <LiveDebatePageContent
      rooms={rooms}
      currentRooms={currentRooms}
      currentPage={safeCurrentPage}
      totalPages={totalPages}
      itemsPerPage={ITEMS_PER_PAGE}
      isLoggedIn={isLoggedIn}
      todayTopic={TODAY_DEBATE_TOPIC}
      participantRoomId={participantRoomId}
      participationStateByRoomId={participationStateByRoomId}
      debateProgressByRoomId={debateProgressByRoomId}
      onCreateRoom={handleCreateRoom}
      onReserve={handleReserve}
      onJoin={handleJoin}
      onPageChange={setCurrentPage}
    />
  );
}

