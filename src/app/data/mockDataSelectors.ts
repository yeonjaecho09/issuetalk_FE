import type { Comment, LiveDebate, Post } from '../types';
import { mockComments, mockCommunityPosts, mockDebates, mockDiscussions, mockLiveDebate, mockPosts, pastDebates } from './mockData';

export function getCommunityPostById(id: string) {
  return mockCommunityPosts.find(post => post.id === id);
}

export function getCommunityComments(id: string): Comment[] {
  return mockComments[id] || [];
}

export function getDebateById(id: string) {
  return mockDebates.find(debate => debate.id === id);
}

export function getDebateComments(id: string): Comment[] {
  return mockComments[id] || [];
}

export function getDiscussionById(id: string) {
  return mockDiscussions.find(discussion => discussion.id === id);
}

export function getCommentsByDiscussionId(id: string): Comment[] {
  return mockComments[id] || [];
}

export function getPostById(id: string): Post | undefined {
  return mockPosts.find(post => post.id === id);
}

export function getCommentsByPostId(id: string): Comment[] {
  return mockComments[id] || [];
}

export function getLiveDebate(): LiveDebate | null {
  return mockLiveDebate.status === 'live' ? mockLiveDebate : null;
}

export function getPastDebateById(id: string): LiveDebate | undefined {
  return pastDebates.find(debate => debate.id === id);
}
