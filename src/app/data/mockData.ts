import type { Comment, LiveDebate, Post } from '../types';

export const mockPosts: Post[] = [
  {
    id: 'p1',
    type: 'community',
    title: '최근 기본소득 논의, 어떻게 생각하시나요?',
    content: '여러 지자체에서 기본소득 실험사업을 진행하고 있는데 실제로 효과가 있을까요? 재원 마련 방법도 궁금합니다.',
    author: { id: 'u1', name: '김시민' },
    category: '경제',
    likes: 142,
    commentCount: 34,
    views: 892,
    createdAt: new Date('2026-04-23T08:30:00'),
  },
  {
    id: 'p2',
    type: 'debate-topic',
    title: '주 4일 근무제, 한국 사회에서도 가능할까?',
    content: '해외에서 성공적으로 시행하고 있는 주 4일 근무제가 한국의 기업 문화와 경제 구조에서도 실현 가능할지 이야기해봅시다.',
    author: { id: 'u2', name: '박워라밸' },
    category: '노동',
    likes: 267,
    commentCount: 78,
    views: 1543,
    createdAt: new Date('2026-04-22T14:20:00'),
    isPinned: true,
  },
  {
    id: 'p3',
    type: 'community',
    title: '청년 주거 문제, 어떻게 해결해야 할까요?',
    content: '전세 사기부터 월세 부담까지, 청년들의 주거 문제가 심각합니다. 공공주택 확대와 주거 수당 지급 중 어떤 방향이 더 현실적일까요?',
    author: { id: 'u3', name: '이주거' },
    category: '주거',
    likes: 189,
    commentCount: 56,
    views: 1234,
    createdAt: new Date('2026-04-22T10:15:00'),
  },
  {
    id: 'p4',
    type: 'community',
    title: '탄소중립 정책, 실효성이 있을까?',
    content: '2050 탄소중립 목표를 외치지만 실제 달성 가능성에는 여전히 많은 의문이 있습니다. 여러분은 어떤 점이 가장 중요하다고 보시나요?',
    author: { id: 'u4', name: '최환경' },
    category: '환경',
    likes: 156,
    commentCount: 45,
    views: 987,
    createdAt: new Date('2026-04-21T16:40:00'),
  },
  {
    id: 'p5',
    type: 'debate-topic',
    title: 'AI 시대, 기본소득은 필수가 될까?',
    content: 'AI가 일자리를 대체하면서 기본소득 논의가 다시 힘을 얻고 있습니다. 과연 기본소득이 사회 안전망의 해답이 될까요?',
    author: { id: 'u5', name: '정미래' },
    category: '경제',
    likes: 298,
    commentCount: 92,
    views: 2341,
    createdAt: new Date('2026-04-21T09:00:00'),
  },
];

export const todayDebateTopic = mockPosts.find(post => post.id === 'p2')!;

export const mockLiveDebate: LiveDebate = {
  id: 'ld1',
  topic: todayDebateTopic,
  debater1: { id: 'd1', name: '찬성론자A' },
  debater2: { id: 'd2', name: '반대론자B' },
  status: 'live',
  startTime: new Date('2026-04-23T14:00:00'),
  messages: [
    {
      id: 'm1',
      debaterId: 'd1',
      content: '주 4일 근무제는 생산성 향상과 삶의 질 개선이라는 두 마리 토끼를 잡을 수 있습니다.',
      timestamp: new Date('2026-04-23T14:01:00'),
    },
    {
      id: 'm2',
      debaterId: 'd2',
      content: '이론적으로는 좋지만 중소기업의 현실을 고려하지 않은 주장입니다. 인력 부족 문제는 어떻게 해결할까요?',
      timestamp: new Date('2026-04-23T14:02:30'),
    },
    {
      id: 'm3',
      debaterId: 'd1',
      content: '시범 도입으로 일자리 나누기 효과가 생기고 고용도 늘어날 수 있습니다. 해외 사례를 보면 그렇습니다.',
      timestamp: new Date('2026-04-23T14:04:15'),
    },
    {
      id: 'm4',
      debaterId: 'd2',
      content: '해외 사례와 한국의 산업 구조는 다릅니다. 특히 제조업 비중이 높은 상황에서는 신중해야 합니다.',
      timestamp: new Date('2026-04-23T14:05:45'),
    },
  ],
  votes: {
    debater1: 342,
    debater2: 289,
  },
  viewers: 1247,
};

