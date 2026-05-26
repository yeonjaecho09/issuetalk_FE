export type DebateRoomStatus = 'live' | 'scheduled' | 'ended';

export type DebateRoom = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  host: string;
  roundLabel: string;
  status: DebateRoomStatus;
  startTime: string;
  viewers: number;
  messagesCount: number;
  tags: string[];
  debater1: {
    id: string;
    name: string;
    stance: string;
  };
  debater2: {
    id: string;
    name: string;
    stance: string;
  };
  votes: {
    debater1: number;
    debater2: number;
  };
  messages: Array<{
    id: string;
    debaterId: string;
    content: string;
    timestamp: string;
  }>;
};

export const debateRooms: DebateRoom[] = [
  {
    id: 'room-1',
    slug: 'four-day-workweek',
    title: '주 4일제, 지금 한국에서 바로 도입 가능한가',
    summary:
      '노동 생산성과 조직 문화, 중소기업 현실까지 함께 따져보는 1:1 토론방입니다. 찬반의 근거가 선명하게 부딪히는 흐름을 지향합니다.',
    category: '노동',
    host: 'IssueTalk 편집팀',
    roundLabel: '오늘의 메인 매치',
    status: 'live',
    startTime: '2026-05-21T19:30:00',
    viewers: 1842,
    messagesCount: 148,
    tags: ['실시간', '노동', '생산성'],
    debater1: {
      id: 'debater-a1',
      name: '김현우',
      stance: '찬성',
    },
    debater2: {
      id: 'debater-a2',
      name: '박시연',
      stance: '반대',
    },
    votes: {
      debater1: 628,
      debater2: 571,
    },
    messages: [
      {
        id: 'm-1',
        debaterId: 'debater-a1',
        content: '주 4일제는 단순히 근무일을 줄이는 정책이 아니라, 성과 중심으로 일하는 방식을 다시 설계하는 문제라고 봅니다.',
        timestamp: '2026-05-21T19:31:00',
      },
      {
        id: 'm-2',
        debaterId: 'debater-a2',
        content: '대기업 중심 사례를 일반화하면 안 됩니다. 인력 여력이 부족한 현장에서는 오히려 업무 강도가 더 올라갈 수 있어요.',
        timestamp: '2026-05-21T19:33:00',
      },
      {
        id: 'm-3',
        debaterId: 'debater-a1',
        content: '그래서 업종별 도입 모델을 나눠야 합니다. 모든 조직이 같은 방식으로 움직일 필요는 없습니다.',
        timestamp: '2026-05-21T19:35:00',
      },
      {
        id: 'm-4',
        debaterId: 'debater-a2',
        content: '그렇다면 결국 제도 도입 이전에 인력 충원과 업무 표준화가 선행돼야 하는데, 그 비용을 누가 감당할지가 남습니다.',
        timestamp: '2026-05-21T19:37:00',
      },
    ],
  },
  {
    id: 'room-2',
    slug: 'platform-labor-protection',
    title: '플랫폼 노동 보호 강화, 소비자 편익보다 우선해야 하나',
    summary:
      '사용자 편의성과 종사자 권익이 충돌할 때 무엇을 우선할지 토론하는 방입니다. 규제 설계와 비용 분담을 중심 쟁점으로 다룹니다.',
    category: '산업',
    host: '시민정책랩',
    roundLabel: '인기 토론방',
    status: 'live',
    startTime: '2026-05-21T20:00:00',
    viewers: 1196,
    messagesCount: 92,
    tags: ['플랫폼', '규제', '노동권'],
    debater1: {
      id: 'debater-b1',
      name: '이서진',
      stance: '보호 강화',
    },
    debater2: {
      id: 'debater-b2',
      name: '정도혁',
      stance: '점진 도입',
    },
    votes: {
      debater1: 482,
      debater2: 355,
    },
    messages: [
      {
        id: 'm-5',
        debaterId: 'debater-b1',
        content: '서비스 속도보다 먼저 보장되어야 하는 건 노동 안전과 기본 계약 조건입니다.',
        timestamp: '2026-05-21T20:01:00',
      },
      {
        id: 'm-6',
        debaterId: 'debater-b2',
        content: '보호 필요성에는 동의하지만, 일괄 규제로 가면 서비스 접근성과 소비자 비용이 너무 급격히 바뀔 수 있습니다.',
        timestamp: '2026-05-21T20:03:00',
      },
      {
        id: 'm-7',
        debaterId: 'debater-b1',
        content: '그래서 더더욱 단계별 최소 기준이 필요합니다. 아무 기준도 없을 때 가장 취약한 사람에게 비용이 전가되니까요.',
        timestamp: '2026-05-21T20:05:00',
      },
    ],
  },
  {
    id: 'room-3',
    slug: 'carbon-tax-debate',
    title: '탄소세 확대, 지금이 도입 적기인가',
    summary:
      '기후 위기 대응의 시급성과 산업 부담 사이에서 어디까지 설계할 수 있는지 다루는 예정 토론방입니다.',
    category: '기후',
    host: '그린포럼',
    roundLabel: '곧 시작',
    status: 'scheduled',
    startTime: '2026-05-21T21:00:00',
    viewers: 284,
    messagesCount: 0,
    tags: ['탄소세', '기후', '조세'],
    debater1: {
      id: 'debater-c1',
      name: '최은서',
      stance: '도입 찬성',
    },
    debater2: {
      id: 'debater-c2',
      name: '한민재',
      stance: '도입 유보',
    },
    votes: {
      debater1: 0,
      debater2: 0,
    },
    messages: [],
  },
  {
    id: 'room-4',
    slug: 'university-tuition-freeze',
    title: '대학 등록금 동결, 더 유지해야 하나',
    summary:
      '교육비 부담과 대학 재정 악화 문제를 함께 보는 1:1 토론방입니다. 등록금, 국가 지원, 교육 질의 균형이 핵심입니다.',
    category: '교육',
    host: '캠퍼스 아젠다',
    roundLabel: '마감된 토론',
    status: 'ended',
    startTime: '2026-05-20T18:30:00',
    viewers: 0,
    messagesCount: 124,
    tags: ['교육', '등록금', '재정'],
    debater1: {
      id: 'debater-d1',
      name: '오지안',
      stance: '동결 유지',
    },
    debater2: {
      id: 'debater-d2',
      name: '윤태호',
      stance: '부분 인상',
    },
    votes: {
      debater1: 512,
      debater2: 468,
    },
    messages: [
      {
        id: 'm-8',
        debaterId: 'debater-d1',
        content: '학생과 가계의 부담을 생각하면 지금 시점에 등록금 인상 논의는 너무 빠릅니다.',
        timestamp: '2026-05-20T18:31:00',
      },
      {
        id: 'm-9',
        debaterId: 'debater-d2',
        content: '동결이 장기화되면 결국 교육 질 저하로 돌아옵니다. 국가 지원과 함께 제한적 조정이 필요합니다.',
        timestamp: '2026-05-20T18:34:00',
      },
    ],
  },
];

export function getDebateRoomById(roomId: string) {
  return debateRooms.find(room => room.id === roomId);
}
