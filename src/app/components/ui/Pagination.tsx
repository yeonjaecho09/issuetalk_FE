import { ChevronLeft, ChevronRight } from 'lucide-react';
import styled from 'styled-components';
import { PillButton } from './primitives';

const PaginationBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};
  margin-top: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[5]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const PaginationSummary = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[2]};
`;

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  ariaLabel: string;
  emptyText?: string;
};

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  ariaLabel,
  emptyText = '표시할 항목이 없습니다.',
}: PaginationProps) {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <PaginationBar aria-label={ariaLabel}>
      <PaginationSummary>{totalItems === 0 ? emptyText : `${start}-${end} / ${totalItems}`}</PaginationSummary>

      <PaginationControls>
        <PillButton type="button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          <ChevronLeft size={16} />
          이전
        </PillButton>

        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <PillButton key={page} type="button" $active={page === currentPage} onClick={() => onPageChange(page)}>
              {page}
            </PillButton>
          );
        })}

        <PillButton type="button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          다음
          <ChevronRight size={16} />
        </PillButton>
      </PaginationControls>
    </PaginationBar>
  );
}
