import { PageContainer } from '../../../components/ui/primitives';
import type { CommunityCategory, CommunityPostPreview } from '../../../data/communityData';
import { CommunityFeedSection } from './CommunityFeedSection';
import { CommunityFilterBar } from './CommunityFilterBar';

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
  onSelectCategory,
  onPageChange,
}: CommunityPageContentProps) {
  return (
    <PageContainer>
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
