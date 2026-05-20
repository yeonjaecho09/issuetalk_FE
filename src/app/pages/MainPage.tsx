import { useState } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import { MessageCircle, ThumbsUp, Eye, Radio, TrendingUp, Clock, Trophy } from 'lucide-react';
import { mockPosts, todayDebateTopic, getLiveDebate, pastDebates } from '../data/mockData';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[6]};
`;

const LiveBanner = styled(Link)`
  display: block;
  margin-bottom: ${props => props.theme.spacing[8]};
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  color: white;
  background: linear-gradient(135deg, ${props => props.theme.colors.liveRed}, ${props => props.theme.colors.accent});
  box-shadow: ${props => props.theme.shadows.md};
  transition: transform ${props => props.theme.transitions.fast}, box-shadow ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const LiveBannerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[6]};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LiveInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
`;

const LiveIconWrapper = styled.div`
  position: relative;
`;

const LiveIcon = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: rgba(255, 255, 255, 0.2);
`;

const LivePulse = styled.div`
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  width: 1rem;
  height: 1rem;
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: white;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const LiveEyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[1]};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

const LiveBadge = styled.span`
  padding: 0.125rem ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: rgba(255, 255, 255, 0.2);
`;

const LiveTitle = styled.h2`
  color: white;
  margin-bottom: ${props => props.theme.spacing[1]};
`;

const LiveStats = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  opacity: 0.9;
`;

const LiveCTA = styled.div`
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const LiveCTATitle = styled.div`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing[1]};
`;

const LiveCTACopy = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  opacity: 0.9;
`;

const HeroCard = styled.section`
  margin-bottom: ${props => props.theme.spacing[8]};
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid rgba(99, 102, 241, 0.2);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.08));
`;

const HeroContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[6]};

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const HeroInfo = styled.div`
  flex: 1;
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[3]};
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const HeroDescription = styled.p`
  max-width: 720px;
  margin-bottom: ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.mutedForeground};
`;

const InlineStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const InlineStat = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
`;

const TimeCard = styled.div`
  min-width: 140px;
  padding: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: ${props => props.theme.colors.card};
  box-shadow: ${props => props.theme.shadows.md};
  text-align: center;
`;

const TimeLabel = styled.div`
  margin-bottom: ${props => props.theme.spacing[1]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const TimeValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
  gap: ${props => props.theme.spacing[6]};

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[6]};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  overflow-x: auto;
`;

const Tab = styled.button<{ $active: boolean }>`
  position: relative;
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[5]};
  color: ${props => (props.$active ? props.theme.colors.primary : props.theme.colors.mutedForeground)};
  font-weight: ${props => props.theme.fontWeights.semibold};
  white-space: nowrap;

  &:hover {
    color: ${props => props.theme.colors.foreground};
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    border-radius: ${props => props.theme.borderRadius.full};
    background-color: ${props => (props.$active ? props.theme.colors.primary : 'transparent')};
  }
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
`;

const PostCard = styled(Link)`
  display: block;
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
  transition: transform ${props => props.theme.transitions.fast}, box-shadow ${props => props.theme.transitions.fast}, border-color ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[3]};
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

const PostTitle = styled.h3`
  margin-bottom: ${props => props.theme.spacing[2]};
  transition: color ${props => props.theme.transitions.fast};

  ${PostCard}:hover & {
    color: ${props => props.theme.colors.primary};
  }
`;

const PostContent = styled.p`
  margin-bottom: ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.mutedForeground};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[4]};
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.mutedForeground};
`;

const AuthorName = styled.span`
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.foreground};
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[6]};
`;

const SidebarCard = styled.section`
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const SidebarTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const StatsTitle = styled(SidebarTitle)`
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const SidebarLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.semibold};

  &:hover {
    text-decoration: underline;
  }
`;

const DebateList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[3]};
`;

const DebateItem = styled(Link)`
  display: block;
  padding: ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.xl};
  transition: background-color ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const DebateRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing[3]};
`;

const TrophyBox = styled.div`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.lg};
  color: white;
  background: linear-gradient(135deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.primary});
`;

const DebateInfo = styled.div`
  min-width: 0;
  flex: 1;
`;

const DebateTitle = styled.div`
  margin-bottom: ${props => props.theme.spacing[1]};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const DebateWinner = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.mutedForeground};
`;

const StatsCard = styled.section`
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid rgba(99, 102, 241, 0.2);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(236, 72, 153, 0.08));
`;

const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[3]};
`;

const StatRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatLabel = styled.span`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const StatValue = styled.span<{ $accent?: boolean; $gradient?: boolean }>`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props =>
    props.$gradient
      ? 'transparent'
      : props.$accent
        ? props.theme.colors.accent
        : props.theme.colors.primary};

  ${props =>
    props.$gradient &&
    `
      background: linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.accent});
      -webkit-background-clip: text;
      background-clip: text;
    `}
