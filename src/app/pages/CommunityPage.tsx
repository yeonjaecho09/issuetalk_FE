import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import { Eye, MessageCircle, Megaphone, PenSquare, Pin, ThumbsUp, TrendingUp, Users } from 'lucide-react';
import { communityCategories, communityPosts } from '../data/communityData';

const Container = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[6]} ${props => props.theme.spacing[16]};
`;

const Hero = styled.section`
  margin-bottom: ${props => props.theme.spacing[8]};
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid rgba(99, 102, 241, 0.18);
  background:
    radial-gradient(circle at top right, rgba(236, 72, 153, 0.14), transparent 28%),
    linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(255, 255, 255, 0.95));
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(260px, 0.7fr);
  gap: ${props => props.theme.spacing[6]};

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => props.theme.colors.primary};
  background-color: rgba(99, 102, 241, 0.1);
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const HeroTitle = styled.h1`
  max-width: 42rem;
  margin-bottom: ${props => props.theme.spacing[3]};
  font-size: clamp(2.25rem, 5vw, 4rem);
  line-height: 1.05;
`;

const HeroDescription = styled.p`
  max-width: 44rem;
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.lg};
  line-height: 1.8;
`;

const HeroStats = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

const StatCard = styled.div`
  padding: ${props => props.theme.spacing[5]};
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: rgba(255, 255, 255, 0.78);
  box-shadow: ${props => props.theme.shadows.md};
`;

const StatLabel = styled.div`
  margin-bottom: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const StatValue = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[6]};
`;

const FilterChip = styled.button<{ $active: boolean }>`
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[5]};
  border: 1px solid ${props => (props.$active ? 'transparent' : props.theme.colors.border)};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => (props.$active ? props.theme.colors.primaryForeground : props.theme.colors.foreground)};
  background: ${props =>
    props.$active
      ? `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.accent})`
      : props.theme.colors.card};
  box-shadow: ${props => (props.$active ? props.theme.shadows.md : 'none')};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
  transition: transform ${props => props.theme.transitions.fast}, border-color ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-1px);
    border-color: ${props => (props.$active ? 'transparent' : props.theme.colors.primary)};
  }
`;

const Layout = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(280px, 0.7fr);
  gap: ${props => props.theme.spacing[6]};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Feed = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

const FeedHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FeedTitle = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const WriteLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[5]};
  border-radius: ${props => props.theme.borderRadius.xl};
  color: ${props => props.theme.colors.primaryForeground};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  box-shadow: ${props => props.theme.shadows.md};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
  transition: transform ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-1px);
  }
`;

const PostCard = styled.article`
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: transform ${props => props.theme.transitions.fast}, box-shadow ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const PinBanner = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.primaryForeground};
  background-color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const PostInner = styled.div`
  padding: ${props => props.theme.spacing[6]};
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[3]};

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CategoryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => props.theme.colors.primary};
  background-color: rgba(99, 102, 241, 0.1);
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const AuthorText = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const PostTitle = styled.h3`
  margin-bottom: ${props => props.theme.spacing[3]};
  font-size: ${props => props.theme.fontSizes['2xl']};
`;

const Excerpt = styled.p`
  margin-bottom: ${props => props.theme.spacing[5]};
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.8;
`;

const Metrics = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const Metric = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
`;

const Sidebar = styled.aside`
  display: grid;
  gap: ${props => props.theme.spacing[5]};
  align-content: start;
`;

const SidebarCard = styled.section`
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
`;

const SidebarTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const HotList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
`;

const HotItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${props => props.theme.spacing[3]};
  align-items: start;
`;

const Rank = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const HotText = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[1]};
`;

const HotTitle = styled.div`
  font-weight: ${props => props.theme.fontWeights.semibold};
  line-height: 1.5;
`;

const HotMeta = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.xs};
`;

const GuideList = styled.ul`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  padding-left: ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.7;
`;

