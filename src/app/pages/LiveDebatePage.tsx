import { TODAY_DEBATE_TOPIC } from '../data/liveDebateRooms';
import { LiveDebatePageContent } from '../features/live-debate/components/LiveDebatePageContent';
import { useLiveDebatePage } from '../features/live-debate/hooks/useLiveDebatePage';

export function LiveDebatePage() {
  const {
    rooms,
    currentRooms,
    currentPage,
    totalPages,
    itemsPerPage,
    isLoggedIn,
    participantRoomId,
    participantRoomTitle,
    participationStateByRoomId,
    debateProgressByRoomId,
    handleCreateRoom,
    handleReserve,
    handleJoin,
    handlePageChange,
  } = useLiveDebatePage();

  return (
    <LiveDebatePageContent
      rooms={rooms}
      currentRooms={currentRooms}
      currentPage={currentPage}
      totalPages={totalPages}
      itemsPerPage={itemsPerPage}
      isLoggedIn={isLoggedIn}
      todayTopic={TODAY_DEBATE_TOPIC}
      participantRoomId={participantRoomId}
      participantRoomTitle={participantRoomTitle}
      participationStateByRoomId={participationStateByRoomId}
      debateProgressByRoomId={debateProgressByRoomId}
      onCreateRoom={handleCreateRoom}
      onReserve={handleReserve}
      onJoin={handleJoin}
      onPageChange={handlePageChange}
    />
  );
}
