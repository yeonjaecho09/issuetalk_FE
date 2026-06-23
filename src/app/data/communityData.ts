export type CommunityCategory = '전체' | '정책 제안' | '이슈 브리핑' | '자유 토론' | '모집' | '공지';

export type CommunityPostPreview = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  category: CommunityCategory;
  likes: number;
  comments: number;
  views: number;
  createdAt: string;
  isPinned?: boolean;
  isHidden?: boolean;
};

export type CommunityComment = {
  id: string;
  author: string;
  body: string;
  createdAt: string;
};

export type CreateCommunityPostInput = {
  title: string;
  body: string;
  category: Exclude<CommunityCategory, '전체'>;
  author?: string;
};

const STORAGE_KEY = 'issuetalk.community.posts';
const HIDDEN_POST_IDS_KEY = 'issuetalk.community.hiddenPostIds';
const COMMENT_STORAGE_KEY = 'issuetalk.community.comments';
const LIKE_STORAGE_KEY = 'issuetalk.community.likes';
const VIEW_STORAGE_KEY = 'issuetalk.community.views';

export const communityCategories: CommunityCategory[] = ['전체', '정책 제안', '이슈 브리핑', '자유 토론', '모집', '공지'];

const defaultCommunityPosts: CommunityPostPreview[] = [
  {
    id: 'community-1',
    title: '청년 주거 정책, 체감도를 높이려면 무엇부터 바뀌어야 할까?',
    excerpt: '지원 규모를 늘리는 것만큼 신청 절차를 단순하게 만드는 일도 중요하다는 의견이 많습니다.',
    body:
      '청년 주거 정책은 계속 확대되고 있지만 실제 체감은 낮다는 이야기가 많습니다.\n\n신청 자격이 복잡하고 제출 서류가 많아, 시도를 해도 정작 필요한 분들이 중간에 포기하는 경우가 자주 보입니다.\n\n여러분은 체감도를 높이기 위해 어떤 부분이 먼저 바뀌어야 한다고 보시나요? 신청 방식, 정보 전달, 지원 범위 가운데 가장 시급한 지점을 중심으로 이야기해보면 좋겠습니다.',
    author: '민서윤',
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
    excerpt: '근로시간 제도 개편 관련 기사와 해설 자료를 한 번에 보기 좋게 정리했습니다.',
    body:
      '이번 주 노동 이슈 가운데 반응이 컸던 기사와 해설 자료를 한 번에 볼 수 있도록 정리했습니다.\n\n근로시간 제도 개편, 플랫폼 노동 보호, 최저임금 논의까지 서로 연결되는 흐름이 많아 토론 전에 배경지식을 빠르게 훑고 싶은 분들께 도움이 될 것 같습니다.\n\n빠진 기사나 참고할 만한 자료가 있으면 댓글로 이어서 보완해 주세요.',
    author: '정하린',
    category: '이슈 브리핑',
    likes: 89,
    comments: 17,
    views: 756,
    createdAt: '2026-05-18T21:10:00',
  },
  {
    id: 'community-3',
    title: '기후 정책 자료 읽기 스터디 같이 하실 분 있을까요?',
    excerpt: '매주 한 번 온라인으로 자료를 읽고 핵심 쟁점만 정리하는 작은 스터디를 열어보려 합니다.',
    body:
      '기후 정책 관련 문서를 읽다 보면 용어와 방향이 어렵게 느껴질 때가 많습니다.\n\n그래서 매주 한 번 온라인으로 자료를 읽고 핵심 쟁점만 짧게 정리하는 스터디를 열어보려 합니다. 정책 문서를 처음 접하는 분도 편하게 참여할 수 있게 구성해보려고 해요.\n\n참여 의향이 있는 분은 댓글로 남겨주시면 일정과 방식도 함께 맞춰보겠습니다.',
    author: '최세은',
    category: '모집',
    likes: 63,
    comments: 22,
    views: 501,
    createdAt: '2026-05-18T14:40:00',
  },
  {
    id: 'community-4',
    title: '커뮤니티 이용 가이드와 공지 기준을 다시 한 번 안내드립니다',
    excerpt: '서로 다른 입장을 나누는 공간일수록 표현 방식과 근거 제시가 중요합니다.',
    body:
      '커뮤니티가 커질수록 기본적인 이용 가이드와 공지 기준을 분명하게 안내할 필요가 있어 보입니다.\n\n서로 다른 입장을 나누는 공간인 만큼, 표현 방식과 근거 제시가 특히 중요합니다. 인신공격, 혐오 표현, 허위 정보 유포는 운영 기준에 따라 제한될 수 있습니다.\n\n공지 게시글 상세에도 관련 기준을 정리해둘 예정이니 이용 전에 한 번씩 확인해 주세요.',
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
    title: '플랫폼 노동 규제, 사용자 편의와 보호를 어떻게 같이 잡을 수 있을까?',
    excerpt: '서비스 접근성과 종사자 보호가 동시에 가능하려면 어떤 장치가 필요한지 묻고 싶습니다.',
    body:
      '플랫폼 서비스는 이미 일상 깊이 들어와 있지만 규제를 강화하자는 의견과 사용자 편의를 유지해야 한다는 의견이 자주 충돌합니다.\n\n두 가치가 반드시 반대만 되는 것은 아니고, 제도를 어떻게 설계하느냐에 따라 체감이 달라질 수 있다고 생각합니다.\n\n여러분은 어떤 균형점이 가장 현실적이라고 보시나요?',
    author: '이도현',
    category: '자유 토론',
    likes: 97,
    comments: 31,
    views: 1188,
    createdAt: '2026-05-16T19:30:00',
  },
  {
    id: 'community-6',
    title: '청년 정치 참여 캠페인 아이디어 같이 브레인스토밍해요',
    excerpt: '온라인 참여를 실제 행동으로 이어지게 만드는 장치가 무엇일지 함께 이야기해 보고 싶습니다.',
    body:
      '좋아요나 댓글처럼 온라인 반응은 많이 모이는데, 실제 행동으로 이어지지 않는 경우가 많다는 점이 늘 아쉽습니다.\n\n그래서 청년 정치 참여를 조금 더 생활 가까이 가져오는 캠페인 아이디어를 함께 브레인스토밍해보면 좋겠어요.\n\n작은 실험이어도 좋고, 학교나 지역 단위에서 바로 시도할 수 있는 방식이면 더 좋겠습니다.',
    author: '서연우',
    category: '모집',
    likes: 112,
    comments: 29,
    views: 954,
    createdAt: '2026-05-12T20:10:00',
  },
];

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readStoredPosts(): CommunityPostPreview[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isCommunityPostPreview);
  } catch {
    return [];
  }
}