export const upcomingDebates: LiveDebate[] = [
  {
    id: 'ld2',
    topic: mockPosts.find(post => post.id === 'p5')!,
    debater1: { id: 'd3', name: '경제학자C' },
    debater2: { id: 'd4', name: '정책전문가D' },
    status: 'scheduled',
    startTime: new Date('2026-04-23T16:00:00'),
    messages: [],
    votes: {
      debater1: 0,
      debater2: 0,
    },
    viewers: 0,
  },
];

export const pastDebates: LiveDebate[] = [
  {
    id: 'ld3',
    topic: {
      id: 'p99',
      type: 'debate-topic',
      title: '대학 등록금 반값, 실현 가능한가?',
      content: '대학 등록금 부담이 청년들의 경제적 진입 장벽이 되고 있습니다. 반값 등록금 정책이 현실적으로 가능한지 토론합니다.',
      author: { id: 'u99', name: '김학생' },
      category: '교육',
      likes: 234,
      commentCount: 67,
      views: 1890,
      createdAt: new Date('2026-04-20T10:00:00'),
    },
    debater1: { id: 'd5', name: '교육정책가 이민수' },
    debater2: { id: 'd6', name: '재정전문가 박예산' },
    status: 'ended',
    startTime: new Date('2026-04-22T14:00:00'),
    endTime: new Date('2026-04-22T15:00:00'),
    messages: [
      { id: 'pm1', debaterId: 'd5', content: '교육은 공공재에 가깝습니다. 등록금 부담 완화는 반드시 필요합니다.', timestamp: new Date('2026-04-22T14:01:00') },
      { id: 'pm2', debaterId: 'd6', content: '이상적인 목표지만 재원 조달을 구체적으로 따져봐야 합니다.', timestamp: new Date('2026-04-22T14:03:00') },
      { id: 'pm3', debaterId: 'd5', content: '교육 투자 확대와 세제 조정으로 충분히 접근할 수 있습니다.', timestamp: new Date('2026-04-22T14:06:00') },
      { id: 'pm4', debaterId: 'd6', content: '무조건적인 지원보다 더 정밀한 선별 지원이 효율적일 수 있습니다.', timestamp: new Date('2026-04-22T14:09:00') },
    ],
    votes: {
      debater1: 456,
      debater2: 378,
    },
    viewers: 0,
  },
  {
    id: 'ld4',
    topic: {
      id: 'p98',
      type: 'debate-topic',
      title: '플라스틱 규제 강화, 어디까지 해야 하나?',
      content: '환경 보호를 위한 플라스틱 사용 규제가 강화되고 있습니다. 경제적 비용과 환경 보호 사이의 균형은 어디에 있을까요?',
      author: { id: 'u98', name: '최환경' },
      category: '환경',
      likes: 189,
      commentCount: 52,
      views: 1456,
      createdAt: new Date('2026-04-19T09:00:00'),
    },
    debater1: { id: 'd7', name: '환경운동가 정그린' },
    debater2: { id: 'd8', name: '제조업계 대표 김산업' },
    status: 'ended',
    startTime: new Date('2026-04-21T14:00:00'),
    endTime: new Date('2026-04-21T15:00:00'),
    messages: [
      { id: 'pm7', debaterId: 'd7', content: '일회용 플라스틱 사용 감축은 더 이상 미룰 수 없습니다.', timestamp: new Date('2026-04-21T14:01:00') },
      { id: 'pm8', debaterId: 'd8', content: '규제 속도 조절 없이 산업계에 부담을 전가하면 부작용이 큽니다.', timestamp: new Date('2026-04-21T14:04:00') },
      { id: 'pm9', debaterId: 'd7', content: '환경 비용을 생각하면 전환을 위한 지금의 투자가 더 합리적입니다.', timestamp: new Date('2026-04-21T14:07:00') },
      { id: 'pm10', debaterId: 'd8', content: '규제와 기술 지원이 함께 가야 실질적인 변화가 가능합니다.', timestamp: new Date('2026-04-21T14:10:00') },
    ],
    votes: {
      debater1: 523,
      debater2: 412,
    },
    viewers: 0,
  },
  {
    id: 'ld5',
    topic: {
      id: 'p97',
      type: 'debate-topic',
      title: '최저임금 1만원 시대, 준비됐나?',
      content: '최저임금 인상으로 노동자의 삶이 개선될지, 아니면 고용이 줄어들지 논의합니다.',
      author: { id: 'u97', name: '노동자A' },
      category: '노동',
      likes: 312,
      commentCount: 88,
      views: 2103,
      createdAt: new Date('2026-04-18T08:00:00'),
    },
    debater1: { id: 'd9', name: '노동운동가 강권리' },
    debater2: { id: 'd10', name: '자영업자 연합 윤사장' },
    status: 'ended',
    startTime: new Date('2026-04-20T14:00:00'),
    endTime: new Date('2026-04-20T15:00:00'),
    messages: [
      { id: 'pm11', debaterId: 'd9', content: '생계비를 고려하면 최저임금 인상은 더 이상 미룰 수 없습니다.', timestamp: new Date('2026-04-20T14:02:00') },
      { id: 'pm12', debaterId: 'd10', content: '영세 자영업자의 인건비 부담도 함께 고려되어야 합니다.', timestamp: new Date('2026-04-20T14:05:00') },
      { id: 'pm13', debaterId: 'd9', content: '구매력 상승이 내수 진작으로 이어질 수 있습니다.', timestamp: new Date('2026-04-20T14:08:00') },
      { id: 'pm14', debaterId: 'd10', content: '급격한 변화는 오히려 고용 축소를 부를 수 있습니다.', timestamp: new Date('2026-04-20T14:11:00') },
    ],
    votes: {
      debater1: 398,
      debater2: 445,
    },
    viewers: 0,
  },
];

