import { useState } from 'react';
import { useParams, Link } from 'react-router';
import styled from 'styled-components';
import { ArrowLeft, ThumbsUp, MessageCircle, Eye, Share2 } from 'lucide-react';
import { getCommentsByPostId, getPostById } from '../data/mockData';

const Container = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[6]};
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[6]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Card = styled.div`
  margin-bottom: ${props => props.theme.spacing[6]};
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
`;

const EmptyHeading = styled.h2`
  margin-bottom: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const HomeLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.semibold};

  &:hover {
    text-decoration: underline;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const CategoryBadge = styled.span<{ $debate?: boolean }>`
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => (props.$debate ? props.theme.colors.accent : props.theme.colors.primary)};
  background-color: ${props => (props.$debate ? 'rgba(236, 72, 153, 0.1)' : 'rgba(99, 102, 241, 0.1)')};
`;

const DebateBadge = styled.span`
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: white;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
`;

const Title = styled.h1`
  margin-bottom: ${props => props.theme.spacing[6]};
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};
  padding-bottom: ${props => props.theme.spacing[6]};
  margin-bottom: ${props => props.theme.spacing[6]};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
`;

const Avatar = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.full};
  color: white;
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.bold};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
`;

const AuthorName = styled.div`
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

const PostDate = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const Views = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const Content = styled.div`
  margin-bottom: ${props => props.theme.spacing[8]};
  white-space: pre-wrap;
  line-height: 1.75;
  font-size: ${props => props.theme.fontSizes.lg};
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
`;

const Button = styled.button<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  transition: all ${props => props.theme.transitions.fast};
  background-color: ${props => (props.$primary ? props.theme.colors.primary : props.theme.colors.secondary)};
  color: ${props => (props.$primary ? props.theme.colors.primaryForeground : props.theme.colors.foreground)};

  &:hover {
    opacity: 0.92;
  }
`;

const CommentSection = styled.div`
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
`;

const CommentTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[6]};
`;

const CommentForm = styled.form`
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  resize: none;
  padding: ${props => props.theme.spacing[4]};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: ${props => props.theme.colors.inputBackground};
  font-family: ${props => props.theme.fonts.body};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${props => props.theme.spacing[3]};
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[6]};
`;

const CommentCard = styled.div`
  padding-left: ${props => props.theme.spacing[6]};
  padding-top: ${props => props.theme.spacing[2]};
  padding-bottom: ${props => props.theme.spacing[2]};
  border-left: 4px solid rgba(99, 102, 241, 0.3);
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[3]};
`;

const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
`;

const CommentAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.full};
  color: white;
  font-weight: ${props => props.theme.fontWeights.semibold};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
`;

const CommentName = styled.div`
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

const CommentDate = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.xs};
`;

const LikeButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const CommentContent = styled.p`
  line-height: 1.75;
`;

const EmptyState = styled.div`
  padding: ${props => props.theme.spacing[12]} 0;
  text-align: center;
  color: ${props => props.theme.colors.mutedForeground};
`;

const EmptyIcon = styled(MessageCircle)`
  display: block;
  margin: 0 auto ${props => props.theme.spacing[3]};
  opacity: 0.3;
`;

export function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const post = id ? getPostById(id) : undefined;
  const comments = id ? getCommentsByPostId(id) : [];

  const [liked, setLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(post?.likes || 0);
  const [newComment, setNewComment] = useState('');

  if (!post) {
    return (
      <Container>
        <Card>
          <EmptyHeading>게시글을 찾을 수 없습니다</EmptyHeading>
          <HomeLink to="/">홈으로 돌아가기</HomeLink>
        </Card>
      </Container>
    );
  }

  const handleLike = () => {
    setLiked(prev => !prev);
    setLocalLikes(prev => prev + (liked ? -1 : 1));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New comment:', newComment);
    setNewComment('');
  };

  return (
    <Container>
      <BackLink to="/">
        <ArrowLeft size={16} />
        목록으로
      </BackLink>

      <Card>
        <BadgeContainer>
          <CategoryBadge $debate={post.type === 'debate-topic'}>{post.category}</CategoryBadge>
          {post.type === 'debate-topic' && <DebateBadge>토론 후보</DebateBadge>}
        </BadgeContainer>

        <Title>{post.title}</Title>

        <AuthorSection>
          <AuthorInfo>
            <Avatar>{post.author.name[0]}</Avatar>
            <div>
              <AuthorName>{post.author.name}</AuthorName>
              <PostDate>
                {new Date(post.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </PostDate>
            </div>
          </AuthorInfo>

          <Views>
            <Eye size={16} />
            {post.views}
          </Views>
        </AuthorSection>

        <Content>{post.content}</Content>

        <ActionButtons>
          <Button $primary={liked} onClick={handleLike}>
            <ThumbsUp size={18} />
            좋아요 {localLikes}
          </Button>
          <Button>
            <Share2 size={18} />
            공유
          </Button>
        </ActionButtons>
      </Card>

      <CommentSection>
        <CommentTitle>
          <MessageCircle size={24} />
          댓글 {comments.length}
        </CommentTitle>

        <CommentForm onSubmit={handleCommentSubmit}>
          <Textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="댓글을 작성해주세요..."
          />
          <SubmitButtonContainer>
            <Button type="submit" $primary>
              댓글 작성
            </Button>
          </SubmitButtonContainer>
        </CommentForm>

        <CommentList>
          {comments.map(comment => (
            <CommentCard key={comment.id}>
              <CommentHeader>
                <CommentAuthor>
                  <CommentAvatar>{comment.author.name[0]}</CommentAvatar>
                  <div>
                    <CommentName>{comment.author.name}</CommentName>
                    <CommentDate>
                      {new Date(comment.createdAt).toLocaleDateString('ko-KR', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </CommentDate>
                  </div>
                </CommentAuthor>
                <LikeButton>
                  <ThumbsUp size={14} />
                  {comment.likes}
                </LikeButton>
              </CommentHeader>
              <CommentContent>{comment.content}</CommentContent>
            </CommentCard>
          ))}

          {comments.length === 0 && (
            <EmptyState>
              <EmptyIcon size={48} />
              <p>아직 댓글이 없습니다. 첫 댓글을 남겨보세요.</p>
            </EmptyState>
          )}
        </CommentList>
      </CommentSection>
    </Container>
  );
}
