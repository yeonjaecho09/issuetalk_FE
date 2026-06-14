import { PageContainer, SurfaceCard } from '../../../components/ui/primitives';
import type { Post } from '../../../types';
import {
  BackLink,
  CommentCard,
  CommentForm,
  CommentList,
  CommentText,
  CommentTextarea,
  DetailBody,
  DetailCard,
  DetailMeta,
  DetailTitle,
  NotFoundActions,
  SectionCard,
  SubmitButton,
} from './PostDetailContent.styles';

type PostComment = {
  id: string;
  author: {
    name: string;
  };
  content: string;
};

type PostDetailContentProps = {
  post: Post | null;
  comments: PostComment[];
  commentBody: string;
  onChangeComment: (value: string) => void;
  onSubmitComment: (event: React.FormEvent) => void;
};

export function PostDetailContent({
  post,
  comments,
  commentBody,
  onChangeComment,
  onSubmitComment,
}: PostDetailContentProps) {
  if (!post) {
    return (
      <PageContainer>
        <SurfaceCard>
          <strong>게시글을 찾을 수 없습니다.</strong>
          <NotFoundActions>
            <BackLink to="/">메인으로 돌아가기</BackLink>
          </NotFoundActions>
        </SurfaceCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackLink to="/">메인으로 돌아가기</BackLink>
      <DetailCard>
        <div>{post.category}</div>
        <DetailTitle>{post.title}</DetailTitle>
        <DetailMeta>
          {post.author.name} · 좋아요 {post.likes} · 댓글 {post.commentCount} · 조회수 {post.views}
        </DetailMeta>
        <DetailBody>{post.content}</DetailBody>
      </DetailCard>

      <SectionCard>
        <strong>댓글 작성</strong>
        <CommentForm onSubmit={onSubmitComment}>
          <CommentTextarea value={commentBody} onChange={event => onChangeComment(event.target.value)} placeholder="댓글을 입력해 주세요" />
          <div>
            <SubmitButton type="submit">댓글 등록</SubmitButton>
          </div>
        </CommentForm>
      </SectionCard>

      <SectionCard>
        <strong>댓글 목록</strong>
        <CommentList>
          {comments.map(comment => (
            <CommentCard key={comment.id}>
              <div>{comment.author.name}</div>
              <CommentText>{comment.content}</CommentText>
            </CommentCard>
          ))}
        </CommentList>
      </SectionCard>
    </PageContainer>
  );
}
