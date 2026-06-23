import { PenSquare } from 'lucide-react';
import { PageContainer } from '../../../components/ui/primitives';
import { Pagination } from '../../../components/ui/Pagination';
import type { DebateParticipantSide, DebateProgress } from '../../../data/liveDebateRuntime';
import type { DebateRoom } from '../../../data/liveDebateRooms';
import { formatDuration } from './liveDebateRoomContent.utils';
import {
  CreateHelperText,
  CreatePanel,
  CreatePanelButton,
  CreatePanelMeta,
  CreatePanelTitle,
  DebateEyebrow,
  DebateHeader,
  DebateTitle,
  EmptyState,
  ParticipantRoomLink,
  ParticipationNotice,
  ParticipationNoticeText,
  ParticipationNoticeTitle,
  ReserveButton,
  ReserveMeta,
  RoomActions,
  RoomCard,
  RoomHeader,
  RoomList,
  RoomMeta,
  RoomStatus,
  RoomVersus,
  WatchLink,
} from './LiveDebatePageContent.styles';

type RoomParticipationState = {
  roomId: string;
  availableSides: DebateParticipantSide[];
  joinedSide: DebateParticipantSide | null;
  isReserved: boolean;
};

type LiveDebatePageContentProps = {
  rooms: DebateRoom[];
  currentRooms: DebateRoom[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  isLoggedIn: boolean;
  todayTopic: string;
  participantRoomId: string | null;
  participantRoomTitle: string | null;
  participationStateByRoomId: Record<string, RoomParticipationState>;
  debateProgressByRoomId: Record<string, DebateProgress | null>;
  onCreateRoom: () => void;
  onReserve: (roomId: string) => void;
  onJoin: (roomId: string, side: DebateParticipantSide) => void;
  onPageChange: (page: number) => void;
};

function getRoomStatusLabel(status: DebateRoom['status']) {
  if (status === 'live') return '진행 중';
  if (status === 'scheduled') return '대기 중';
  return '종료';
}

function getJoinedSideLabel(side: DebateParticipantSide | null) {
  if (side === 'debater1') return '찬성 측 참여 중';
  if (side === 'debater2') return '반대 측 참여 중';
  return '';
}

function getRemainingTimeLabel(room: DebateRoom, progress: DebateProgress | null) {
  if (room.status === 'live' && progress) {
    return formatDuration(progress.remainingTotalSeconds);
  }

  if (room.status === 'scheduled') {
    return '30:00';
  }

  return '종료';
}

export function LiveDebatePageContent({
  rooms,
  currentRooms,
  currentPage,
  totalPages,
  itemsPerPage,
  isLoggedIn,
  todayTopic,
  participantRoomId,
  participantRoomTitle,
  participationStateByRoomId,
  debateProgressByRoomId,
  onCreateRoom,
  onReserve,
  onJoin,
  onPageChange,
}: LiveDebatePageContentProps) {
  return (
    <PageContainer>
      <DebateHeader>
        <DebateEyebrow>실시간 토론 로비</DebateEyebrow>
        <DebateTitle>지금 열려 있는 토론방</DebateTitle>
        <p>오늘의 주제로 만들어진 토론방을 살펴보고, 참여 또는 관전으로 바로 이동해 보세요.</p>
      </DebateHeader>

      {participantRoomId ? (
        <ParticipationNotice>
          <div>
            <ParticipationNoticeTitle>현재 다른 토론방에 참여 중입니다</ParticipationNoticeTitle>
            <ParticipationNoticeText>
              토론 참여자는 동시에 여러 토론방에 입장할 수 없습니다. 다른 방에서는 관전만 가능하며, 참여 중인 방에서 먼저 나와야 새 토론방에 참여할 수 있습니다.
            </ParticipationNoticeText>
          </div>
          <ParticipantRoomLink to={`/live/${participantRoomId}`}>
            {participantRoomTitle ? `${participantRoomTitle}으로 이동` : '참여 중인 토론방으로 이동'}
          </ParticipantRoomLink>
        </ParticipationNotice>
      ) : null}

      <CreatePanel>
        <div>
          <CreatePanelMeta>오늘의 토론 주제</CreatePanelMeta>
          <CreatePanelTitle>{todayTopic}</CreatePanelTitle>
          <CreateHelperText>
            로그인한 사용자는 같은 주제로 새로운 토론방을 만들고, 직접 참여자가 모이면 바로 자유 토론을 시작할 수 있습니다.
          </CreateHelperText>
        </div>
        <CreatePanelButton type="button" disabled={!isLoggedIn} onClick={onCreateRoom}>
          <PenSquare size={18} />
          오늘의 토론방 만들기
        </CreatePanelButton>
      </CreatePanel>

      {rooms.length === 0 ? (
        <EmptyState>아직 생성된 토론방이 없습니다. 첫 번째 토론방을 열고 오늘의 주제로 토론을 시작해 보세요.</EmptyState>
      ) : (
        <>
          <RoomList>
            {currentRooms.map(room => {
              const state = participationStateByRoomId[room.id] ?? {
                roomId: room.id,
                availableSides: [],
                joinedSide: null,
                isReserved: false,
              };
              const blockedByOtherParticipation = Boolean(participantRoomId && participantRoomId !== room.id);
              const debateProgress = debateProgressByRoomId[room.id] ?? null;

              return (
                <RoomCard key={room.id}>
                  <RoomHeader>
                    <div>
                      <strong>{room.title}</strong>
                    </div>
                    <RoomStatus $live={room.status === 'live'}>{getRoomStatusLabel(room.status)}</RoomStatus>
                  </RoomHeader>
                  <RoomVersus>
                    {room.debater1.name} vs {room.debater2.name}
                  </RoomVersus>
                  <RoomMeta>
                    참여자 {room.reservation.reservedDebaters}/{room.reservation.debaterCapacity}명, 관전자 {room.viewers}명, 남은 시간{' '}
                    {getRemainingTimeLabel(room, debateProgress)}
                  </RoomMeta>
                  <RoomActions>
                    {state.joinedSide ? (
                      <ReserveButton type="button" disabled>
                        {getJoinedSideLabel(state.joinedSide)}
                      </ReserveButton>
                    ) : blockedByOtherParticipation ? (
                      <ReserveButton type="button" disabled>
                        다른 토론방 참여 중
                      </ReserveButton>
                    ) : state.availableSides.length > 0 ? (
                      <>
                        {state.availableSides.includes('debater1') ? (
                          <ReserveButton type="button" disabled={!isLoggedIn} onClick={() => onJoin(room.id, 'debater1')}>
                            찬성 측 입장
                          </ReserveButton>
                        ) : null}
                        {state.availableSides.includes('debater2') ? (
                          <ReserveButton type="button" disabled={!isLoggedIn} onClick={() => onJoin(room.id, 'debater2')}>
                            반대 측 입장
                          </ReserveButton>
                        ) : null}
                      </>
                    ) : (
                      <ReserveButton type="button" disabled={!isLoggedIn || state.isReserved} onClick={() => onReserve(room.id)}>
                        {state.isReserved ? '대기 예약 완료' : '참여 대기 예약'}
                      </ReserveButton>
                    )}
                    <WatchLink to={`/live/${room.id}`}>관전하기</WatchLink>
                  </RoomActions>
                  <ReserveMeta>
                    {blockedByOtherParticipation
                      ? '현재 다른 토론방에서 참여 중이므로 이 방에는 토론 참여자로 입장할 수 없습니다. 관전하기로만 이동할 수 있습니다.'
                      : state.joinedSide
                        ? '이 방의 참여자로 등록되어 있습니다. 상세 페이지에서 바로 발언을 이어갈 수 있습니다.'
                        : state.availableSides.length > 0
                          ? isLoggedIn
                            ? '빈 자리가 있으면 로비에서 바로 참여할 수 있습니다.'
                            : '로그인하면 로비에서 바로 찬성 또는 반대 참여자로 입장할 수 있습니다.'
                          : state.isReserved
                            ? '현재 자리가 모두 찼습니다. 대기 예약으로 등록되어 빈자리가 나면 확인할 수 있습니다.'
                            : '현재 자리가 모두 찼습니다. 대기 예약으로 다음 빈자리를 기다릴 수 있습니다.'}
                  </ReserveMeta>
                </RoomCard>
              );
            })}
          </RoomList>

          <Pagination
            ariaLabel="토론방 페이지 이동"
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={rooms.length}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
            emptyText="표시할 토론방이 없습니다."
          />
        </>
      )}
    </PageContainer>
  );
}
