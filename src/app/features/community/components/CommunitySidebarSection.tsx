import { MessageCircle, TrendingUp } from 'lucide-react';
import type { CommunityPostPreview } from '../../../data/communityData';
import { GuideList, HotItem, HotList, HotMeta, HotText, HotTitle, Rank, Sidebar, SidebarCard, SidebarTitle } from './CommunitySidebarSection.styles';

type CommunitySidebarSectionProps = {
  posts: CommunityPostPreview[];
};

export function CommunitySidebarSection({ posts }: CommunitySidebarSectionProps) {
  return (
    <Sidebar>
      <SidebarCard>
        <SidebarTitle>
          <TrendingUp size={18} />
          지금 많이 보는 글
        </SidebarTitle>
        <HotList>
          {[...posts]
            .sort((a, b) => b.views - a.views)
            .slice(0, 4)
            .map((post, index) => (
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
          <li>개인 비난, 혐오 표현, 허위 정보 유포는 운영 원칙에 따라 바로 제재될 수 있습니다.</li>
          <li>자료 공유 때 출처를 함께 남기면 다른 참여자가 대화를 더 쉽게 이어갈 수 있습니다.</li>
        </GuideList>
      </SidebarCard>
    </Sidebar>
  );
}
