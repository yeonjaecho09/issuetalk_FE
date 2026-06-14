import { PageContainer } from '../../../components/ui/primitives';
import type { CommunityCategory, CommunityPostPreview } from '../../../data/communityData';
import { CommunityFeedSection } from './CommunityFeedSection';
import { CommunityFilterBar } from './CommunityFilterBar';
import { CommunityHeader, CommunityTitle } from './CommunityPageContent.styles';

type CommunityPageContentProps = {
  categories: CommunityCategory[];
  selectedCategory: CommunityCategory;
  filteredPosts: CommunityPostPreview[];
  currentPosts: CommunityPostPreview[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  allPosts: CommunityPostPreview[];
  onSelectCategory: (category: CommunityCategory) => void;
  onPageChange: (page: number) => void;
};

export function CommunityPageContent({
  categories,
  selectedCategory,
  filteredPosts,
  currentPosts,
  currentPage,
  totalPages,
  itemsPerPage,
  allPosts,
  onSelectCategory,
  onPageChange,
}: CommunityPageContentProps) {
  return (
    <PageContainer>
      <CommunityHeader>
        <CommunityTitle>커뮤니티</CommunityTitle>
        <p>시민들의 자유로운 소통과 정보 공유의 공간 · 총 {allPosts.length}개의 게시글</p>
      </CommunityHeader>
      <CommunityFilterBar categories={categories} selectedCategory={selectedCategory} onSelect={onSelectCategory} />
      <CommunityFeedSection
        selectedCategory={selectedCategory}
        filteredPosts={filteredPosts}
        currentPosts={currentPosts}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </PageContainer>
  );
}
