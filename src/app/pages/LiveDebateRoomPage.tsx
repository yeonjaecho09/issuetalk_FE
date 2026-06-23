import { LiveDebateRoomPageContent } from '../features/live-debate/components/LiveDebateRoomPageContent';
import { useLiveDebateRoomPage } from '../features/live-debate/hooks/useLiveDebateRoomPage';

export function LiveDebateRoomPage() {
  const {
    displayRoom,
    displayJoinedSide,
    displayAvailableSides,
    displayCanChangeParticipation,
    displayCanStartDebate,
    displayDebateProgress,
    isLoggedIn,
    isReported,
    currentNickname,
    blockedByOtherParticipation,
    currentVote,
    audienceQuestions,
    messageInput,
    questionInput,
    handleJoin,
    handleLeave,
    handleSwitchSide,
    handleStart,
    handleSendMessage,
    handleReport,
    handleSelectVote,
    handleChangeMessageInput,
    handleChangeQuestionInput,
    handleSubmitAudienceQuestion,
  } = useLiveDebateRoomPage();

  return (
    <LiveDebateRoomPageContent
      room={displayRoom}
      isLoggedIn={isLoggedIn}
      isReported={isReported}
      currentNickname={currentNickname}
      joinedSide={displayJoinedSide}
      availableSides={displayAvailableSides}
      blockedByOtherParticipation={blockedByOtherParticipation}
      debateProgress={displayDebateProgress}
      canStartDebate={displayCanStartDebate}
      canChangeParticipation={displayCanChangeParticipation}
      currentVote={currentVote}
      audienceQuestions={audienceQuestions}
      messageInput={messageInput}
      questionInput={questionInput}
      onJoin={handleJoin}
      onLeave={handleLeave}
      onSwitchSide={handleSwitchSide}
      onStartDebate={handleStart}
      onSendMessage={handleSendMessage}
      onReport={handleReport}
      onSelectVote={handleSelectVote}
      onChangeMessageInput={handleChangeMessageInput}
      onChangeQuestionInput={handleChangeQuestionInput}
      onSubmitQuestion={handleSubmitAudienceQuestion}
    />
  );
}
