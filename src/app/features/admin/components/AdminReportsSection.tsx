import type { ReportItem } from '../../../data/reportData';
import {
  AdminActionButton,
  AdminCard,
  AdminDangerButton,
  ItemActions,
  ItemCard,
  ItemList,
  ItemMeta,
  ItemText,
} from './AdminPageContent.styles';
import { AdminSectionPagination } from './AdminSectionPagination';
import { getPriorityLabel, getReportStatusLabel, REPORTS_PER_PAGE } from './adminPageContent.utils';

type AdminReportsSectionProps = {
  reports: ReportItem[];
  currentPage: number;
  totalItems: number;
  onChangePage: (page: number) => void;
  onStartReview: (reportId: string) => void;
  onResolveReport: (reportId: string) => void;
  onDismissReport: (reportId: string) => void;
  onViewReportContent: (targetPath?: string) => void;
};

export function AdminReportsSection({
  reports,
  currentPage,
  totalItems,
  onChangePage,
  onStartReview,
  onResolveReport,
  onDismissReport,
  onViewReportContent,
}: AdminReportsSectionProps) {
  return (
    <AdminCard>
      <strong>신고 접수 현황</strong>
      <ItemList>
        {reports.map(report => (
          <ItemCard key={report.id}>
            <div>{report.targetTitle}</div>
            <ItemText>{report.description}</ItemText>
            <ItemMeta>
              상태 {getReportStatusLabel(report.status)} · 우선순위 {getPriorityLabel(report.priority)}
              {report.assignedAdmin ? ` · 담당 ${report.assignedAdmin}` : ''}
            </ItemMeta>
            <ItemActions>
              <AdminActionButton type="button" onClick={() => onStartReview(report.id)}>
                검토 시작
              </AdminActionButton>
              <AdminActionButton type="button" onClick={() => onViewReportContent(report.targetPath)}>
                콘텐츠 확인
              </AdminActionButton>
              <AdminActionButton type="button" onClick={() => onResolveReport(report.id)}>
                처리 완료
              </AdminActionButton>
              <AdminDangerButton type="button" onClick={() => onDismissReport(report.id)}>
                신고 반려
              </AdminDangerButton>
            </ItemActions>
          </ItemCard>
        ))}
      </ItemList>
      <AdminSectionPagination
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={REPORTS_PER_PAGE}
        label="신고 페이지"
        onChangePage={onChangePage}
      />
    </AdminCard>
  );
}

