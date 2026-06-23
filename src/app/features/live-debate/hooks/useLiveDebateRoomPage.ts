import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { useBeforeUnload, useBlocker, useParams } from 'react-router';
import {
  abandonLiveDebateParticipant,
  addAudienceQuestion,
  appendDebateMessage,
  applyRuntimeToRoom,
  canStartDebate,
  finalizeEndedDebateRoom,
  getAudienceQuestions,
  getAudienceVote,
  getAvailableSides,
  getDebateProgress,
  getJoinedSide,
  getParticipantRoomId,
  joinDebateAsParticipant,
  leaveDebateParticipant,
  setAudienceVote,
  startDebate,
  switchDebateSide,
  type DebateParticipantSide,
} from '../../../data/liveDebateRuntime';
import { getDebateRoomById, getLiveDebateRooms, type DebateRoom } from '../../../data/liveDebateRooms';
import { createAdminReport, hasActiveReport } from '../../../data/adminReportData';
import { getViewerActorId } from '../../../data/viewerIdentity';
import { useAuth } from '../../auth/useAuth';
import { useLiveDebateStorageVersion } from './useLiveDebateStorageVersion';

const LEAVE_WARNING_MESSAGE = '현재 진행 중인 토론에서 나가면 토론이 중단될 수 있습니다. 정말 이동할까요?';

