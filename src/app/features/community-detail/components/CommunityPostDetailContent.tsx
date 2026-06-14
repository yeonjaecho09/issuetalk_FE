import { PageContainer, SurfaceCard } from '../../../components/ui/primitives';
import type { CommunityComment, CommunityPostPreview } from '../../../data/communityData';
import { CommunityRichText } from '../../community/components/CommunityRichText';
import {
  ActionButton,
  ActionRow,
  BackLink,
  CommentCard,
  CommentList,
  CommentTextarea,
  CommentText,
  DetailBody,
  DetailCard,
  DetailMeta,
  DetailTitle,
  FormGrid,
  NotFoundActions,
  SectionStack,
  SubmitButton,
} from './CommunityPostDetailContent.styles';

type CommunityPostDetailContentProps = {
  post: CommunityPostPreview | null;
  isReported: boolean;
  isLiked: boolean;
  commentBody: string;
  comments: CommunityComment[];
  onChangeComment: (value: string) => void;
  onSubmitComment: (event: React.FormEvent) => void;
  onReport: () => void;
  onToggleLike: () => void;
};

export function CommunityPostDetailContent({
  post,
  isReported,
  isLiked,
  commentBody,
  comments,
  onChangeComment,
  onSubmitComment,
  onReport,
  onToggleLike,
}: CommunityPostDetailContentProps) {
  if (!post) {
    return (
      <PageContainer>
        <SurfaceCard>
          <strong>게시글을 찾을 수 없습니다.</strong>
          <NotFoundActions>
            <BackLink to="/community">커뮤니티로 돌아가기</BackLink>
          </NotFoundActions>
        </SurfaceCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackLink to="/community">커뮤니티로 돌아가기</BackLink>
      <DetailCard>
        <div>{post.category}</div>
        <DetailTitle>{post.title}</DetailTitle>
        <DetailMeta>
          {post.author} · 좋아요 {post.likes} · 댓글 {post.comments} · 조회수 {post.views}
        </DetailMeta>
        <DetailBody>
          <CommunityRichText content={post.body} />
        </DetailBody>
      </DetailCard>

      <SectionStack>
        <SurfaceCard>
          <strong>게시글 액션</strong>
          <ActionRow>
            <ActionButton type="button" onClick={onToggleLike}>
              {isLiked ? '♥ 좋아요 취소' : '♥ 좋아요'}
            </ActionButton>
            <ActionButton type="button" onClick={onReport} disabled={isReported}>
              {isReported ? '⚑ 신고 접수 완료' : '⚑ 게시글 신고'}
            </ActionButton>
          </ActionRow>
        </SurfaceCard>

        <SurfaceCard>
          <strong>댓글 작성</strong>
          <FormGrid onSubmit={onSubmitComment}>
            <CommentTextarea value={commentBody} onChange={event => onChangeComment(event.target.value)} placeholder="댓글을 입력해 주세요." />
            <div>
              <SubmitButton type="submit">댓글 등록</SubmitButton>
            </div>
          </FormGrid>
        </SurfaceCard>

        <SurfaceCard>
          <strong>댓글 목록</strong>
          <CommentList>
            {comments.length === 0 ? <div>아직 작성된 댓글이 없습니다.</div> : null}
            {comments.map(comment => (
              <CommentCard key={comment.id}>
                <div>{comment.author}</div>
                <CommentText>{comment.body}</CommentText>
              </CommentCard>
            ))}
          </CommentList>
        </SurfaceCard>
      </SectionStack>
    </PageContainer>
  );
}

