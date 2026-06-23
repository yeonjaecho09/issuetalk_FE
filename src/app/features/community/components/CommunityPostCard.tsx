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
  TitleLink,
} from './CommunityPostCard.styles';

type CommunityPostCardProps = {
  post: CommunityPostPreview;
};

export function CommunityPostCard({ post }: CommunityPostCardProps) {
  return (
    <PostCard to={`/community/${post.id}`}>
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

        <TitleLink>
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

        </ContentFooter>
      </PostInner>
    </PostCard>
  );
}
