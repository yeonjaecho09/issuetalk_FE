export interface User {
  id: string;
  name: string;
  avatar?: string;
}

// 일반 커뮤니티 게시글
export interface Post {
  id: string;
  type: 'community' | 'debate-topic';
  title: string;
  content: string;
  author: User;
  category: string;
  likes: number;
  commentCount: number;
  views: number;
  createdAt: Date;
  isPinned?: boolean;
}

// 실시간 1:1 토론
export interface LiveDebate {
  id: string;
  topic: Post; // 토론 주제가 된 게시글
  debater1: User;
  debater2: User;
  status: 'scheduled' | 'live' | 'ended';
  startTime: Date;
  endTime?: Date;
  messages: DebateMessage[];
  votes: {
    debater1: number;
    debater2: number;
  };
  viewers: number;
}

// 토론 채팅 메시지
export interface DebateMessage {
  id: string;
  debaterId: string;
  content: string;
  timestamp: Date;
}

// 댓글
export interface Comment {
  id: string;
  content: string;
  author: User;
  likes: number;
  createdAt: Date;
  replies?: Comment[];
}
