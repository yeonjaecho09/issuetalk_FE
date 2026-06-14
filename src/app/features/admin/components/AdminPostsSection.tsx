import type { CommunityPostPreview } from '../../../data/communityData';
import { AdminActionButton, AdminCard, AdminDangerButton, ItemActions, ItemCard, ItemList, ItemMeta } from './AdminPageContent.styles';
import { AdminSectionPagination } from './AdminSectionPagination';
import { POSTS_PER_PAGE } from './adminPageContent.utils';

type AdminPostsSectionProps = {
  posts: CommunityPostPreview[];
  currentPage: number;
  totalItems: number;
  onChangePage: (page: number) => void;
  onViewPost: (postId: string) => void;
  onTogglePostHidden: (postId: string, isHidden: boolean) => void;
};

export function AdminPostsSection({
  posts,
  currentPage,
  totalItems,
  onChangePage,
  onViewPost,
  onTogglePostHidden,
}: AdminPostsSectionProps) {
  return (
    <AdminCard>
      <strong>게시물 관리</strong>
      <ItemList>
        {posts.map(post => (
          <ItemCard key={post.id}>
            <div>{post.title}</div>
            <ItemMeta>
              작성자 {post.author} 좋아요 {post.likes} {post.isHidden ? '숨김 처리됨' : '노출 중'}
            </ItemMeta>
            <ItemActions>
              <AdminActionButton type="button" onClick={() => onViewPost(post.id)}>
                상세 보기
              </AdminActionButton>
              <AdminDangerButton type="button" onClick={() => onTogglePostHidden(post.id, Boolean(post.isHidden))}>
                {post.isHidden ? '복구' : '숨김'}
              </AdminDangerButton>
            </ItemActions>
          </ItemCard>
        ))}
      </ItemList>
      <AdminSectionPagination
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={POSTS_PER_PAGE}
        label="게시물 페이지"
        onChangePage={onChangePage}
      />
    </AdminCard>
  );
}
