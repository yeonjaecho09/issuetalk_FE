import { PenSquare } from 'lucide-react';
import { Pagination } from '../../../components/ui/Pagination';
import type { CommunityPostPreview } from '../../../data/communityData';
import { CommunityPostCard } from './CommunityPostCard';
import { Feed, FeedHeader, FeedTitle, WriteLink } from './CommunityFeedSection.styles';

type CommunityFeedSectionProps = {
  selectedCategory: string;
  filteredPosts: CommunityPostPreview[];
  currentPosts: CommunityPostPreview[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export function CommunityFeedSection({
  selectedCategory,
  filteredPosts,
  currentPosts,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
}: CommunityFeedSectionProps) {
  return (
    <Feed>
      <FeedHeader>
        <FeedTitle>
          {selectedCategory} 카테고리 · {filteredPosts.length}개의 게시글
        </FeedTitle>
        <WriteLink to="/community/new">
          <PenSquare size={18} />
          글쓰기
        </WriteLink>
      </FeedHeader>

      {currentPosts.map(post => (
        <CommunityPostCard key={post.id} post={post} />
      ))}

      <Pagination
        ariaLabel="커뮤니티 페이지 이동"
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredPosts.length}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        emptyText="아직 등록된 게시글이 없습니다."
      />
    </Feed>
  );
}
