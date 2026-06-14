import { SecondaryButton } from '../../../components/ui/primitives';
import type { DebateParticipantSide, DebateProgress } from '../../../data/liveDebateRuntime';
import type { DebateRoom } from '../../../data/liveDebateRooms';
import {
  InfoLabel,
  InfoList,
  InfoRow,
  InfoValue,
  ParticipationActions,
  ParticipationBadge,
  ParticipationButton,
  ParticipationHint,
  ParticipationPanel,
  ParticipationSecondaryActions,
  ReportButton,
  ReportButtonWrap,
  ReportSuccess,
  ReportText,
  SectionCard,
  SectionTitleRow,
  SideColumn,
  VoteActions,
  VoteBar,
  VoteButton,
  VoteFillAccent,
  VoteFillPrimary,
  VoteFillRow,
  VoteHint,
  VoteMetaRow,
  VotePanel,
} from './LiveDebateRoomPageContent.styles';
import { formatStartTime, getSideLabel, type LiveDebateVoteState } from './liveDebateRoomContent.utils';

type LiveDebateRoomSideColumnProps = {
  room: DebateRoom;
  isLoggedIn: boolean;
  isReported: boolean;
  currentNickname: string | null;
  joinedSide: DebateParticipantSide | null;
  availableSides: DebateParticipantSide[];
  blockedByOtherParticipation: boolean;
  debateProgress: DebateProgress | null;
  canStartDebate: boolean;
  canChangeParticipation: boolean;
  canSwitchSide: boolean;
  isParticipant: boolean;
  selectedVote: 'debater1' | 'debater2' | null;
  liveVotes: LiveDebateVoteState;
  onJoin: (side: DebateParticipantSide) => void;
  onLeave: () => void;
  onSwitchSide: () => void;
  onStartDebate: () => void;
  onSelectVote: (side: 'debater1' | 'debater2') => void;
  onReport: () => void;
};