function writeStoredPosts(posts: CommunityPostPreview[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function readHiddenPostIds() {
  if (!isBrowser()) return [] as string[];

  try {
    const raw = window.localStorage.getItem(HIDDEN_POST_IDS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((value): value is string => typeof value === 'string');
  } catch {
    return [];
  }
}

function writeHiddenPostIds(postIds: string[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(HIDDEN_POST_IDS_KEY, JSON.stringify(postIds));
}

function readCommentMap() {
  if (!isBrowser()) return {} as Record<string, CommunityComment[]>;

  try {
    const raw = window.localStorage.getItem(COMMENT_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};

    return Object.fromEntries(
      Object.entries(parsed).map(([postId, comments]) => [
        postId,
        Array.isArray(comments) ? comments.filter(isCommunityComment) : [],
      ]),
    );
  } catch {
    return {};
  }
}

function writeCommentMap(commentMap: Record<string, CommunityComment[]>) {
  if (!isBrowser()) return;
  window.localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(commentMap));
}

function readLikeMap() {
  if (!isBrowser()) return {} as Record<string, string[]>;

  try {
    const raw = window.localStorage.getItem(LIKE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};

    return Object.fromEntries(
      Object.entries(parsed).map(([postId, actorIds]) => [
        postId,
        Array.isArray(actorIds) ? actorIds.filter((value): value is string => typeof value === 'string') : [],
      ]),
    );
  } catch {
    return {};
  }
}

function writeLikeMap(likeMap: Record<string, string[]>) {
  if (!isBrowser()) return;
  window.localStorage.setItem(LIKE_STORAGE_KEY, JSON.stringify(likeMap));
}

function readViewMap() {
  if (!isBrowser()) return {} as Record<string, string[]>;

  try {
    const raw = window.localStorage.getItem(VIEW_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};

    return Object.fromEntries(
      Object.entries(parsed).map(([postId, actorIds]) => [
        postId,
        Array.isArray(actorIds) ? actorIds.filter((value): value is string => typeof value === 'string') : [],
      ]),
    );
  } catch {
    return {};
  }
}

function writeViewMap(viewMap: Record<string, string[]>) {
  if (!isBrowser()) return;
  window.localStorage.setItem(VIEW_STORAGE_KEY, JSON.stringify(viewMap));
}

function isCommunityPostPreview(value: unknown): value is CommunityPostPreview {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const item = value as Record<string, unknown>;
  return (
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.excerpt === 'string' &&
    typeof item.body === 'string' &&
    typeof item.author === 'string' &&
    typeof item.category === 'string' &&
    typeof item.likes === 'number' &&
    typeof item.comments === 'number' &&
    typeof item.views === 'number' &&
    typeof item.createdAt === 'string'
  );
}

function isCommunityComment(value: unknown): value is CommunityComment {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const item = value as Record<string, unknown>;
  return (
    typeof item.id === 'string' &&
    typeof item.author === 'string' &&
    typeof item.body === 'string' &&
    typeof item.createdAt === 'string'
  );
}

function buildExcerpt(body: string) {
  const normalized = body
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\((?:data:image\/[^)\s]+|https?:\/\/[^)\s]+)\)/g, ' ')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '$1')
    .replace(/(\*\*|\*|~~|`|#+\s|>\s|- )/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return normalized.length > 90 ? `${normalized.slice(0, 90)}...` : normalized;
}

export function getCommunityPosts() {
  const hiddenPostIds = new Set(readHiddenPostIds());
  const commentMap = readCommentMap();
  const likeMap = readLikeMap();
  const viewMap = readViewMap();

  return [...readStoredPosts(), ...defaultCommunityPosts]
    .filter(post => !hiddenPostIds.has(post.id))
    .map(post => ({
      ...post,
      likes: post.likes + (likeMap[post.id]?.length ?? 0),
      comments: post.comments + (commentMap[post.id]?.length ?? 0),
      views: post.views + (viewMap[post.id]?.length ?? 0),
      isHidden: false,
    }));
}

export function getCommunityPostsForAdmin() {
  const hiddenPostIds = new Set(readHiddenPostIds());
  const commentMap = readCommentMap();
  const likeMap = readLikeMap();
  const viewMap = readViewMap();

  return [...readStoredPosts(), ...defaultCommunityPosts].map(post => ({
    ...post,
    likes: post.likes + (likeMap[post.id]?.length ?? 0),
    comments: post.comments + (commentMap[post.id]?.length ?? 0),
    views: post.views + (viewMap[post.id]?.length ?? 0),
    isHidden: hiddenPostIds.has(post.id),
  }));
}

export function createCommunityPost(input: CreateCommunityPostInput) {
  const post: CommunityPostPreview = {
    id: `community-user-${Date.now()}`,
    title: input.title.trim(),
    excerpt: buildExcerpt(input.body),
    body: input.body.trim(),
    author: input.author?.trim() || '민서윤',
    category: input.category,
    likes: 0,
    comments: 0,
    views: 0,
    createdAt: new Date().toISOString(),
  };

  const stored = readStoredPosts();
  writeStoredPosts([post, ...stored]);
  return post;
}

export function getCommunityPostById(id: string) {
  return getCommunityPosts().find(post => post.id === id);
}

export function getCommunityComments(postId: string) {
  return [...(readCommentMap()[postId] ?? [])].sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
}

export function addCommunityComment(postId: string, input: Omit<CommunityComment, 'id' | 'createdAt'>) {
  const commentMap = readCommentMap();
  const nextComment: CommunityComment = {
    id: `community-comment-${Date.now()}`,
    author: input.author.trim(),
    body: input.body.trim(),
    createdAt: new Date().toISOString(),
  };

  commentMap[postId] = [nextComment, ...(commentMap[postId] ?? [])];
  writeCommentMap(commentMap);
  return nextComment;
}

export function hasLikedCommunityPost(postId: string, actorId: string) {
  return readLikeMap()[postId]?.includes(actorId) ?? false;
}

export function toggleCommunityPostLike(postId: string, actorId: string) {
  const likeMap = readLikeMap();
  const currentActorIds = new Set(likeMap[postId] ?? []);

  if (currentActorIds.has(actorId)) {
    currentActorIds.delete(actorId);
  } else {
    currentActorIds.add(actorId);
  }

  likeMap[postId] = [...currentActorIds];
  writeLikeMap(likeMap);
  return currentActorIds.has(actorId);
}

export function incrementCommunityPostView(postId: string, actorId: string) {
  const viewMap = readViewMap();
  const currentActorIds = new Set(viewMap[postId] ?? []);

  if (currentActorIds.has(actorId)) {
    return false;
  }

  currentActorIds.add(actorId);
  viewMap[postId] = [...currentActorIds];
  writeViewMap(viewMap);
  return true;
}

export function hideCommunityPost(postId: string) {
  const hiddenIds = new Set(readHiddenPostIds());
  hiddenIds.add(postId);
  writeHiddenPostIds([...hiddenIds]);
}

export function restoreCommunityPost(postId: string) {
  const hiddenIds = readHiddenPostIds().filter(id => id !== postId);
  writeHiddenPostIds(hiddenIds);
}