`;

export function MainPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'community' | 'debate'>('all');
  const liveDebate = getLiveDebate();

  const filteredPosts = mockPosts.filter(post => {
    if (activeTab === 'all') return true;
    if (activeTab === 'community') return post.type === 'community';
    return post.type === 'debate-topic';
  });

  return (
    <Container>
      {liveDebate && (
        <LiveBanner to="/live">
          <LiveBannerContent>
            <LiveInfo>
              <LiveIconWrapper>
                <LiveIcon>
                  <Radio size={24} />
                </LiveIcon>
                <LivePulse />
              </LiveIconWrapper>
              <div>
                <LiveEyebrow>
                  <LiveBadge>LIVE</LiveBadge>
                  실시간 토론 진행 중
                </LiveEyebrow>
                <LiveTitle>{liveDebate.topic.title}</LiveTitle>
                <LiveStats>
                  {liveDebate.debater1.name} vs {liveDebate.debater2.name} · 시청자 {liveDebate.viewers.toLocaleString()}명
                </LiveStats>
              </div>
            </LiveInfo>
            <LiveCTA>
              <LiveCTATitle>지금 참여하기</LiveCTATitle>
              <LiveCTACopy>투표하고 실시간으로 의견을 확인해보세요.</LiveCTACopy>
            </LiveCTA>
          </LiveBannerContent>
        </LiveBanner>
      )}

      <HeroCard>
        <HeroContent>
          <HeroInfo>
            <HeroBadge>
              <TrendingUp size={18} />
              오늘의 토론 주제
            </HeroBadge>
            <h2>{todayDebateTopic.title}</h2>
            <HeroDescription>{todayDebateTopic.content}</HeroDescription>
            <InlineStats>
              <InlineStat>
                <ThumbsUp size={16} />
                {todayDebateTopic.likes}
              </InlineStat>
              <InlineStat>
                <MessageCircle size={16} />
                {todayDebateTopic.commentCount}
              </InlineStat>
              <InlineStat>
                <Eye size={16} />
                {todayDebateTopic.views}
              </InlineStat>
            </InlineStats>
          </HeroInfo>

          <TimeCard>
            <TimeLabel>토론 시작</TimeLabel>
            <TimeValue>
              <Clock size={18} />
              14:00
            </TimeValue>
          </TimeCard>
        </HeroContent>
      </HeroCard>

      <MainGrid>
        <div>
          <Tabs>
            <Tab $active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
              전체
            </Tab>
            <Tab $active={activeTab === 'community'} onClick={() => setActiveTab('community')}>
              커뮤니티
            </Tab>
            <Tab $active={activeTab === 'debate'} onClick={() => setActiveTab('debate')}>
              토론 주제
            </Tab>
          </Tabs>

          <PostList>
            {filteredPosts.map(post => (
              <PostCard key={post.id} to={`/post/${post.id}`}>
                <PostHeader>
                  <CategoryBadge $debate={post.type === 'debate-topic'}>{post.category}</CategoryBadge>
                  {post.type === 'debate-topic' && <DebateBadge>토론 후보</DebateBadge>}
                </PostHeader>
                <PostTitle>{post.title}</PostTitle>
                <PostContent>{post.content}</PostContent>
                <PostMeta>
                  <AuthorName>{post.author.name}</AuthorName>
                  <span>{new Date(post.createdAt).toLocaleDateString('ko-KR')}</span>
                  <InlineStat>
                    <ThumbsUp size={14} />
                    {post.likes}
                  </InlineStat>
                  <InlineStat>
                    <MessageCircle size={14} />
                    {post.commentCount}
                  </InlineStat>
                  <InlineStat>
                    <Eye size={14} />
                    {post.views}
                  </InlineStat>
                </PostMeta>
              </PostCard>
            ))}
          </PostList>
        </div>

        <Sidebar>
          <SidebarCard>
            <SidebarHeader>
              <SidebarTitle>
                <Trophy size={20} />
                지난 토론
              </SidebarTitle>
              <SidebarLink to="/past-debates">전체보기</SidebarLink>
            </SidebarHeader>
            <DebateList>
              {pastDebates.slice(0, 3).map(debate => {
                const winner = debate.votes.debater1 > debate.votes.debater2 ? debate.debater1 : debate.debater2;

                return (
                  <DebateItem key={debate.id} to={`/past-debate/${debate.id}`}>
                    <DebateRow>
                      <TrophyBox>
                        <Trophy size={14} />
                      </TrophyBox>
                      <DebateInfo>
                        <DebateTitle>{debate.topic.title}</DebateTitle>
                        <DebateWinner>승자: {winner.name}</DebateWinner>
                      </DebateInfo>
                    </DebateRow>
                  </DebateItem>
                );
              })}
            </DebateList>
          </SidebarCard>

          <StatsCard>
            <StatsTitle>이슈톡 통계</StatsTitle>
            <StatsList>
              <StatRow>
                <StatLabel>총 게시글</StatLabel>
                <StatValue>{mockPosts.length}</StatValue>
              </StatRow>
              <StatRow>
                <StatLabel>완료된 토론</StatLabel>
                <StatValue $accent>{pastDebates.length}</StatValue>
              </StatRow>
              <StatRow>
                <StatLabel>오늘 활동 사용자</StatLabel>
                <StatValue $gradient>1,247</StatValue>
              </StatRow>
            </StatsList>
          </StatsCard>
        </Sidebar>
      </MainGrid>
    </Container>
  );
}
