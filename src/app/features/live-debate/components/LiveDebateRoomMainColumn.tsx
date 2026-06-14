import type { FormEvent } from 'react';
import type { DebateParticipantSide, DebateProgress } from '../../../data/liveDebateRuntime';
import type { DebateRoom } from '../../../data/liveDebateRooms';
import {
  CharacterCount,
  ComposerButton,
  ComposerFooter,
  ComposerForm,
  ComposerTextarea,
  MainColumn,
  MessageCard,
  MessageHeader,
  MessageList,
  MessageRow,
  MessageSpeaker,
  MessageSpeakerMeta,
  MessageText,
  MessageTimestamp,
  MetricCard,
  MetricLabel,
  MetricValue,
  MetricsGrid,
  ParticipationHint,
  QuestionActionRow,
  QuestionCard,
  QuestionForm,
  QuestionList,
  QuestionMeta,
  QuestionSubmitButton,
  QuestionText,
  QuestionTextarea,
  SectionCaption,
  SectionCard,
  SectionTitleRow,
  TimelineItem,
  TimelineList,
  TimelineText,
  TimelineTitle,
} from './LiveDebateRoomPageContent.styles';
import {
  type AudienceQuestion,
  formatDuration,
  formatMessageTime,
  getComposerPlaceholder,
  getSessionStatusText,
  getSideLabel,
  getTimelineDescription,
} from './liveDebateRoomContent.utils';

type LiveDebateRoomMainColumnProps = {
  room: DebateRoom;
  isParticipant: boolean;
  joinedSide: DebateParticipantSide | null;
  currentNickname: string | null;
  debateProgress: DebateProgress | null;
  timelinePhases: DebateProgress['phases'];
  currentStepIndex: number;
  latestMessage: DebateRoom['messages'][number] | null;
  canCompose: boolean;
  messageInput: string;
  questionInput: string;
  questions: AudienceQuestion[];
  onChangeMessageInput: (value: string) => void;
  onChangeQuestionInput: (value: string) => void;
  onSubmitMessage: (event: FormEvent<HTMLFormElement>) => void;
  onSubmitQuestion: (event: FormEvent<HTMLFormElement>) => void;
};

