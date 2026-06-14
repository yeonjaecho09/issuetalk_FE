import { PageContainer } from '../../../components/ui/primitives';
import type { CommunityPostPreview } from '../../../data/communityData';
import { AccountSettingsCard } from './AccountSettingsCard';
import { MyCommunityPostsCard } from './MyCommunityPostsCard';
import { ProfileCard } from './ProfileCard';
import { MyPageColumn, MyPageGrid } from './MyPageContent.styles';

type MyPageContentProps = {
  name: string;
  nickname: string;
  email: string;
  joinedAt: string;
  posts: CommunityPostPreview[];
  isLoggedIn: boolean;
};

export function MyPageContent({ name, nickname, email, joinedAt, posts, isLoggedIn }: MyPageContentProps) {
  return (
    <PageContainer>
      <MyPageGrid>
        <MyPageColumn>
          <ProfileCard name={name} nickname={nickname} email={email} joinedAt={joinedAt} posts={posts} isLoggedIn={isLoggedIn} />
        </MyPageColumn>

        <MyPageColumn>
          <MyCommunityPostsCard posts={posts} />
          <AccountSettingsCard />
        </MyPageColumn>
      </MyPageGrid>
    </PageContainer>
  );
}
