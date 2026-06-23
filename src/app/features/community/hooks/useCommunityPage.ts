import { useMemo, useState } from 'react';
import { communityCategories, getCommunityPosts, type CommunityCategory } from '../../../data/communityData';

const ITEMS_PER_PAGE = 4;

export function useCommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState<CommunityCategory>(communityCategories[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const allPosts = useMemo(() => getCommunityPosts(), []);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === communityCategories[0]) {
      return allPosts;
    }

    return allPosts.filter(post => post.category === selectedCategory);
  }, [allPosts, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const currentPosts = filteredPosts.slice((safeCurrentPage - 1) * ITEMS_PER_PAGE, safeCurrentPage * ITEMS_PER_PAGE);

  const handleSelectCategory = (category: CommunityCategory) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return {
    categories: communityCategories,
    selectedCategory,
    filteredPosts,
    currentPosts,
    currentPage: safeCurrentPage,
    totalPages,
    itemsPerPage: ITEMS_PER_PAGE,
    allPosts,
    handleSelectCategory,
    handlePageChange: setCurrentPage,
  };
}
