import { PageContainer, SurfaceCard } from '../../../components/ui/primitives';
import type { LiveDebate } from '../../../types';
import {
  BackLink,
  DetailGrid,
  MessageCard,
  MessageHeader,
  MessageList,
  MessageRow,
  MessageSpeakerMeta,
  MessageText,
  MessageTimestamp,
  MetaCard,
  MetaRow,
  NotFoundActions,
  SectionCard,
  SectionTitleRow,
  SideColumn,
  SummaryBadge,
  SummaryCard,
  SummaryMetaCard,
  SummaryMetaGrid,
  SummaryMetaLabel,
  SummaryMetaValue,
  SummaryText,
  SummaryTitle,
  SummaryTopRow,
  VoteBar,
  VoteCard,
  VoteFillAccent,
  VoteFillPrimary,
  VoteFillRow,
  VoteMetaRow,
} from './PastDebateDetailContent.styles';

type PastDebateDetailContentProps = {
  debate: LiveDebate | null;
};

function formatDate(date: Date) {
  return date.toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function PastDebateDetailContent({ debate }: PastDebateDetailContentProps) {
  if (!debate) {
    return (
      <PageContainer>
        <SurfaceCard>
          <strong>지난 토론을 찾을 수 없습니다.</strong>
          <NotFoundActions>
            <BackLink to="/past-debates">지난 토론 목록으로 돌아가기</BackLink>
          </NotFoundActions>
        </SurfaceCard>
      </PageContainer>
    );
  }

  const totalVotes = debate.votes.debater1 + debate.votes.debater2;
  const debater1Percent = totalVotes === 0 ? 50 : (debate.votes.debater1 / totalVotes) * 100;
  const debater2Percent = totalVotes === 0 ? 50 : (debate.votes.debater2 / totalVotes) * 100;
  const winner = debate.votes.debater1 >= debate.votes.debater2 ? `${debate.debater1.name} (찬성)` : `${debate.debater2.name} (반대)`;

  return (
    <PageContainer>
      <BackLink to="/past-debates">지난 토론 목록으로 돌아가기</BackLink>

      <SummaryCard>
        <SummaryTopRow>
          <SummaryBadge>{debate.topic.category}</SummaryBadge>
          <SummaryBadge>토론 종료</SummaryBadge>
        </SummaryTopRow>
        <SummaryTitle>{debate.topic.title}</SummaryTitle>
        <SummaryText>{debate.topic.content}</SummaryText>
        <SummaryMetaGrid>
          <SummaryMetaCard>
            <SummaryMetaLabel>대진</SummaryMetaLabel>
            <SummaryMetaValue>
              {debate.debater1.name} vs {debate.debater2.name}
            </SummaryMetaValue>
          </SummaryMetaCard>
          <SummaryMetaCard>
            <SummaryMetaLabel>최종 우세</SummaryMetaLabel>
            <SummaryMetaValue>{winner}</SummaryMetaValue>
          </SummaryMetaCard>
          <SummaryMetaCard>
            <SummaryMetaLabel>누적 발언</SummaryMetaLabel>
            <SummaryMetaValue>{debate.messages.length}개</SummaryMetaValue>
          </SummaryMetaCard>
        </SummaryMetaGrid>
      </SummaryCard>

      <DetailGrid>
        <SectionCard>
          <SectionTitleRow>
            <strong>토론 채팅 기록</strong>
            <span>{debate.messages.length}개의 주요 발언</span>
          </SectionTitleRow>
          <MessageList>
            {debate.messages.map(message => {
              const isDebater1 = message.debaterId === debate.debater1.id;
              const align = isDebater1 ? 'left' : 'right';
              const side = isDebater1 ? 'pro' : 'con';
              const sideLabel = isDebater1 ? '찬성측' : '반대측';
              const speakerName = isDebater1 ? debate.debater1.name : debate.debater2.name;

              return (
                <MessageRow key={message.id} $align={align}>
                  <MessageCard $align={align} $side={side}>
                    <MessageHeader>
                      <MessageSpeakerMeta $side={side}>
                        {sideLabel} · {speakerName}
                      </MessageSpeakerMeta>
                      <MessageTimestamp>{formatTime(message.timestamp)}</MessageTimestamp>
                    </MessageHeader>
                    <MessageText>{message.content}</MessageText>
                  </MessageCard>
                </MessageRow>
              );
            })}
          </MessageList>
        </SectionCard>

        <SideColumn>
          <VoteCard>
            <strong>최종 투표 결과</strong>
            <VoteBar>
              <VoteFillRow>
                <VoteFillPrimary $width={debater1Percent} />
                <VoteFillAccent $width={debater2Percent} />
              </VoteFillRow>
            </VoteBar>
            <VoteMetaRow>
              <div>
                {debate.debater1.name}: {debate.votes.debater1}표 ({debater1Percent.toFixed(0)}%)
              </div>
              <div>
                {debate.debater2.name}: {debate.votes.debater2}표 ({debater2Percent.toFixed(0)}%)
              </div>
            </VoteMetaRow>
          </VoteCard>

          <MetaCard>
            <strong>토론 정보</strong>
            <MetaRow>시작 시각 {formatDate(debate.startTime)}</MetaRow>
            <MetaRow>종료 시각 {formatDate(debate.endTime ?? debate.startTime)}</MetaRow>
            <MetaRow>총 투표 수 {totalVotes}표</MetaRow>
            <MetaRow>최대 시청자 {debate.viewers}명</MetaRow>
          </MetaCard>
        </SideColumn>
      </DetailGrid>
    </PageContainer>
  );
}
