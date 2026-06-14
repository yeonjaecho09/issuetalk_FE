import { PaginationButton, PaginationControls, PaginationInfo } from './AdminPageContent.styles';
import { getTotalPages } from './adminPageContent.utils';

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  label: string;
  onChangePage: (nextPage: number) => void;
};

export function AdminSectionPagination({ currentPage, totalItems, pageSize, label, onChangePage }: PaginationProps) {
  const totalPages = getTotalPages(totalItems, pageSize);

  if (totalItems <= pageSize) {
    return null;
  }

  return (
    <PaginationControls>
      <PaginationInfo>
        {label} {currentPage} / {totalPages}
      </PaginationInfo>
      <div>
        <PaginationButton type="button" disabled={currentPage <= 1} onClick={() => onChangePage(currentPage - 1)}>
          이전
        </PaginationButton>
        <PaginationButton type="button" disabled={currentPage >= totalPages} onClick={() => onChangePage(currentPage + 1)}>
          다음
        </PaginationButton>
      </div>
    </PaginationControls>
  );
}
