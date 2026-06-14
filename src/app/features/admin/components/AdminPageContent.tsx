import { useEffect, useMemo, useState } from 'react';
import { PageContainer } from '../../../components/ui/primitives';
import type { CommunityPostPreview } from '../../../data/communityData';
import type { DebateRoomAdminState } from '../../../data/liveDebateRuntime';
import type { DebateRoom } from '../../../data/liveDebateRooms';
import type { ReportItem } from '../../../data/reportData';
import { AdminDescription, AdminHero, AdminStack, AdminTitle } from './AdminPageContent.styles';
import { AdminPostsSection } from './AdminPostsSection';
import { AdminReportsSection } from './AdminReportsSection';
import { AdminRoomsSection } from './AdminRoomsSection';
import { getPagedItems, getTotalPages, POSTS_PER_PAGE, REPORTS_PER_PAGE, ROOMS_PER_PAGE } from './adminPageContent.utils';

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
  const [reportPage, setReportPage] = useState(1);
  const [postPage, setPostPage] = useState(1);
  const [roomPage, setRoomPage] = useState(1);

  const reportTotalPages = getTotalPages(reports.length, REPORTS_PER_PAGE);
  const postTotalPages = getTotalPages(posts.length, POSTS_PER_PAGE);
  const roomTotalPages = getTotalPages(rooms.length, ROOMS_PER_PAGE);

  useEffect(() => {
    setReportPage(current => Math.min(current, reportTotalPages));
  }, [reportTotalPages]);

  useEffect(() => {
    setPostPage(current => Math.min(current, postTotalPages));
  }, [postTotalPages]);

  useEffect(() => {
    setRoomPage(current => Math.min(current, roomTotalPages));
  }, [roomTotalPages]);

  const visibleReports = useMemo(() => getPagedItems(reports, reportPage, REPORTS_PER_PAGE), [reports, reportPage]);
  const visiblePosts = useMemo(() => getPagedItems(posts, postPage, POSTS_PER_PAGE), [posts, postPage]);
  const visibleRooms = useMemo(() => getPagedItems(rooms, roomPage, ROOMS_PER_PAGE), [rooms, roomPage]);

  return (
    <PageContainer>
      <AdminHero>
        <div>관리자 콘솔</div>
        <AdminTitle>관리자 운영 페이지</AdminTitle>
        <AdminDescription>
          신고 확인과 처리, 게시물 운영, 토론방 제어를 한 화면에서 관리하는 관리자 전용 페이지입니다.
        </AdminDescription>
      </AdminHero>

      <AdminStack>
        <AdminReportsSection
          reports={visibleReports}
          currentPage={reportPage}
          totalItems={reports.length}
          onChangePage={setReportPage}
          onStartReview={onStartReview}
          onResolveReport={onResolveReport}
          onDismissReport={onDismissReport}
          onViewReportContent={onViewReportContent}
        />

        <AdminPostsSection
          posts={visiblePosts}
          currentPage={postPage}
          totalItems={posts.length}
          onChangePage={setPostPage}
          onViewPost={onViewPost}
          onTogglePostHidden={onTogglePostHidden}
        />

        <AdminRoomsSection
          rooms={visibleRooms}
          roomAdminStates={roomAdminStates}
          currentPage={roomPage}
          totalItems={rooms.length}
          onChangePage={setRoomPage}
          onViewRoom={onViewRoom}
          onTogglePauseRoom={onTogglePauseRoom}
          onToggleChatRestriction={onToggleChatRestriction}
          onForceEndRoom={onForceEndRoom}
        />
      </AdminStack>
    </PageContainer>
  );
}
