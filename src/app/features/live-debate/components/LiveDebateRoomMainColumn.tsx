import type { FormEvent } from 'react';
import type { DebateParticipantSide, DebateProgress } from '../../../data/liveDebateRuntime';
import type { DebateRoom } from '../../../data/liveDebateRooms';
import { useAutoResizeTextarea } from '../../../hooks/useAutoResizeTextarea';
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
  ParticipationHint,
  QuestionActionRow,
  QuestionCard,
  QuestionForm,
  QuestionList,
  QuestionMeta,
  QuestionSubmitButton,
  QuestionText,
  QuestionTextarea,
  SectionCard,
  SectionTitleRow,
  TimeCardHeader,
  TimeCardMeta,
  TimeMetricCard,
  TimeMetricLabel,
  TimeMetricRow,
  TimeMetricValue,
} from './LiveDebateRoomPageContent.styles';
import {
  type AudienceQuestion,
  formatDuration,
  formatMessageTime,
  getComposerPlaceholder,
  getSideLabel,
} from './liveDebateRoomContent.utils';

type LiveDebateRoomMainColumnProps = {
  room: DebateRoom;
  isParticipant: boolean;
  joinedSide: DebateParticipantSide | null;
  currentNickname: string | null;
  debateProgress: DebateProgress | null;
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
  const messageTextareaRef = useAutoResizeTextarea<HTMLTextAreaElement>(messageInput);
  const questionTextareaRef = useAutoResizeTextarea<HTMLTextAreaElement>(questionInput);

  return (
    <MainColumn>
      <SectionCard>
        <TimeCardHeader>
          <strong>토론 시간</strong>
          <TimeCardMeta>자유 토론</TimeCardMeta>
        </TimeCardHeader>
        <TimeMetricRow>
          <TimeMetricCard>
            <TimeMetricLabel>전체 시간</TimeMetricLabel>
            <TimeMetricValue>30:00</TimeMetricValue>
          </TimeMetricCard>
          <TimeMetricCard>
            <TimeMetricLabel>남은 시간</TimeMetricLabel>
            <TimeMetricValue>{debateProgress ? formatDuration(debateProgress.remainingTotalSeconds) : '30:00'}</TimeMetricValue>
          </TimeMetricCard>
        </TimeMetricRow>
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
              ref={messageTextareaRef}
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
          <strong>관전자 의견</strong>
          <span>토론을 보며 의견을 남길 수 있습니다</span>
        </SectionTitleRow>
        {isParticipant ? (
          <ParticipationHint>토론 참여자는 관전자 의견을 직접 작성할 수 없고, 아래 목록만 확인할 수 있습니다.</ParticipationHint>
        ) : (
          <QuestionForm onSubmit={onSubmitQuestion}>
            <QuestionTextarea
              ref={questionTextareaRef}
              maxLength={180}
              placeholder="토론을 보며 남기고 싶은 의견이나 질문을 적어 주세요."
              value={questionInput}
              onChange={event => onChangeQuestionInput(event.target.value)}
            />
            <QuestionActionRow>
              <CharacterCount>{questionInput.length}/180</CharacterCount>
              <QuestionSubmitButton type="submit" disabled={!questionInput.trim()}>
                의견 등록
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
