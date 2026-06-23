import { getCommunityPosts } from '../data/communityData';
import { useAuth } from '../features/auth/useAuth';
import { getStoredAccounts } from '../features/auth/authStorage';
import { MyPageContent } from '../features/my-page/components/MyPageContent';

export function MyPage() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <MyPageContent name="게스트" nickname="guest" email="로그인 후 이용 가능" joinedAt="-" posts={[]} isLoggedIn={false} />;
  }

  const myPosts = getCommunityPosts().filter(post => post.author === currentUser.nickname || post.author === currentUser.name);
  const account = getStoredAccounts().find(item => item.id === currentUser.userId);
  const joinedAt = account?.createdAt.slice(0, 10) ?? currentUser.loginAt.slice(0, 10);

  return <MyPageContent name={currentUser.name} nickname={currentUser.nickname} email={currentUser.email} joinedAt={joinedAt} posts={myPosts} isLoggedIn />;
}
