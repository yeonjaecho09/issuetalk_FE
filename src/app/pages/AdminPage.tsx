import { AdminPageContent } from '../features/admin/components/AdminPageContent';
import { useAdminPage } from '../features/admin/hooks/useAdminPage';

export function AdminPage() {
  const {
    reports,
    posts,
    rooms,
    roomAdminStates,
    handleStartReview,
    handleResolveReport,
    handleDismissReport,
    handleViewReportContent,
    handleViewPost,
    handleTogglePostHidden,
    handleViewRoom,
    handleTogglePauseRoom,
    handleToggleChatRestriction,
    handleForceEndRoom,
  } = useAdminPage();

  return (
    <AdminPageContent
      reports={reports}
      posts={posts}
      rooms={rooms}
      roomAdminStates={roomAdminStates}
      onStartReview={handleStartReview}
      onResolveReport={handleResolveReport}
      onDismissReport={handleDismissReport}
      onViewReportContent={handleViewReportContent}
      onViewPost={handleViewPost}
      onTogglePostHidden={handleTogglePostHidden}
      onViewRoom={handleViewRoom}
      onTogglePauseRoom={handleTogglePauseRoom}
      onToggleChatRestriction={handleToggleChatRestriction}
      onForceEndRoom={handleForceEndRoom}
    />
  );
}
