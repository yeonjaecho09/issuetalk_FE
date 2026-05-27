export type CommunityCategory =
  | '전체'
  | '정책 제안'
  | '이슈 브리핑'
  | '자유 토론'
  | '모집'
  | '공지';

export type CommunityPostPreview = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: CommunityCategory;
  likes: number;
  comments: number;
  views: number;
  createdAt: string;
  isPinned?: boolean;
};

export const communityCategories: CommunityCategory[] = ['전체', '정책 제안', '이슈 브리핑', '자유 토론', '모집', '공지'];

export const communityPosts: CommunityPostPreview[] = [
  {
    id: 'community-1',
    title: '청년 주거 지원 정책, 체감도를 높이려면 무엇이 먼저일까요?',
    excerpt:
      '지원 대상을 넓히는 것보다 신청 절차를 단순화하는 쪽이 더 시급하다는 의견이 많습니다. 실제 경험 기준으로 가장 불편했던 지점을 나눠주세요.',
    author: '민지윤',
    category: '정책 제안',
    likes: 124,
    comments: 38,
    views: 1204,
    createdAt: '2026-05-19T10:20:00',
    isPinned: true,
  },
  {
    id: 'community-2',
    title: '이번 주 노동 이슈 브리핑 요약본 공유합니다',
    excerpt:
      '근로시간 제도 개편 관련 기사와 해설 자료를 한 번에 볼 수 있도록 정리했습니다. 토론 전에 배경지식 빠르게 훑고 싶은 분들께 추천해요.',
    author: '정하람',
    category: '이슈 브리핑',
    likes: 89,
    comments: 17,
    views: 756,
    createdAt: '2026-05-18T21:10:00',
  },
  {
    id: 'community-3',
    title: '기후 정책 토론 스터디 같이 하실 분 있을까요?',
    excerpt:
      '매주 한 번씩 온라인으로 자료 읽고 쟁점을 정리하는 소규모 스터디를 열어보려고 합니다. 정책 문서 읽는 데 부담 없는 분이면 누구나 좋아요.',
    author: '최세은',
    category: '모집',
    likes: 63,
    comments: 22,
    views: 501,
    createdAt: '2026-05-18T14:40:00',
  },
  {
    id: 'community-4',
    title: '커뮤니티 이용 가이드와 신고 기준을 다시 한 번 안내드립니다',
    excerpt:
      '서로 다른 입장을 다루는 공간인 만큼 표현 방식과 근거 제시가 중요합니다. 운영 원칙과 신고 처리 기준을 이해하기 쉽게 업데이트했습니다.',
    author: '운영팀',
    category: '공지',
    likes: 42,
    comments: 9,
    views: 932,
    createdAt: '2026-05-17T09:00:00',
    isPinned: true,
  },
  {
    id: 'community-5',
    title: '플랫폼 노동 규제, 사용자 편익과 어떻게 균형을 맞춰야 할까요?',
    excerpt:
      '서비스 접근성과 종사자 보호가 동시에 가능하려면 어떤 장치가 필요한지 궁금합니다. 해외 사례를 본 분들 의견도 듣고 싶어요.',
    author: '이도윤',
    category: '자유 토론',
    likes: 97,
    comments: 31,
    views: 1188,
    createdAt: '2026-05-16T19:30:00',
  },
  {
    id: 'community-6',
    title: '지역 돌봄 정책 사례 모음, 참고 자료 남깁니다',
    excerpt:
      '지자체별로 시도 중인 돌봄 정책을 간단히 비교 정리했습니다. 토론 주제 확장할 때 참고용으로 써도 좋을 것 같아요.',
    author: '박서후',
    category: '이슈 브리핑',
    likes: 58,
    comments: 12,
    views: 643,
    createdAt: '2026-05-15T08:15:00',
  },
];
