import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import {
  addCommunityComment,
  getCommunityComments,
  getCommunityPostById,
  hasLikedCommunityPost,
  incrementCommunityPostView,
  toggleCommunityPostLike,
} from '../data/communityData';
import { getViewerActorId } from '../data/viewerIdentity';
import { createAdminReport, hasActiveReport } from '../data/adminReportData';
import { useAuth } from '../features/auth/useAuth';
import { CommunityPostDetailContent } from '../features/community-detail/components/CommunityPostDetailContent';

export function CommunityPostDetailPage() {
  const { id = '' } = useParams();
  const { currentUser } = useAuth();
  const [commentBody, setCommentBody] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const actorId = getViewerActorId(currentUser);
  const reporterName = currentUser?.nickname ?? currentUser?.name ?? '게스트';
  const post = useMemo(() => getCommunityPostById(id), [id, refreshKey]);
  const comments = useMemo(() => getCommunityComments(id), [id, refreshKey]);
  const isReported = useMemo(() => hasActiveReport('community-post', `/community/${id}`, reporterName), [id, reporterName, refreshKey]);
  const isLiked = useMemo(() => hasLikedCommunityPost(id, actorId), [id, actorId, refreshKey]);

  const bumpRefresh = () => setRefreshKey(current => current + 1);

  useEffect(() => {
    if (!id) return;

    const didIncrement = incrementCommunityPostView(id, actorId);
    if (didIncrement) {
      bumpRefresh();
    }
  }, [id, actorId]);

  const submitComment = (event: React.FormEvent) => {
    event.preventDefault();
    if (!commentBody.trim() || !post) return;

    addCommunityComment(post.id, {
      author: reporterName,
      body: commentBody,
    });
    setCommentBody('');
    bumpRefresh();
  };

  const handleReport = () => {
    if (!post || isReported) return;

    createAdminReport({
      targetType: 'community-post',
      targetTitle: post.title,
      targetPath: `/community/${post.id}`,
      reason: '사용자 신고',
      description: '커뮤니티 상세 페이지에서 접수된 게시글 신고입니다.',
      reporter: reporterName,
      priority: 'medium',
    });
    bumpRefresh();
  };

  const handleToggleLike = () => {
    if (!post) return;
    toggleCommunityPostLike(post.id, actorId);
    bumpRefresh();
  };

  return (
    <CommunityPostDetailContent
      post={post ?? null}
      isReported={isReported}
      isLiked={isLiked}
      commentBody={commentBody}
      comments={comments}
      onChangeComment={setCommentBody}
      onSubmitComment={submitComment}
      onReport={handleReport}
      onToggleLike={handleToggleLike}
    />
  );
}
