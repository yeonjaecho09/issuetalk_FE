export type ReportStatus = 'new' | 'reviewing' | 'resolved' | 'dismissed';

export type ReportTargetType = 'community-post' | 'live-room' | 'chat-message' | 'user';

export type ReportItem = {
  id: string;
  targetType: ReportTargetType;
  targetTitle: string;
  targetPath?: string;
  reason: string;
  description: string;
  reporter: string;
  reportedAt: string;
  status: ReportStatus;
  priority: 'high' | 'medium' | 'low';
  assignedAdmin?: string;
};

export const reportItems: ReportItem[] = [
  {
    id: 'report-1',
    targetType: 'community-post',
    targetPath: '/community/community-1',
    targetTitle: '청년 주거 정책, 체감도를 높이려면 무엇부터 바뀌어야 할까?',
    reason: '표현 수위 문제',
    description: '댓글 흐름에서 특정 집단을 향한 비난 표현이 반복된다는 신고가 접수됐습니다.',
    reporter: '민서윤',
    reportedAt: '2026-05-27T18:40:00',
    status: 'new',
    priority: 'high',
  },
  {
    id: 'report-2',
    targetType: 'live-room',
    targetPath: '/live/room-1',
    targetTitle: '오늘의 토론방 1 · 정책 토론에서 감정 표현은 어디까지 허용되어야 할까?',
    reason: '토론 규칙 위반',
    description: '실시간 토론 중 발언 시간이 과도하게 초과되었고 제지 요청이 있었다는 신고입니다.',
    reporter: '이다연',
    reportedAt: '2026-05-27T19:42:00',
    status: 'reviewing',
    priority: 'medium',
    assignedAdmin: '박지원',
  },
  {
    id: 'report-3',
    targetType: 'chat-message',
    targetPath: '/live/room-1',
    targetTitle: 'room-1 실시간 채팅 메시지',
    reason: '허위 정보',
    description: '출처가 불명확한 통계 수치를 사실처럼 반복 게시한 메시지 신고입니다.',
    reporter: '한유진',
    reportedAt: '2026-05-27T19:50:00',
    status: 'reviewing',
    priority: 'medium',
    assignedAdmin: '박지원',
  },
  {
    id: 'report-4',
    targetType: 'user',
    targetTitle: '사용자 김서우',
    reason: '반복적인 도발',
    description: '여러 토론방과 커뮤니티 글에서 유사한 도발성 표현을 반복한다는 누적 신고입니다.',
    reporter: '강지윤',
    reportedAt: '2026-05-27T17:22:00',
    status: 'resolved',
    priority: 'low',
    assignedAdmin: '이도현',
  },
];

