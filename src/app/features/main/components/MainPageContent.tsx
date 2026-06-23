import { PageContainer } from '../../../components/ui/primitives';
import type { CommunityPostPreview } from '../../../data/communityData';
import type { DebateRoom } from '../../../data/liveDebateRooms';
import {
  LiveBadge,
  LiveCard,
  LiveEyebrow,
  LiveMeta,
  LiveTitle,
  PostCategory,
  PostExcerpt,
  PostHeader,
  PostLinkCard,
  PostMeta,
  PostsList,
  PostsSection,
  PostsTitle,
  TopicEyebrow,
  TopicSection,
  TopicTitle,
} from './MainPageContent.styles';

type MainPageContentProps = {
  liveDebate: DebateRoom | null;
  topicTitle: string;
  hottestCommunityPosts: CommunityPostPreview[];
};

export function MainPageContent({ liveDebate, topicTitle, hottestCommunityPosts }: MainPageContentProps) {
  return (
    <PageContainer>
      <TopicSection>
        <TopicEyebrow>오늘의 토론 주제</TopicEyebrow>
        <TopicTitle>{topicTitle}</TopicTitle>
      </TopicSection>

      {liveDebate ? (
        <LiveCard to="/live">
          <LiveEyebrow>
            <LiveBadge>LIVE</LiveBadge>
            실시간 토론 진행 중
          </LiveEyebrow>
          <LiveTitle>{liveDebate.title}</LiveTitle>
          <LiveMeta>
            {liveDebate.debater1.name} vs {liveDebate.debater2.name} · 관전자 {liveDebate.viewers.toLocaleString()}명
          </LiveMeta>
        </LiveCard>
      ) : null}

      <PostsSection>
        <PostsTitle>커뮤니티 인기 글 TOP 10</PostsTitle>
        <PostsList>
          {hottestCommunityPosts.map((post, index) => (
            <PostLinkCard key={post.id} to={`/community/${post.id}`}>
              <PostHeader>
                <strong>
                  {index + 1}. {post.title}
                </strong>
                <PostCategory>{post.category}</PostCategory>
              </PostHeader>
              <PostExcerpt>{post.excerpt}</PostExcerpt>
              <PostMeta>
                좋아요 {post.likes} · 댓글 {post.comments} · 조회수 {post.views}
              </PostMeta>
            </PostLinkCard>
          ))}
        </PostsList>
      </PostsSection>
    </PageContainer>
  );
}

