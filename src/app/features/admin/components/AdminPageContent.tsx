import { PageContainer } from '../../../components/ui/primitives';
import type { CommunityPostPreview } from '../../../data/communityData';
import type { DebateRoomAdminState } from '../../../data/liveDebateRuntime';
import type { DebateRoom } from '../../../data/liveDebateRooms';
import type { ReportItem } from '../../../data/reportData';
import { useAdminSectionPagination } from '../hooks/useAdminSectionPagination';
import { AdminDescription, AdminHero, AdminStack, AdminTitle } from './AdminPageContent.styles';
import { AdminPostsSection } from './AdminPostsSection';
import { AdminReportsSection } from './AdminReportsSection';
import { AdminRoomsSection } from './AdminRoomsSection';
import { POSTS_PER_PAGE, REPORTS_PER_PAGE, ROOMS_PER_PAGE } from './adminPageContent.utils';

type AdminPageContentProps = {
  reports: ReportItem[];
  posts: CommunityPostPreview[];
  rooms: DebateRoom[];
  roomAdminStates: Record<string, DebateRoomAdminState>;
  onStartReview: (reportId: string) => void;
  onResolveReport: (reportId: string) => void;
  onDismissReport: (reportId: string) => void;
  onViewReportContent: (targetPath?: string) => void;
  onViewPost: (postId: string) => void;
  onTogglePostHidden: (postId: string, isHidden: boolean) => void;
  onViewRoom: (roomId: string) => void;
  onTogglePauseRoom: (roomId: string) => void;
  onToggleChatRestriction: (roomId: string) => void;
  onForceEndRoom: (roomId: string) => void;
};

export function AdminPageContent({
  reports,
  posts,
  rooms,
  roomAdminStates,
  onStartReview,
  onResolveReport,
  onDismissReport,
  onViewReportContent,
  onViewPost,
  onTogglePostHidden,
  onViewRoom,
  onTogglePauseRoom,
  onToggleChatRestriction,
  onForceEndRoom,
}: AdminPageContentProps) {
  const reportsPagination = useAdminSectionPagination(reports, REPORTS_PER_PAGE);
  const postsPagination = useAdminSectionPagination(posts, POSTS_PER_PAGE);
  const roomsPagination = useAdminSectionPagination(rooms, ROOMS_PER_PAGE);

  return (
    <PageContainer>
      <AdminHero>
        <div>관리자 콘솔</div>
        <AdminTitle>관리자 운영 페이지</AdminTitle>
        <AdminDescription>신고 확인과 처리, 게시물 운영, 토론방 제어를 한 화면에서 관리하는 관리자 전용 페이지입니다.</AdminDescription>
      </AdminHero>

      <AdminStack>
        <AdminReportsSection
          reports={reportsPagination.visibleItems}
          currentPage={reportsPagination.currentPage}
          totalItems={reports.length}
          onChangePage={reportsPagination.handlePageChange}
          onStartReview={onStartReview}
          onResolveReport={onResolveReport}
          onDismissReport={onDismissReport}
          onViewReportContent={onViewReportContent}
        />

        <AdminPostsSection
          posts={postsPagination.visibleItems}
          currentPage={postsPagination.currentPage}
          totalItems={posts.length}
          onChangePage={postsPagination.handlePageChange}
          onViewPost={onViewPost}
          onTogglePostHidden={onTogglePostHidden}
        />

        <AdminRoomsSection
          rooms={roomsPagination.visibleItems}
          roomAdminStates={roomAdminStates}
          currentPage={roomsPagination.currentPage}
          totalItems={rooms.length}
          onChangePage={roomsPagination.handlePageChange}
          onViewRoom={onViewRoom}
          onTogglePauseRoom={onTogglePauseRoom}
          onToggleChatRestriction={onToggleChatRestriction}
          onForceEndRoom={onForceEndRoom}
        />
      </AdminStack>
    </PageContainer>
  );
}

