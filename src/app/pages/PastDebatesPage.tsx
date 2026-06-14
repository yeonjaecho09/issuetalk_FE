import { useMemo, useState } from 'react';
import { getPastDebates } from '../data/pastDebateArchive';
import { PastDebatesPageContent } from '../features/past-debates/components/PastDebatesPageContent';

const ITEMS_PER_PAGE = 5;

export function PastDebatesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const debates = useMemo(() => getPastDebates(), []);
  const totalPages = Math.max(1, Math.ceil(debates.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const currentDebates = debates.slice((safeCurrentPage - 1) * ITEMS_PER_PAGE, safeCurrentPage * ITEMS_PER_PAGE);

  return (
    <PastDebatesPageContent
      debates={debates}
      currentDebates={currentDebates}
      currentPage={safeCurrentPage}
      totalPages={totalPages}
      itemsPerPage={ITEMS_PER_PAGE}
      onPageChange={setCurrentPage}
    />
  );
}