export function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof communityCategories)[number]>('전체');

  const filteredPosts = useMemo(() => {
    if (selectedCategory === '전체') {
      return communityPosts;
    }

    return communityPosts.filter(post => post.category === selectedCategory);
  }, [selectedCategory]);

  const totalComments = communityPosts.reduce((sum, post) => sum + post.comments, 0);

  return (
    <Container>
      <Hero>
        <HeroGrid>
          <div>
            <Eyebrow>
              <Megaphone size={16} />
              Community Board
            </Eyebrow>
            <HeroTitle>이슈를 더 길게, 더 깊게 이어가는 커뮤니티 공간</HeroTitle>
            <HeroDescription>
              실시간 토론이 순간의 온도를 다룬다면, 커뮤니티는 그 이후의 질문과 정리, 제안과 모집이 오래 남는 공간입니다. 정책
              아이디어를 던지고, 자료를 공유하고, 다음 대화를 함께 시작해보세요.
            </HeroDescription>
          </div>

          <HeroStats>
            <StatCard>
              <StatLabel>이번 주 새 글</StatLabel>
              <StatValue>
                <TrendingUp size={20} />
                {communityPosts.length}개
              </StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>누적 댓글 참여</StatLabel>
              <StatValue>
                <MessageCircle size={20} />
                {totalComments}개
              </StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>활동 중인 멤버</StatLabel>
              <StatValue>
                <Users size={20} />
                1,284명
              </StatValue>
            </StatCard>
          </HeroStats>
        </HeroGrid>
      </Hero>

      <FilterRow>
        {communityCategories.map(category => (
          <FilterChip
            key={category}
            type="button"
            $active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </FilterChip>
        ))}
      </FilterRow>

      <Layout>
        <Feed>
          <FeedHeader>
            <FeedTitle>{selectedCategory} 카테고리에서 {filteredPosts.length}개의 글을 보고 있어요.</FeedTitle>
            <WriteLink to="/community/new">
              <PenSquare size={18} />
              글쓰기
            </WriteLink>
          </FeedHeader>

          {filteredPosts.map(post => (
            <PostCard key={post.id}>
              {post.isPinned && (
                <PinBanner>
                  <Pin size={12} />
                  운영 고정
                </PinBanner>
              )}

              <PostInner>
                <MetaRow>
                  <CategoryBadge>{post.category}</CategoryBadge>
                  <AuthorText>
                    {post.author} ·{' '}
                    {new Date(post.createdAt).toLocaleDateString('ko-KR', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </AuthorText>
                </MetaRow>

                <PostTitle>{post.title}</PostTitle>
                <Excerpt>{post.excerpt}</Excerpt>

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
              </PostInner>
            </PostCard>
          ))}
        </Feed>

        <Sidebar>
          <SidebarCard>
            <SidebarTitle>
              <TrendingUp size={18} />
              지금 많이 보는 글
            </SidebarTitle>
            <HotList>
              {communityPosts.slice(0, 4).map((post, index) => (
                <HotItem key={post.id}>
                  <Rank>{index + 1}</Rank>
                  <HotText>
                    <HotTitle>{post.title}</HotTitle>
                    <HotMeta>좋아요 {post.likes} · 댓글 {post.comments}</HotMeta>
                  </HotText>
                </HotItem>
              ))}
            </HotList>
          </SidebarCard>

          <SidebarCard>
            <SidebarTitle>
              <MessageCircle size={18} />
              커뮤니티 가이드
            </SidebarTitle>
            <GuideList>
              <li>입장보다 근거를 먼저 적어주면 토론의 질이 훨씬 좋아집니다.</li>
              <li>개인 비난, 혐오 표현, 신상 노출은 운영 정책에 따라 바로 제재될 수 있습니다.</li>
              <li>자료 공유 시 출처를 함께 적어주면 다른 참여자가 이어서 읽기 편합니다.</li>
            </GuideList>
          </SidebarCard>
        </Sidebar>
      </Layout>
    </Container>
  );
}
