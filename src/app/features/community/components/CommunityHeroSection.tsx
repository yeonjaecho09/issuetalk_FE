import { Megaphone, MessageCircle, TrendingUp, Users } from 'lucide-react';
import type { CommunityPostPreview } from '../../../data/communityData';
import {
  CommunityDescription,
  CommunityEyebrow,
  CommunityHero,
  CommunityHeroGrid,
  CommunityTitle,
  HeroStatCard,
  HeroStatLabel,
  HeroStats,
  HeroStatValue,
} from './CommunityHeroSection.styles';

type CommunityHeroSectionProps = {
  posts: CommunityPostPreview[];
};

export function CommunityHeroSection({ posts }: CommunityHeroSectionProps) {
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);

  return (
    <CommunityHero>
      <CommunityHeroGrid>
        <div>
          <CommunityEyebrow>
            <Megaphone size={16} />
            Community Board
          </CommunityEyebrow>
          <CommunityTitle>이슈를 더 깊게, 더 길게 이어가는 커뮤니티 공감</CommunityTitle>
          <CommunityDescription>
            실시간 토론이 순간의 온도라면, 커뮤니티는 그 이후의 질문과 정리, 제안과 모집이 오래 남는 공감입니다. 정책
            아이디어를 나누고 자료를 공유하고, 다음 토론의 씨앗을 꺼내보세요.
          </CommunityDescription>
        </div>

        <HeroStats>
          <HeroStatCard>
            <HeroStatLabel>이번 주 게시글</HeroStatLabel>
            <HeroStatValue>
              <TrendingUp size={20} />
              {posts.length}개
            </HeroStatValue>
          </HeroStatCard>
          <HeroStatCard>
            <HeroStatLabel>누적 댓글 참여</HeroStatLabel>
            <HeroStatValue>
              <MessageCircle size={20} />
              {totalComments}개
            </HeroStatValue>
          </HeroStatCard>
          <HeroStatCard>
            <HeroStatLabel>활동 중인 멤버</HeroStatLabel>
            <HeroStatValue>
              <Users size={20} />
              1,284명
            </HeroStatValue>
          </HeroStatCard>
        </HeroStats>
      </CommunityHeroGrid>
    </CommunityHero>
  );
}
