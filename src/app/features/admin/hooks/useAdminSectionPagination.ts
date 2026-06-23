import { useEffect, useMemo, useState } from 'react';
import { getPagedItems, getTotalPages } from '../components/adminPageContent.utils';

export function useAdminSectionPagination<T>(items: T[], pageSize: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = getTotalPages(items.length, pageSize);

  useEffect(() => {
    setCurrentPage(page => Math.min(page, totalPages));
  }, [totalPages]);

  const visibleItems = useMemo(() => getPagedItems(items, currentPage, pageSize), [items, currentPage, pageSize]);

  return {
    currentPage,
    visibleItems,
    handlePageChange: setCurrentPage,
  };
}
