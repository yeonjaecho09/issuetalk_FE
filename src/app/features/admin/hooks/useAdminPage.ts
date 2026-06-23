import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { getAdminReports, updateAdminReportStatus } from '../../../data/adminReportData';
import { getCommunityPostsForAdmin, hideCommunityPost, restoreCommunityPost } from '../../../data/communityData';
import {
  applyRuntimeToRoom,
  forceEndDebateRoom,
  getDebateRoomAdminState,
  toggleDebateRoomChatRestriction,
  toggleDebateRoomPause,
} from '../../../data/liveDebateRuntime';
import { getLiveDebateRooms } from '../../../data/liveDebateRooms';
import { useAuth } from '../../auth/useAuth';

export function useAdminPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const reports = useMemo(
    () => getAdminReports().filter(report => report.status === 'new' || report.status === 'reviewing'),
    [refreshKey],
  );
  const posts = useMemo(() => getCommunityPostsForAdmin(), [refreshKey]);
  const rooms = useMemo(() => getLiveDebateRooms().map(room => applyRuntimeToRoom(room)), [refreshKey]);
  const roomAdminStates = useMemo(
    () => Object.fromEntries(rooms.map(room => [room.id, getDebateRoomAdminState(room.id)])),
    [rooms, refreshKey],
  );

  const adminName = currentUser?.nickname ?? currentUser?.name ?? '관리자';
  const bumpRefresh = () => setRefreshKey(value => value + 1);

  const handleViewPath = (targetPath?: string) => {
    if (!targetPath) {
      window.alert('연결된 상세 페이지가 아직 없습니다.');
      return;
    }

    navigate(targetPath);
  };

  const handleStartReview = (reportId: string) => {
    updateAdminReportStatus(reportId, 'reviewing', adminName);
    bumpRefresh();
  };

  const handleResolveReport = (reportId: string) => {
    updateAdminReportStatus(reportId, 'resolved', adminName);
    bumpRefresh();
  };

  const handleDismissReport = (reportId: string) => {
    updateAdminReportStatus(reportId, 'dismissed', adminName);
    bumpRefresh();
  };

  const handleTogglePostHidden = (postId: string, isHidden: boolean) => {
    if (isHidden) {
      restoreCommunityPost(postId);
    } else {
      hideCommunityPost(postId);
    }

    bumpRefresh();
  };

  const handleTogglePauseRoom = (roomId: string) => {
    toggleDebateRoomPause(roomId);
    bumpRefresh();
  };

  const handleToggleChatRestriction = (roomId: string) => {
    toggleDebateRoomChatRestriction(roomId);
    bumpRefresh();
  };

  const handleForceEndRoom = (roomId: string) => {
    const room = rooms.find(candidate => candidate.id === roomId);
    if (!room) return;

    forceEndDebateRoom(room);
    bumpRefresh();
  };

  return {
    reports,
    posts,
    rooms,
    roomAdminStates,
    handleStartReview,
    handleResolveReport,
    handleDismissReport,
    handleViewReportContent: handleViewPath,
    handleViewPost: (postId: string) => navigate(`/community/${postId}`),
    handleTogglePostHidden,
    handleViewRoom: (roomId: string) => navigate(`/live/${roomId}`),
    handleTogglePauseRoom,
    handleToggleChatRestriction,
    handleForceEndRoom,
  };
}
