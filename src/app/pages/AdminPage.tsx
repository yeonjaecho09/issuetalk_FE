import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { getAdminReports, updateAdminReportStatus } from '../data/adminReportData';
import { getCommunityPostsForAdmin, hideCommunityPost, restoreCommunityPost } from '../data/communityData';
import {
  applyRuntimeToRoom,
  forceEndDebateRoom,
  getDebateRoomAdminState,
  toggleDebateRoomChatRestriction,
  toggleDebateRoomPause,
} from '../data/liveDebateRuntime';
import { getLiveDebateRooms } from '../data/liveDebateRooms';
import { useAuth } from '../features/auth/AuthContext';
import { AdminPageContent } from '../features/admin/components/AdminPageContent';

export function AdminPage() {
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

  return (
    <AdminPageContent
      reports={reports}
      posts={posts}
      rooms={rooms}
      roomAdminStates={roomAdminStates}
      onStartReview={reportId => {
        updateAdminReportStatus(reportId, 'reviewing', adminName);
        bumpRefresh();
      }}
      onResolveReport={reportId => {
        updateAdminReportStatus(reportId, 'resolved', adminName);
        bumpRefresh();
      }}
      onDismissReport={reportId => {
        updateAdminReportStatus(reportId, 'dismissed', adminName);
        bumpRefresh();
      }}
      onViewReportContent={targetPath => handleViewPath(targetPath)}
      onViewPost={postId => navigate(`/community/${postId}`)}
      onTogglePostHidden={(postId, isHidden) => {
        if (isHidden) {
          restoreCommunityPost(postId);
        } else {
          hideCommunityPost(postId);
        }

        bumpRefresh();
      }}
      onViewRoom={roomId => navigate(`/live/${roomId}`)}
      onTogglePauseRoom={roomId => {
        toggleDebateRoomPause(roomId);
        bumpRefresh();
      }}
      onToggleChatRestriction={roomId => {
        toggleDebateRoomChatRestriction(roomId);
        bumpRefresh();
      }}
      onForceEndRoom={roomId => {
        const room = rooms.find(candidate => candidate.id === roomId);
        if (!room) return;

        forceEndDebateRoom(room);
        bumpRefresh();
      }}
    />
  );
}
