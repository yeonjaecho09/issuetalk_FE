import { CommunityPageContent } from '../features/community/components/CommunityPageContent';
import { useCommunityPage } from '../features/community/hooks/useCommunityPage';

export function CommunityPage() {
  const {
    categories,
    selectedCategory,
    filteredPosts,
    currentPosts,
    currentPage,
    totalPages,
    itemsPerPage,
    allPosts,
    handleSelectCategory,
    handlePageChange,
  } = useCommunityPage();

  return (
    <CommunityPageContent
      categories={categories}
      selectedCategory={selectedCategory}
      filteredPosts={filteredPosts}
      currentPosts={currentPosts}
      currentPage={currentPage}
      totalPages={totalPages}
      itemsPerPage={itemsPerPage}
      allPosts={allPosts}
      onSelectCategory={handleSelectCategory}
      onPageChange={handlePageChange}
    />
  );
}
