import { useEffect, useMemo, useState } from 'react';
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
} from '../../../data/liveDebateRuntime';
import { createLiveDebateRoom, getLiveDebateRooms } from '../../../data/liveDebateRooms';
import { useAuth } from '../../auth/useAuth';
import { useLiveDebateStorageVersion } from './useLiveDebateStorageVersion';

const ITEMS_PER_PAGE = 5;

export function useLiveDebatePage() {
  const navigate = useNavigate();
  const { currentUser, isLoggedIn } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [clockTick, setClockTick] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const storageVersion = useLiveDebateStorageVersion();

  const rooms = useMemo(() => getLiveDebateRooms().map(room => applyRuntimeToRoom(room)), [refreshKey, storageVersion]);
  const reservedRoomIds = useMemo(
    () => (currentUser ? getReservedRoomIds(currentUser.userId) : []),
    [currentUser, refreshKey, storageVersion],
  );
  const participantRoomId = useMemo(
    () => (currentUser ? getParticipantRoomId(rooms, currentUser.userId) : null),
    [rooms, currentUser],
  );
  const participantRoomTitle = useMemo(
    () => rooms.find(room => room.id === participantRoomId)?.title ?? null,
    [rooms, participantRoomId],
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
    [rooms, currentUser, reservedRoomIds, refreshKey, storageVersion],
  );

  const debateProgressByRoomId = useMemo(() => Object.fromEntries(rooms.map(room => [room.id, getDebateProgress(room)])), [rooms, clockTick]);

  useEffect(() => {
    const hasRunningRoom = rooms.some(room => {
      const progress = getDebateProgress(room);
      return progress && progress.status !== 'ended' && !progress.isPaused;
    });

    if (!hasRunningRoom) return undefined;

    const timer = window.setInterval(() => {
      setClockTick(value => value + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [rooms]);

  const bumpRefresh = () => setRefreshKey(value => value + 1);

  const handleReserve = (roomId: string) => {
    if (!currentUser || (participantRoomId && participantRoomId !== roomId)) return;
    reserveDebateRoom(roomId, currentUser.userId);
    bumpRefresh();
  };

  const handleJoin = (roomId: string, side: DebateParticipantSide) => {
    if (!currentUser || (participantRoomId && participantRoomId !== roomId)) return;
    const room = rooms.find(item => item.id === roomId);
    if (!room) return;
    joinDebateAsParticipant(room, side, currentUser);
    bumpRefresh();
    navigate(`/live/${roomId}`);
  };

  const handleCreateRoom = () => {
    if (!currentUser) return;

    const room = createLiveDebateRoom(currentUser.nickname || currentUser.name);
    bumpRefresh();
    navigate(`/live/${room.id}`);
  };

  return {
    rooms,
    currentRooms,
    currentPage: safeCurrentPage,
    totalPages,
    itemsPerPage: ITEMS_PER_PAGE,
    isLoggedIn,
    participantRoomId,
    participantRoomTitle,
    participationStateByRoomId,
    debateProgressByRoomId,
    handleCreateRoom,
    handleReserve,
    handleJoin,
    handlePageChange: setCurrentPage,
  };
}
