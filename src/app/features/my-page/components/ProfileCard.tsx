import { UserRound } from 'lucide-react';
import type { CommunityPostPreview } from '../../../data/communityData';
import {
  Avatar,
  InfoList,
  ProfileCardRoot,
  ProfileMeta,
  ProfileName,
  ProfileSectionTitle,
  ProfileTop,
  StatCard,
  StatGrid,
  StatLabel,
  StatValue,
  Strong,
} from './ProfileCard.styles';

type ProfileCardProps = {
  name: string;
  nickname: string;
  email: string;
  joinedAt: string;
  posts: CommunityPostPreview[];
  isLoggedIn: boolean;
};

export function ProfileCard({ name, nickname, email, joinedAt, posts, isLoggedIn }: ProfileCardProps) {
  return (
    <ProfileCardRoot>
      <ProfileSectionTitle>
        <UserRound size={20} />
        프로필 카드
      </ProfileSectionTitle>

      <ProfileTop>
        <Avatar>{name[0] ?? '게'}</Avatar>
        <div>
          <ProfileName>{name}</ProfileName>
          <ProfileMeta>@{nickname} · 가입일 {joinedAt}</ProfileMeta>
        </div>
      </ProfileTop>

      <StatGrid>
        <StatCard>
          <StatLabel>작성 글</StatLabel>
          <StatValue>{posts.length}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>받은 좋아요</StatLabel>
          <StatValue>{posts.reduce((sum, post) => sum + post.likes, 0)}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>참여 댓글</StatLabel>
          <StatValue>{posts.reduce((sum, post) => sum + post.comments, 0)}</StatValue>
        </StatCard>
      </StatGrid>

      <InfoList>
        <div>
          이메일
          <br />
          <Strong>{email}</Strong>
        </div>
        <div>
          계정 상태
          <br />
          <Strong>{isLoggedIn ? '로그인됨' : '로그인 필요'}</Strong>
        </div>
        <div>
          대표 활동
          <br />
          <Strong>{isLoggedIn ? '커뮤니티 글 작성 및 토론 참여' : '로그인 후 이용 가능'}</Strong>
        </div>
      </InfoList>
    </ProfileCardRoot>
  );
}
