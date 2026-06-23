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
      hottestCommunityPosts={hottestCommunityPosts}
    />
  );
}

