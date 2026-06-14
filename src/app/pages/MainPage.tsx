import { useMemo } from 'react';
import { getCommunityPosts } from '../data/communityData';
import { applyRuntimeToRoom } from '../data/liveDebateRuntime';
import { getLiveDebateRooms, TODAY_DEBATE_TOPIC } from '../data/liveDebateRooms';
import { MainPageContent } from '../features/main/components/MainPageContent';

export function MainPage() {
  const liveDebate = useMemo(() => getLiveDebateRooms().map(room => applyRuntimeToRoom(room)).find(room => room.status === 'live') ?? null, []);
  const hottestCommunityPosts = useMemo(
    () =>
      [...getCommunityPosts()]
        .sort((a, b) => b.likes * 3 + b.comments * 4 + b.views - (a.likes * 3 + a.comments * 4 + a.views))
        .slice(0, 10),
    [],
  );

  return (
    <MainPageContent
      liveDebate={liveDebate}
      topicTitle={TODAY_DEBATE_TOPIC}
      topicDescription="오늘의 핵심 이슈를 확인하고, 실시간 토론과 인기 커뮤니티 글로 바로 이어질 수 있습니다."
      hottestCommunityPosts={hottestCommunityPosts}
    />
  );
}