export function LiveDebateRoomMainColumn({
  room,
  isParticipant,
  joinedSide,
  currentNickname,
  debateProgress,
  timelinePhases,
  currentStepIndex,
  latestMessage,
  canCompose,
  messageInput,
  questionInput,
  questions,
  onChangeMessageInput,
  onChangeQuestionInput,
  onSubmitMessage,
  onSubmitQuestion,
}: LiveDebateRoomMainColumnProps) {
  return (
    <MainColumn>
      <SectionCard>
        <SectionTitleRow>
          <strong>토론 진행 현황</strong>
          <span>{getSessionStatusText(room, debateProgress)}</span>
        </SectionTitleRow>
        <SectionCaption>
          입론 3분, 휴식 2분, 반론 및 재반론 30분, 휴식 2분, 최종 발언 5분 순서로 진행됩니다.
        </SectionCaption>
        <MetricsGrid>
          <MetricCard>
            <MetricLabel>현재 단계</MetricLabel>
            <MetricValue>{debateProgress?.currentPhase.label ?? '시작 전'}</MetricValue>
          </MetricCard>
          <MetricCard>
            <MetricLabel>현재 단계 남은 시간</MetricLabel>
            <MetricValue>{debateProgress ? formatDuration(debateProgress.remainingPhaseSeconds) : '3:00'}</MetricValue>
          </MetricCard>
          <MetricCard>
            <MetricLabel>전체 남은 시간</MetricLabel>
            <MetricValue>{debateProgress ? formatDuration(debateProgress.remainingTotalSeconds) : '42:00'}</MetricValue>
          </MetricCard>
        </MetricsGrid>
        <TimelineList>
          {timelinePhases.map((step, index) => (
            <TimelineItem key={step.key} $active={index === currentStepIndex && room.status !== 'ended'}>
              <TimelineTitle>
                {step.label} · {Math.floor(step.durationSeconds / 60)}분
              </TimelineTitle>
              <TimelineText>{getTimelineDescription(debateProgress, index)}</TimelineText>
            </TimelineItem>
          ))}
        </TimelineList>
      </SectionCard>

      <SectionCard>
        <SectionTitleRow>
          <strong>토론 채팅 기록</strong>
          <span>{room.messages.length}개의 발언</span>
        </SectionTitleRow>
        <MessageList>
          {room.messages.length > 0 ? (
            room.messages.map(message => {
              const isDebater1 = message.debaterId === room.debater1.id;
              const align = isDebater1 ? 'left' : 'right';
              const speakerName = isDebater1 ? room.debater1.name : room.debater2.name;
              const side = isDebater1 ? 'pro' : 'con';
              const sideLabel = isDebater1 ? '찬성' : '반대';

              return (
                <MessageRow key={message.id} $align={align}>
                  <MessageCard $align={align} $side={side} $isCurrent={message.id === latestMessage?.id}>
                    <MessageHeader>
                      <MessageSpeaker>
                        <MessageSpeakerMeta $side={side}>
                          {sideLabel} · {speakerName}
                        </MessageSpeakerMeta>
                      </MessageSpeaker>
                      <MessageTimestamp>{formatMessageTime(message.timestamp)}</MessageTimestamp>
                    </MessageHeader>
                    <MessageText>{message.content}</MessageText>
                  </MessageCard>
                </MessageRow>
              );
            })
          ) : (
            <MessageRow $align="left">
              <MessageCard $align="left" $side="pro">
                <MessageText>아직 등록된 발언이 없습니다. 토론이 시작되면 이 영역에서 실시간 흐름을 볼 수 있습니다.</MessageText>
              </MessageCard>
            </MessageRow>
          )}
        </MessageList>
      </SectionCard>

      {joinedSide ? (
        <SectionCard>
          <SectionTitleRow>
            <strong>토론 발언 입력</strong>
            <span>
              {getSideLabel(joinedSide)} · {currentNickname ?? '참여자'}
            </span>
          </SectionTitleRow>
          <ComposerForm onSubmit={onSubmitMessage}>
            <ComposerTextarea
              maxLength={240}
              placeholder={getComposerPlaceholder(room, debateProgress)}
              value={messageInput}
              disabled={!canCompose}
              onChange={event => onChangeMessageInput(event.target.value)}
            />
            <ComposerFooter>
              <CharacterCount>{messageInput.length}/240</CharacterCount>
              <ComposerButton type="submit" disabled={!canCompose || !messageInput.trim()}>
                발언 등록
              </ComposerButton>
            </ComposerFooter>
          </ComposerForm>
        </SectionCard>
      ) : null}

      <SectionCard>
        <SectionTitleRow>
          <strong>관전자 댓글</strong>
          <span>토론을 보며 의견을 남길 수 있습니다</span>
        </SectionTitleRow>
        {isParticipant ? (
          <ParticipationHint>토론 참여자는 관전자 댓글을 직접 작성할 수 없고, 아래 목록만 확인할 수 있습니다.</ParticipationHint>
        ) : (
          <QuestionForm onSubmit={onSubmitQuestion}>
            <QuestionTextarea
              maxLength={180}
              placeholder="토론을 보며 남기고 싶은 의견이나 질문을 적어 주세요."
              value={questionInput}
              onChange={event => onChangeQuestionInput(event.target.value)}
            />
            <QuestionActionRow>
              <CharacterCount>{questionInput.length}/180</CharacterCount>
              <QuestionSubmitButton type="submit" disabled={!questionInput.trim()}>
                댓글 등록
              </QuestionSubmitButton>
            </QuestionActionRow>
          </QuestionForm>
        )}
        <QuestionList>
          {questions.map(question => (
            <QuestionCard key={question.id}>
              <QuestionMeta>
                {question.author} · {question.createdLabel}
              </QuestionMeta>
              <QuestionText>{question.text}</QuestionText>
            </QuestionCard>
          ))}
        </QuestionList>
      </SectionCard>
    </MainColumn>
  );
}

