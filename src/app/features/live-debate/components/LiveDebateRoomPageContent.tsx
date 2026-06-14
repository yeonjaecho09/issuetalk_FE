import { type FormEvent } from 'react';
import { PageContainer, SurfaceCard } from '../../../components/ui/primitives';
import type { DebateParticipantSide, DebateProgress } from '../../../data/liveDebateRuntime';
import type { DebateRoom } from '../../../data/liveDebateRooms';
import {
  BackLink,
  DetailGrid,
  MetricCard,
  MetricLabel,
  MetricValue,
  MetricsGrid,
  NotFoundActions,
  SectionCaption,
  SectionCard,
  SectionTitleRow,
} from './LiveDebateRoomPageContent.styles';
import { LiveDebateRoomHero } from './LiveDebateRoomHero';
import { LiveDebateRoomMainColumn } from './LiveDebateRoomMainColumn';
import { LiveDebateRoomSideColumn } from './LiveDebateRoomSideColumn';
import { type AudienceQuestion, getLiveDebateRoomDerivedState } from './liveDebateRoomContent.utils';

type LiveDebateRoomPageContentProps = {
  room: DebateRoom | null;
  isLoggedIn: boolean;
  isReported: boolean;
  currentNickname: string | null;
  joinedSide: DebateParticipantSide | null;
  availableSides: DebateParticipantSide[];
  blockedByOtherParticipation: boolean;
  debateProgress: DebateProgress | null;
  canStartDebate: boolean;
  canChangeParticipation: boolean;
  currentVote: 'debater1' | 'debater2' | null;
  audienceQuestions: AudienceQuestion[];
  messageInput: string;
  questionInput: string;
  onJoin: (side: DebateParticipantSide) => void;
  onLeave: () => void;
  onSwitchSide: () => void;
  onStartDebate: () => void;
  onSendMessage: (content: string) => void;
  onReport: () => void;
  onSelectVote: (side: 'debater1' | 'debater2') => void;
  onChangeMessageInput: (value: string) => void;
  onChangeQuestionInput: (value: string) => void;
  onSubmitQuestion: (event: FormEvent<HTMLFormElement>) => void;
};

export function LiveDebateRoomPageContent({
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
  currentVote,
  audienceQuestions,
  messageInput,
  questionInput,
  onJoin,
  onLeave,
  onSwitchSide,
  onStartDebate,
  onSendMessage,
  onReport,
  onSelectVote,
  onChangeMessageInput,
  onChangeQuestionInput,
  onSubmitQuestion,
}: LiveDebateRoomPageContentProps) {
  if (!room) {
    return (
      <PageContainer>
        <SurfaceCard>
          <strong>토론방을 찾을 수 없습니다.</strong>
          <NotFoundActions>
            <BackLink to="/live">실시간 토론 목록으로 돌아가기</BackLink>
          </NotFoundActions>
        </SurfaceCard>
      </PageContainer>
    );
  }

  const { timelinePhases, currentStepIndex, liveVotes, latestMessage, isParticipant, canSwitchSide, canCompose } =
    getLiveDebateRoomDerivedState({
      room,
      debateProgress,
      joinedSide,
      availableSides,
      canChangeParticipation,
    });

  const handleMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = messageInput.trim();
    if (!trimmed || !canCompose) return;

    onSendMessage(trimmed);
  };

  return (
    <PageContainer>
      <BackLink to="/live">실시간 토론 목록으로 돌아가기</BackLink>

      <LiveDebateRoomHero room={room} />

      {room.status === 'ended' ? (
        <SectionCard>
          <SectionTitleRow>
            <strong>토론이 종료되었습니다</strong>
            <span>최종 투표 결과가 집계되었습니다</span>
          </SectionTitleRow>
          <SectionCaption>
            종료된 토론은 지난 토론 아카이브로 이동하며, 최종 발언 기록과 승패 결과를 다시 확인할 수 있습니다.
          </SectionCaption>
          <MetricsGrid>
            <MetricCard>
              <MetricLabel>최종 승패</MetricLabel>
              <MetricValue>{liveVotes.winnerLabel}</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>찬성 득표</MetricLabel>
              <MetricValue>
                {liveVotes.debater1}표 ({liveVotes.debater1Percent.toFixed(0)}%)
              </MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>반대 득표</MetricLabel>
              <MetricValue>
                {liveVotes.debater2}표 ({liveVotes.debater2Percent.toFixed(0)}%)
              </MetricValue>
            </MetricCard>
          </MetricsGrid>
          <SectionCaption>
            자세한 결과는 <BackLink to={`/past-debate/${room.id}`}>지난 토론 상세 페이지</BackLink>에서 확인할 수 있습니다.
          </SectionCaption>
        </SectionCard>
      ) : null}

      <DetailGrid>
        <LiveDebateRoomMainColumn
          room={room}
          isParticipant={isParticipant}
          joinedSide={joinedSide}
          currentNickname={currentNickname}
          debateProgress={debateProgress}
          timelinePhases={timelinePhases}
          currentStepIndex={currentStepIndex}
          latestMessage={latestMessage}
          canCompose={canCompose}
          messageInput={messageInput}
          questionInput={questionInput}
          questions={audienceQuestions}
          onChangeMessageInput={onChangeMessageInput}
          onChangeQuestionInput={onChangeQuestionInput}
          onSubmitMessage={handleMessageSubmit}
          onSubmitQuestion={onSubmitQuestion}
        />

        <LiveDebateRoomSideColumn
          room={room}
          isLoggedIn={isLoggedIn}
          isReported={isReported}
          currentNickname={currentNickname}
          joinedSide={joinedSide}
          availableSides={availableSides}
          blockedByOtherParticipation={blockedByOtherParticipation}
          debateProgress={debateProgress}
          canStartDebate={canStartDebate}
          canChangeParticipation={canChangeParticipation}
          canSwitchSide={canSwitchSide}
          isParticipant={isParticipant}
          selectedVote={currentVote}
          liveVotes={liveVotes}
          onJoin={onJoin}
          onLeave={onLeave}
          onSwitchSide={onSwitchSide}
          onStartDebate={onStartDebate}
          onSelectVote={onSelectVote}
          onReport={onReport}
        />
      </DetailGrid>
    </PageContainer>
  );
}