export const mockComments: Record<string, Comment[]> = {
  p1: [
    {
      id: 'c1',
      content: '기본소득보다는 선별적 복지가 더 효과적이라고 생각합니다.',
      author: { id: 'u10', name: '윤복지' },
      likes: 12,
      createdAt: new Date('2026-04-23T09:00:00'),
    },
    {
      id: 'c2',
      content: '재원 마련 논의가 빠지면 결국 현실성이 떨어질 수밖에 없어요.',
      author: { id: 'u11', name: '강재정' },
      likes: 8,
      createdAt: new Date('2026-04-23T09:30:00'),
    },
  ],
};

export const mockCommunityPosts = mockPosts
  .filter(post => post.type === 'community')
  .map(post => ({
    ...post,
    comments: post.commentCount,
  }));

export const mockDebates = pastDebates.map((debate, index) => ({
  id: debate.id,
  title: debate.topic.title,
  description: debate.topic.content,
  topic: debate.topic.category,
  category: debate.topic.category,
  author: {
    ...debate.debater1,
    role: index % 2 === 0 ? '찬성 패널' : '토론 패널',
  },
  participants: debate.votes.debater1 + debate.votes.debater2,
  comments: debate.messages.length,
  likes: debate.topic.likes,
  views: debate.topic.views,
  isHot: index < 2,
  createdAt: debate.startTime,
}));

export const mockDiscussions = mockPosts.map((post, index) => ({
  id: post.id,
  title: post.title,
  content: post.content,
  category: post.category,
  author: post.author,
  likes: post.likes,
  comments: post.commentCount,
  views: post.views,
  createdAt: post.createdAt,
  isPinned: Boolean(post.isPinned),
  tags: [post.category, post.type === 'debate-topic' ? '토론' : '커뮤니티', index % 2 === 0 ? '이슈' : '의견'],
}));
