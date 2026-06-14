import { Eye, MessageCircle, Pin, ThumbsUp } from 'lucide-react';
import type { CommunityPostPreview } from '../../../data/communityData';
import {
  AuthorText,
  CategoryBadge,
  ContentFooter,
  Excerpt,
  Metric,
  Metrics,
  PinBanner,
  PostCard,
  PostInner,
  PostMetaRow,
  PostTitle,
  ReadLink,
  TitleLink,
} from './CommunityPostCard.styles';

type CommunityPostCardProps = {
  post: CommunityPostPreview;
};

export function CommunityPostCard({ post }: CommunityPostCardProps) {
  return (
    <PostCard>
      {post.isPinned && (
        <PinBanner>
          <Pin size={12} />
          운영 공지
        </PinBanner>
      )}

      <PostInner>
        <PostMetaRow>
          <CategoryBadge>{post.category}</CategoryBadge>
          <AuthorText>
            {post.author} ·{' '}
            {new Date(post.createdAt).toLocaleDateString('ko-KR', {
              month: 'short',
              day: 'numeric',
            })}
          </AuthorText>
        </PostMetaRow>

        <TitleLink to={`/community/${post.id}`}>
          <PostTitle>{post.title}</PostTitle>
        </TitleLink>
        <Excerpt>{post.excerpt}</Excerpt>

        <ContentFooter>
          <Metrics>
            <Metric>
              <ThumbsUp size={14} />
              {post.likes}
            </Metric>
            <Metric>
              <MessageCircle size={14} />
              {post.comments}
            </Metric>
            <Metric>
              <Eye size={14} />
              {post.views}
            </Metric>
          </Metrics>

          <ReadLink to={`/community/${post.id}`}>상세 보기</ReadLink>
        </ContentFooter>
      </PostInner>
    </PostCard>
  );
}
