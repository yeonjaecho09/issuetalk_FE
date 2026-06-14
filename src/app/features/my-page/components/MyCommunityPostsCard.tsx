import { MessageCircle } from 'lucide-react';
import type { CommunityPostPreview } from '../../../data/communityData';
import { PostCard, PostCategory, PostExcerpt, PostList, PostMeta, PostsCardRoot, PostsSectionTitle, PostTitle } from './MyCommunityPostsCard.styles';

type MyCommunityPostsCardProps = {
  posts: CommunityPostPreview[];
};

export function MyCommunityPostsCard({ posts }: MyCommunityPostsCardProps) {
  return (
    <PostsCardRoot>
      <PostsSectionTitle>
        <MessageCircle size={20} />
        내가 쓴 커뮤니티 글
      </PostsSectionTitle>

      <PostList>
        {posts.length === 0 ? (
          <PostCard>
            <PostTitle>아직 작성한 글이 없습니다.</PostTitle>
            <PostExcerpt>로그인 후 커뮤니티에서 첫 글을 작성해 보세요.</PostExcerpt>
          </PostCard>
        ) : (
          posts.map(post => (
            <PostCard key={post.id}>
              <PostCategory>{post.category}</PostCategory>
              <PostTitle>{post.title}</PostTitle>
              <PostExcerpt>{post.excerpt}</PostExcerpt>
              <PostMeta>좋아요 {post.likes} · 댓글 {post.comments} · 조회수 {post.views}</PostMeta>
            </PostCard>
          ))
        )}
      </PostList>
    </PostsCardRoot>
  );
}
