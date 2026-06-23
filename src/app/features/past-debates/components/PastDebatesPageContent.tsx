import { Pagination } from '../../../components/ui/Pagination';
import { PageContainer } from '../../../components/ui/primitives';
import type { LiveDebate } from '../../../types';
import {
  ArchiveEyebrow,
  ArchiveHeader,
  ArchiveTitle,
  DebateLinkCard,
  DebateList,
  DebateMetaCard,
  DebateMetaGrid,
  DebateMetaLabel,
  DebateMetaValue,
  DebateTopRow,
} from './PastDebatesPageContent.styles';

type PastDebatesPageContentProps = {
  debates: LiveDebate[];
  currentDebates: LiveDebate[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

function formatDate(date: Date) {
  return date.toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getWinnerSummary(debate: LiveDebate) {
  const isDebater1Winner = debate.votes.debater1 >= debate.votes.debater2;
  return isDebater1Winner ? `${debate.debater1.name} (찬성)` : `${debate.debater2.name} (반대)`;
}

export function PastDebatesPageContent({
  debates,
  currentDebates,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
}: PastDebatesPageContentProps) {
  return (
    <PageContainer>
      <ArchiveHeader>
        <ArchiveEyebrow>지난 토론 아카이브</ArchiveEyebrow>
        <ArchiveTitle>종료된 토론 다시 보기</ArchiveTitle>
        <p>실시간 토론이 끝나면 주요 발언과 최종 투표 결과가 이곳에 자동으로 기록됩니다.</p>
      </ArchiveHeader>

      <DebateList>
        {currentDebates.map(debate => {
          const totalVotes = debate.votes.debater1 + debate.votes.debater2;

          return (
            <DebateLinkCard key={debate.id} to={`/past-debate/${debate.id}`}>
              <DebateTopRow>
                <div>
                  <strong>{debate.topic.title}</strong>
                </div>
              </DebateTopRow>

              <DebateMetaGrid>
                <DebateMetaCard>
                  <DebateMetaLabel>참여자</DebateMetaLabel>
                  <DebateMetaValue>
                    {debate.debater1.name} vs {debate.debater2.name}
                  </DebateMetaValue>
                </DebateMetaCard>
                <DebateMetaCard>
                  <DebateMetaLabel>최종 승자</DebateMetaLabel>
                  <DebateMetaValue>{getWinnerSummary(debate)}</DebateMetaValue>
                </DebateMetaCard>
                <DebateMetaCard>
                  <DebateMetaLabel>총 투표 수</DebateMetaLabel>
                  <DebateMetaValue>{totalVotes}표</DebateMetaValue>
                </DebateMetaCard>
              </DebateMetaGrid>

              <div>시작 {formatDate(debate.startTime)} · 발언 {debate.messages.length}개 · 주제 {debate.topic.category}</div>
            </DebateLinkCard>
          );
        })}
      </DebateList>

      <Pagination
        ariaLabel="지난 토론 페이지 이동"
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={debates.length}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        emptyText="아직 종료된 토론이 없습니다."
      />
    </PageContainer>
  );
}
