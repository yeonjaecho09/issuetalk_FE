import type { DebateRoomAdminState } from '../../../data/liveDebateRuntime';
import type { DebateRoom } from '../../../data/liveDebateRooms';
import { AdminActionButton, AdminCard, AdminDangerButton, ItemActions, ItemCard, ItemList, ItemMeta } from './AdminPageContent.styles';
import { AdminSectionPagination } from './AdminSectionPagination';
import { ROOMS_PER_PAGE } from './adminPageContent.utils';

type AdminRoomsSectionProps = {
  rooms: DebateRoom[];
  roomAdminStates: Record<string, DebateRoomAdminState>;
  currentPage: number;
  totalItems: number;
  onChangePage: (page: number) => void;
  onViewRoom: (roomId: string) => void;
  onTogglePauseRoom: (roomId: string) => void;
  onToggleChatRestriction: (roomId: string) => void;
  onForceEndRoom: (roomId: string) => void;
};

export function AdminRoomsSection({
  rooms,
  roomAdminStates,
  currentPage,
  totalItems,
  onChangePage,
  onViewRoom,
  onTogglePauseRoom,
  onToggleChatRestriction,
  onForceEndRoom,
}: AdminRoomsSectionProps) {
  return (
    <AdminCard>
      <strong>토론방 운영 관리</strong>
      <ItemList>
        {rooms.map(room => {
          const adminState = roomAdminStates[room.id];

          return (
            <ItemCard key={room.id}>
              <div>{room.title}</div>
              <ItemMeta>
                상태 {room.status} · 관전자 {room.viewers}
                {adminState?.isPaused ? ' · 일시 정지됨' : ''}
                {adminState?.isChatRestricted ? ' · 채팅 제한 중' : ''}
              </ItemMeta>
              <ItemActions>
                <AdminActionButton type="button" onClick={() => onViewRoom(room.id)}>
                  방 보기
                </AdminActionButton>
                <AdminActionButton type="button" onClick={() => onTogglePauseRoom(room.id)}>
                  {adminState?.isPaused ? '재개' : '일시 정지'}
                </AdminActionButton>
                <AdminActionButton type="button" onClick={() => onToggleChatRestriction(room.id)}>
                  {adminState?.isChatRestricted ? '채팅 제한 해제' : '채팅 제한'}
                </AdminActionButton>
                <AdminDangerButton type="button" onClick={() => onForceEndRoom(room.id)}>
                  종료
                </AdminDangerButton>
              </ItemActions>
            </ItemCard>
          );
        })}
      </ItemList>
      <AdminSectionPagination
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={ROOMS_PER_PAGE}
        label="토론방 페이지"
        onChangePage={onChangePage}
      />
    </AdminCard>
  );
}