export function useLiveDebateRoomPage() {
  const { roomId = '' } = useParams();
  const { currentUser, isLoggedIn } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [clockTick, setClockTick] = useState(0);
  const [endedSnapshot, setEndedSnapshot] = useState<DebateRoom | null>(null);
  const [questionInput, setQuestionInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const hasAbandonedRef = useRef(false);
  const hasFinalizedEndRef = useRef(false);
  const actorId = getViewerActorId(currentUser);
  const storageVersion = useLiveDebateStorageVersion();

  const runtimeRooms = useMemo(() => getLiveDebateRooms().map(room => applyRuntimeToRoom(room)), [refreshKey, storageVersion]);
  const participantRoomId = useMemo(
    () => (currentUser ? getParticipantRoomId(runtimeRooms, currentUser.userId) : null),
    [runtimeRooms, currentUser],
  );

  const baseRoom = getDebateRoomById(roomId);
  const room = useMemo(() => (baseRoom ? applyRuntimeToRoom(baseRoom) : null), [baseRoom, refreshKey, storageVersion]);
  const joinedSide = useMemo(
    () => (room && currentUser ? getJoinedSide(room.id, currentUser.userId) : null),
    [room, currentUser, refreshKey, storageVersion],
  );
  const availableSides = useMemo(() => (room ? getAvailableSides(room) : []), [room, refreshKey, storageVersion]);
  const debateProgress = useMemo(() => (room ? getDebateProgress(room) : null), [room, clockTick]);
  const audienceQuestions = useMemo(() => (room ? getAudienceQuestions(room.id) : []), [room, refreshKey, storageVersion]);
  const currentVote = useMemo(() => (room ? getAudienceVote(room.id, actorId) : null), [room, actorId, refreshKey, storageVersion]);
  const readyToStart = room ? canStartDebate(room) : false;
  const canChangeParticipation = room?.status === 'scheduled';
  const shouldWarnBeforeLeave = Boolean(room?.status === 'live' && joinedSide);
  const blockedByOtherParticipation = Boolean(participantRoomId && room && participantRoomId !== room.id);
  const reporterName = currentUser?.nickname ?? currentUser?.name ?? '게스트';
  const isReported = useMemo(() => hasActiveReport('live-room', `/live/${roomId}`, reporterName), [roomId, reporterName, refreshKey]);

  useEffect(() => {
    if (!debateProgress || debateProgress.status === 'ended') return undefined;

    const timer = window.setInterval(() => {
      setClockTick(value => value + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [debateProgress?.startedAt, debateProgress?.pausedAt, debateProgress?.status]);

  const bumpRefresh = () => setRefreshKey(value => value + 1);

  useEffect(() => {
    if (!room || debateProgress?.status !== 'ended' || hasFinalizedEndRef.current) return;

    hasFinalizedEndRef.current = true;
    setEndedSnapshot(room);
    finalizeEndedDebateRoom(room);
    bumpRefresh();
  }, [room, debateProgress?.status]);

  const abandonCurrentLiveParticipation = () => {
    if (!room || !currentUser || hasAbandonedRef.current || room.status !== 'live' || !joinedSide) return;
    abandonLiveDebateParticipant(room, currentUser.userId);
    hasAbandonedRef.current = true;
  };

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (!shouldWarnBeforeLeave) return false;
    return currentLocation.pathname !== nextLocation.pathname;
  });

  useEffect(() => {
    if (blocker.state !== 'blocked') return;

    const shouldLeave = window.confirm(LEAVE_WARNING_MESSAGE);
    if (shouldLeave) {
      abandonCurrentLiveParticipation();
      blocker.proceed();
    } else {
      blocker.reset();
    }
  }, [blocker]);

  useBeforeUnload(event => {
    if (!shouldWarnBeforeLeave) return;
    event.preventDefault();
    event.returnValue = LEAVE_WARNING_MESSAGE;
  });

  const handleJoin = (side: DebateParticipantSide) => {
    if (!room || !currentUser || blockedByOtherParticipation) return;
    joinDebateAsParticipant(room, side, currentUser);
    hasAbandonedRef.current = false;
    bumpRefresh();
  };

  const handleLeave = () => {
    if (!room || !currentUser) return;
    leaveDebateParticipant(room, currentUser.userId);
    bumpRefresh();
  };

  const handleSwitchSide = () => {
    if (!room || !currentUser) return;
    switchDebateSide(room, currentUser.userId);
    bumpRefresh();
  };

  const handleStart = () => {
    if (!room) return;
    startDebate(room.id);
    hasAbandonedRef.current = false;
    bumpRefresh();
  };

  const handleSendMessage = (content: string) => {
    if (!room || !joinedSide) return;
    appendDebateMessage(room, joinedSide, content);
    setMessageInput('');
    bumpRefresh();
  };

  const handleSubmitAudienceQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!room || !questionInput.trim()) return;

    addAudienceQuestion(room.id, actorId, reporterName, questionInput);
    setQuestionInput('');
    bumpRefresh();
  };

  const handleSelectVote = (side: 'debater1' | 'debater2') => {
    if (!room || joinedSide) return;
    setAudienceVote(room.id, actorId, side);
    bumpRefresh();
  };

  const handleReport = () => {
    if (!room || isReported) return;

    createAdminReport({
      targetType: 'live-room',
      targetTitle: room.title,
      targetPath: `/live/${room.id}`,
      reason: '사용자 신고',
      description: '토론 관전 또는 참여 페이지에서 접수된 토론 신고입니다.',
      reporter: reporterName,
      priority: 'medium',
    });
    bumpRefresh();
  };

  const displayRoom = endedSnapshot ?? room;
  const displayJoinedSide = endedSnapshot ? null : joinedSide;
  const displayAvailableSides = endedSnapshot ? [] : availableSides;
  const displayCanChangeParticipation = endedSnapshot ? false : Boolean(canChangeParticipation);
  const displayCanStartDebate = endedSnapshot ? false : readyToStart;
  const displayDebateProgress = endedSnapshot ? getDebateProgress(endedSnapshot) : debateProgress;

  return {
    displayRoom,
    displayJoinedSide,
    displayAvailableSides,
    displayCanChangeParticipation,
    displayCanStartDebate,
    displayDebateProgress,
    isLoggedIn,
    isReported,
    currentNickname: currentUser?.nickname ?? null,
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
    handleChangeMessageInput: setMessageInput,
    handleChangeQuestionInput: setQuestionInput,
    handleSubmitAudienceQuestion,
  };
}
