import type { ReportItem } from '../../../data/reportData';

export const REPORTS_PER_PAGE = 3;
export const POSTS_PER_PAGE = 5;
export const ROOMS_PER_PAGE = 4;

export function getReportStatusLabel(status: ReportItem['status']) {
  switch (status) {
    case 'new':
      return '신규';
    case 'reviewing':
      return '검토 중';
    case 'resolved':
      return '처리 완료';
    case 'dismissed':
      return '반려';
    default:
      return status;
  }
}

export function getPriorityLabel(priority: ReportItem['priority']) {
  switch (priority) {
    case 'high':
      return '높음';
    case 'medium':
      return '보통';
    case 'low':
      return '낮음';
    default:
      return priority;
  }
}

export function getTotalPages(totalCount: number, pageSize: number) {
  return Math.max(1, Math.ceil(totalCount / pageSize));
}

export function getPagedItems<T>(items: T[], page: number, pageSize: number) {
  const startIndex = (page - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
}

