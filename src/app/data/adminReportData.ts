import { reportItems, type ReportItem, type ReportStatus } from './reportData';

const STORAGE_KEY = 'issuetalk.admin.reports';

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function isReportItem(value: unknown): value is ReportItem {
  if (!value || typeof value !== 'object') return false;

  const item = value as Record<string, unknown>;
  return (
    typeof item.id === 'string' &&
    typeof item.targetType === 'string' &&
    typeof item.targetTitle === 'string' &&
    typeof item.reason === 'string' &&
    typeof item.description === 'string' &&
    typeof item.reporter === 'string' &&
    typeof item.reportedAt === 'string' &&
    typeof item.status === 'string' &&
    typeof item.priority === 'string'
  );
}

function readStoredReports() {
  if (!isBrowser()) return [] as ReportItem[];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isReportItem);
  } catch {
    return [];
  }
}

function writeStoredReports(reports: ReportItem[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

export function getAdminReports() {
  const stored = readStoredReports();
  const mergedMap = new Map<string, ReportItem>();

  reportItems.forEach(report => {
    mergedMap.set(report.id, report);
  });

  stored.forEach(report => {
    mergedMap.set(report.id, report);
  });

  return [...mergedMap.values()].sort((left, right) => new Date(right.reportedAt).getTime() - new Date(left.reportedAt).getTime());
}

export function updateAdminReportStatus(reportId: string, status: ReportStatus, assignedAdmin?: string) {
  const reports = getAdminReports();
  const nextReports = reports.map(report =>
    report.id === reportId
      ? {
          ...report,
          status,
          assignedAdmin: assignedAdmin ?? report.assignedAdmin,
        }
      : report,
  );

  writeStoredReports(nextReports);
}

export function hasActiveReport(targetType: ReportItem['targetType'], targetPath: string, reporter?: string) {
  return getAdminReports().some(report => {
    if (report.targetType !== targetType || report.targetPath !== targetPath) {
      return false;
    }

    if (report.status === 'resolved' || report.status === 'dismissed') {
      return false;
    }

    return reporter ? report.reporter === reporter : true;
  });
}

export function createAdminReport(input: Omit<ReportItem, 'id' | 'reportedAt' | 'status'>) {
  const reports = getAdminReports();
  const nextReport: ReportItem = {
    ...input,
    id: `report-user-${Date.now()}`,
    reportedAt: new Date().toISOString(),
    status: 'new',
  };

  writeStoredReports([nextReport, ...reports]);
  return nextReport;
}