export function LiveDebateRoomSideColumn({
  room,
  isLoggedIn,
  isReported,
  currentNickname,
  joinedSide,
  availableSides,
  blockedByOtherParticipation,
  debateProgress,
  canStartDebate,
  canChangeParticipation,
  canSwitchSide,
  isParticipant,
  selectedVote,
  liveVotes,
  onJoin,
  onLeave,
  onSwitchSide,
  onStartDebate,
  onSelectVote,
  onReport,
}: LiveDebateRoomSideColumnProps) {
  return (
    <SideColumn>
      <SectionCard>
        <SectionTitleRow>
          <strong>토론 참여</strong>
          {joinedSide ? <ParticipationBadge $active>{getSideLabel(joinedSide)} 참여 중</ParticipationBadge> : null}
        </SectionTitleRow>
        <ParticipationPanel>
          {!isLoggedIn ? (
            <ParticipationHint>로그인하면 찬성 또는 반대 참여자로 토론에 바로 들어갈 수 있습니다.</ParticipationHint>
          ) : joinedSide ? (
            <>
              <ParticipationHint>{currentNickname ?? '참여자'}님이 현재 {getSideLabel(joinedSide)}으로 참여 중입니다.</ParticipationHint>
              {canChangeParticipation ? (
                <ParticipationSecondaryActions>
                  <SecondaryButton type="button" disabled={!canSwitchSide} onClick={onSwitchSide}>
                    반대편으로 이동
                  </SecondaryButton>
                  <SecondaryButton type="button" onClick={onLeave}>
                    참여 취소
                  </SecondaryButton>
                </ParticipationSecondaryActions>
              ) : debateProgress?.isPaused ? (
                <ParticipationHint>상대 참여자가 나가 토론이 잠시 멈춘 상태입니다. 새 참여자가 들어오면 이어서 진행됩니다.</ParticipationHint>
              ) : room.status === 'ended' ? (
                <ParticipationHint>토론이 종료되어 더 이상 참여 상태를 바꿀 수 없습니다.</ParticipationHint>
              ) : (
                <ParticipationHint>토론이 이미 진행 중이므로 참여 상태 변경은 잠겨 있습니다.</ParticipationHint>
              )}
              {room.status === 'scheduled' ? (
                canStartDebate ? (
                  <ParticipationButton type="button" onClick={onStartDebate}>
                    토론 시작
                  </ParticipationButton>
                ) : (
                  <ParticipationHint>양쪽 참여자가 모두 입장해야 토론을 시작할 수 있습니다.</ParticipationHint>
                )
              ) : room.status === 'live' ? (
                <ParticipationHint>
                  {debateProgress?.currentPhase.kind === 'break'
                    ? '현재는 휴식 시간입니다. 다음 발언 단계가 되면 다시 메시지를 보낼 수 있습니다.'
                    : '현재 진행 중인 단계에 맞춰 발언을 이어가 주세요.'}
                </ParticipationHint>
              ) : (
                <ParticipationHint>종료된 토론입니다.</ParticipationHint>
              )}
            </>
          ) : blockedByOtherParticipation ? (
            <ParticipationHint>이미 다른 토론방에 참여 중이라 이 방에서는 관전만 할 수 있습니다.</ParticipationHint>
          ) : availableSides.length > 0 ? (
            <>
              <ParticipationHint>비어 있는 자리가 있어 이 방에 바로 참여할 수 있습니다.</ParticipationHint>
              <ParticipationActions>
                {availableSides.includes('debater1') ? (
                  <ParticipationButton type="button" onClick={() => onJoin('debater1')}>
                    찬성 참여
                  </ParticipationButton>
                ) : null}
                {availableSides.includes('debater2') ? (
                  <ParticipationButton type="button" $secondary onClick={() => onJoin('debater2')}>
                    반대 참여
                  </ParticipationButton>
                ) : null}
              </ParticipationActions>
            </>
          ) : (
            <ParticipationHint>현재는 양쪽 자리가 모두 차 있어 관전자 모드로만 입장할 수 있습니다.</ParticipationHint>
          )}
        </ParticipationPanel>
      </SectionCard>

      <SectionCard>
        <SectionTitleRow>
          <strong>관전자 투표</strong>
          <span>총 {liveVotes.totalVotes.toLocaleString()}표</span>
        </SectionTitleRow>
        <VotePanel>
          <VoteBar>
            <VoteFillRow>
              <VoteFillPrimary $width={liveVotes.debater1Percent} />
              <VoteFillAccent $width={liveVotes.debater2Percent} />
            </VoteFillRow>
          </VoteBar>
          <VoteMetaRow>
            <span>
              {room.debater1.name} {liveVotes.debater1.toLocaleString()}표 ({liveVotes.debater1Percent.toFixed(0)}%)
            </span>
            <span>
              {room.debater2.name} {liveVotes.debater2.toLocaleString()}표 ({liveVotes.debater2Percent.toFixed(0)}%)
            </span>
          </VoteMetaRow>
          <VoteActions>
            <VoteButton type="button" disabled={isParticipant} onClick={() => onSelectVote('debater1')}>
              {selectedVote === 'debater1' ? `${room.debater1.name} 선택됨` : `${room.debater1.name} 투표`}
            </VoteButton>
            <VoteButton type="button" $secondary disabled={isParticipant} onClick={() => onSelectVote('debater2')}>
              {selectedVote === 'debater2' ? `${room.debater2.name} 선택됨` : `${room.debater2.name} 투표`}
            </VoteButton>
          </VoteActions>
          <VoteHint>
            {isParticipant
              ? '토론 참여자는 관전자 투표를 할 수 없습니다.'
              : '관전자는 한쪽만 선택할 수 있으며, 토론 중에는 다른 쪽으로 바꿔 투표할 수 있습니다.'}
          </VoteHint>
        </VotePanel>
      </SectionCard>

      <SectionCard>
        <SectionTitleRow>
          <strong>토론 정보</strong>
        </SectionTitleRow>
        <InfoList>
          <InfoRow>
            <InfoLabel>카테고리</InfoLabel>
            <InfoValue>{room.category}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>참여자 수</InfoLabel>
            <InfoValue>
              {room.reservation.reservedDebaters}/{room.reservation.debaterCapacity}
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>시작 시각</InfoLabel>
            <InfoValue>{formatStartTime(room.startTime)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>토론 순서</InfoLabel>
            <InfoValue>입론 3분 · 휴식 2분 · 반론 30분 · 휴식 2분 · 최종 발언 5분</InfoValue>
          </InfoRow>
        </InfoList>
      </SectionCard>

      <SectionCard>
        <SectionTitleRow>
          <strong>신고</strong>
        </SectionTitleRow>
        <ReportText>부적절한 발언이나 토론 진행 문제가 있으면 관리자에게 바로 신고할 수 있습니다.</ReportText>
        <ReportButtonWrap>
          <ReportButton type="button" disabled={isReported} onClick={onReport}>
            {isReported ? '토론 신고 완료' : '이 토론 신고하기'}
          </ReportButton>
        </ReportButtonWrap>
        {isReported ? <ReportSuccess>신고가 접수되었습니다. 관리자가 내용을 검토할 예정입니다.</ReportSuccess> : null}
      </SectionCard>
    </SideColumn>
  );
}

