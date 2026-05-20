import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import { Radio, Users, ThumbsUp, TrendingUp, Trophy } from 'lucide-react';
import { getLiveDebate, pastDebates, upcomingDebates } from '../data/mockData';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[6]};
`;

const EmptyCard = styled.div`
  margin-bottom: ${props => props.theme.spacing[8]};
  padding: ${props => props.theme.spacing[12]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
  text-align: center;
`;

const EmptyIcon = styled.div`
  width: 4rem;
  height: 4rem;
  margin: 0 auto ${props => props.theme.spacing[4]};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.mutedForeground};
`;

const EmptyTitle = styled.h2`
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const EmptyText = styled.p`
  margin-bottom: ${props => props.theme.spacing[6]};
  color: ${props => props.theme.colors.mutedForeground};
`;

const PrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primaryForeground};
  font-weight: ${props => props.theme.fontWeights.semibold};

  &:hover {
    opacity: 0.92;
  }
`;

const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const TextLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.semibold};

  &:hover {
    text-decoration: underline;
  }
`;

const UpcomingList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

const UpcomingCard = styled.div`
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[3]};
`;

const Badge = styled.span<{ $accent?: boolean; $muted?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props =>
    props.$muted ? props.theme.colors.mutedForeground : props.$accent ? props.theme.colors.accent : props.theme.colors.primary};
  background-color: ${props =>
    props.$muted ? 'rgba(148, 163, 184, 0.16)' : props.$accent ? 'rgba(236, 72, 153, 0.1)' : 'rgba(99, 102, 241, 0.1)'};
`;

const UpcomingTitle = styled.h4`
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const UpcomingMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${props => props.theme.spacing[4]};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const PreviewCard = styled(Link)`
  display: block;
  padding: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
  transition: transform ${props => props.theme.transitions.fast}, box-shadow ${props => props.theme.transitions.fast}, border-color ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const PreviewRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[3]};
`;

const PreviewIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.lg};
  color: white;
  background: linear-gradient(135deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.primary});
`;

const PreviewTitle = styled.h4`
  margin-bottom: ${props => props.theme.spacing[1]};
`;

const PreviewText = styled.p`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const LiveHeader = styled.section`
  margin-bottom: ${props => props.theme.spacing[6]};
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  color: white;
  background: linear-gradient(135deg, ${props => props.theme.colors.liveRed}, ${props => props.theme.colors.accent});
  box-shadow: ${props => props.theme.shadows.lg};
`;

const LiveHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[6]};

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LiveHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
`;

const LiveIconWrap = styled.div`
  position: relative;
`;

const LiveIcon = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: rgba(255, 255, 255, 0.2);
`;

const LivePulse = styled.div`
  position: absolute;
  top: -0.2rem;
  right: -0.2rem;
  width: 1rem;
  height: 1rem;
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: white;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const LiveEyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[1]};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

const LivePill = styled.span`
  padding: 0.125rem ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: rgba(255, 255, 255, 0.2);
`;

const LiveTitle = styled.h1`
  color: white;
`;

const LiveCounters = styled.div`
  text-align: right;

  @media (max-width: 900px) {
    text-align: left;
  }
`;

const CounterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[1]};
  font-size: ${props => props.theme.fontSizes.sm};

  @media (max-width: 900px) {
    justify-content: flex-start;
  }
`;

const BigCounter = styled.div`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(300px, 1fr);
  gap: ${props => props.theme.spacing[6]};

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const DebatePanel = styled.section`
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
`;

const DebaterHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const DebaterCell = styled.div<{ $accent?: boolean }>`
  padding: ${props => props.theme.spacing[4]};
  text-align: center;
  background-color: ${props => (props.$accent ? 'rgba(236, 72, 153, 0.05)' : 'rgba(99, 102, 241, 0.05)')};
  border-right: ${props => (props.$accent ? 'none' : `1px solid ${props.theme.colors.border}`)};
`;

const DebaterAvatar = styled.div<{ $accent?: boolean }>`
  width: 4rem;
  height: 4rem;
  margin: 0 auto ${props => props.theme.spacing[2]};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.full};
  color: white;
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  background-color: ${props => (props.$accent ? props.theme.colors.accent : props.theme.colors.primary)};
`;

const DebaterName = styled.div`
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const DebaterRole = styled.div`
  margin-top: ${props => props.theme.spacing[1]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.xs};
`;

const ChatStream = styled.div`
  height: 600px;
  overflow-y: auto;
  padding: ${props => props.theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
  background-color: rgba(241, 245, 249, 0.35);
`;

const MessageRow = styled.div<{ $alignEnd?: boolean }>`
  display: flex;
  justify-content: ${props => (props.$alignEnd ? 'flex-end' : 'flex-start')};
`;

const MessageBubble = styled.div<{ $accent?: boolean }>`
  max-width: 70%;
  padding: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.xl};
  border-top-left-radius: ${props => (props.$accent ? props.theme.borderRadius.xl : '0.4rem')};
  border-top-right-radius: ${props => (props.$accent ? '0.4rem' : props.theme.borderRadius.xl)};
  color: white;
  background-color: ${props => (props.$accent ? props.theme.colors.accent : props.theme.colors.primary)};
`;

const MessageAuthor = styled.div`
  margin-bottom: ${props => props.theme.spacing[1]};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

const MessageTime = styled.div`
  margin-top: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes.xs};
  opacity: 0.75;
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[6]};
`;

const Card = styled.section`
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
`;

const CardTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const VoteActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[3]};
`;

const VoteButton = styled.button<{ $accent?: boolean }>`
  width: 100%;
  padding: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.xl};
  color: white;
  font-weight: ${props => props.theme.fontWeights.semibold};
  background-color: ${props => (props.$accent ? props.theme.colors.accent : props.theme.colors.primary)};
  transition: transform ${props => props.theme.transitions.fast}, opacity ${props => props.theme.transitions.fast};

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }
`;

const VoteSuccess = styled.div`
  padding: ${props => props.theme.spacing[4]} 0;
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 3rem;
  height: 3rem;
  margin: 0 auto ${props => props.theme.spacing[2]};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: rgba(16, 185, 129, 0.12);
  color: ${props => props.theme.colors.success};
`;

const SuccessTitle = styled.p`
  color: ${props => props.theme.colors.success};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const MutedText = styled.p`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const VoteResults = styled.div`
  margin-top: ${props => props.theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
`;

const VoteRowHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const VoteLabel = styled.span`
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

const VotePercent = styled.span<{ $accent?: boolean }>`
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => (props.$accent ? props.theme.colors.accent : props.theme.colors.primary)};
`;

const ProgressTrack = styled.div`
  height: 0.75rem;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: ${props => props.theme.colors.secondary};
`;

const ProgressFill = styled.div<{ $width: number; $accent?: boolean }>`
  width: ${props => props.$width}%;
  height: 100%;
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: ${props => (props.$accent ? props.theme.colors.accent : props.theme.colors.primary)};
  transition: width 300ms ease-in-out;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[3]};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const InfoItem = styled.div``;

const InfoLabel = styled.div`
  margin-bottom: ${props => props.theme.spacing[1]};
  color: ${props => props.theme.colors.mutedForeground};
`;

const ArchiveCard = styled(Link)`
  display: block;
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid rgba(99, 102, 241, 0.2);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.08));
  transition: transform ${props => props.theme.transitions.fast}, border-color ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(99, 102, 241, 0.45);
  }
`;

const ArchiveTitle = styled(CardTitle)`
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const ArchiveText = styled(MutedText)`
  margin-bottom: ${props => props.theme.spacing[3]};
`;

const ArchiveLinkText = styled.strong`
  color: ${props => props.theme.colors.primary};
`;

export function LiveDebatePage() {
  const liveDebate = getLiveDebate();
  const [selectedDebater, setSelectedDebater] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [liveDebate?.messages]);

  const handleVote = (debaterId: string) => {
    if (!hasVoted) {
      setSelectedDebater(debaterId);
      setHasVoted(true);
    }
  };

  const getVotePercentage = (votes: number, total: number) => Math.round((votes / total) * 100);

  if (!liveDebate) {
    return (
      <Container>
        <EmptyCard>
          <EmptyIcon>
            <Radio size={32} />
          </EmptyIcon>
          <EmptyTitle>현재 진행 중인 토론이 없습니다</EmptyTitle>
          <EmptyText>예정된 토론을 확인하거나 지난 토론을 다시 감상해보세요.</EmptyText>
          <PrimaryLink to="/past-debates">
            <Trophy size={18} />
            지난 토론 보기
          </PrimaryLink>
        </EmptyCard>

        {upcomingDebates.length > 0 && (
          <Section>
            <SectionHeader>
              <h3>예정된 토론</h3>
            </SectionHeader>
            <UpcomingList>
              {upcomingDebates.map(debate => (
                <UpcomingCard key={debate.id}>
                  <BadgeRow>
                    <Badge>{debate.topic.category}</Badge>
                    <Badge $accent>예정</Badge>
                  </BadgeRow>
                  <UpcomingTitle>{debate.topic.title}</UpcomingTitle>
                  <UpcomingMeta>
                    <span>
                      {debate.debater1.name} vs {debate.debater2.name}
                    </span>
                    <strong>
                      {debate.startTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })} 시작
                    </strong>
                  </UpcomingMeta>
                </UpcomingCard>
              ))}
            </UpcomingList>
          </Section>
        )}

        {pastDebates.length > 0 && (
          <Section>
            <SectionHeader>
              <h3>최근 종료된 토론</h3>
              <TextLink to="/past-debates">전체보기</TextLink>
            </SectionHeader>
            <PreviewGrid>
              {pastDebates.slice(0, 4).map(debate => {
                const totalVotes = debate.votes.debater1 + debate.votes.debater2;
                const winner = debate.votes.debater1 > debate.votes.debater2 ? debate.debater1 : debate.debater2;

                return (
                  <PreviewCard key={debate.id} to={`/past-debate/${debate.id}`}>
                    <PreviewRow>
                      <PreviewIcon>
                        <Trophy size={20} />
                      </PreviewIcon>
                      <div>
                        <PreviewTitle>{debate.topic.title}</PreviewTitle>
                        <PreviewText>승자: {winner.name}</PreviewText>
                      </div>
                    </PreviewRow>
                    <PreviewText>
                      총 {totalVotes.toLocaleString()}표 · 발언 {debate.messages.length}개
                    </PreviewText>
                  </PreviewCard>
                );
              })}
            </PreviewGrid>
          </Section>
        )}
      </Container>
    );
  }

  const totalVotes = liveDebate.votes.debater1 + liveDebate.votes.debater2;
  const debater1Percentage = getVotePercentage(liveDebate.votes.debater1, totalVotes);
  const debater2Percentage = getVotePercentage(liveDebate.votes.debater2, totalVotes);

  return (
    <Container>
      <LiveHeader>
        <LiveHeaderContent>
          <LiveHeaderInfo>
            <LiveIconWrap>
              <LiveIcon>
                <Radio size={28} />
              </LiveIcon>
              <LivePulse />
            </LiveIconWrap>
            <div>
              <LiveEyebrow>
                <LivePill>LIVE</LivePill>
                실시간 토론 중계
              </LiveEyebrow>
              <LiveTitle>{liveDebate.topic.title}</LiveTitle>
            </div>
          </LiveHeaderInfo>

          <LiveCounters>
            <CounterRow>
              <Users size={16} />
              시청자 {liveDebate.viewers.toLocaleString()}명
            </CounterRow>
            <BigCounter>{totalVotes.toLocaleString()} 투표</BigCounter>
          </LiveCounters>
        </LiveHeaderContent>
      </LiveHeader>

      <MainGrid>
        <DebatePanel>
          <DebaterHeader>
            <DebaterCell>
              <DebaterAvatar>{liveDebate.debater1.name[0]}</DebaterAvatar>
              <DebaterName>{liveDebate.debater1.name}</DebaterName>
              <DebaterRole>찬성 입장</DebaterRole>
            </DebaterCell>
            <DebaterCell $accent>
              <DebaterAvatar $accent>{liveDebate.debater2.name[0]}</DebaterAvatar>
              <DebaterName>{liveDebate.debater2.name}</DebaterName>
              <DebaterRole>반대 입장</DebaterRole>
            </DebaterCell>
          </DebaterHeader>

          <ChatStream>
            {liveDebate.messages.map(message => {
              const isDebater1 = message.debaterId === liveDebate.debater1.id;

              return (
                <MessageRow key={message.id} $alignEnd={!isDebater1}>
                  <MessageBubble $accent={!isDebater1}>
                    <MessageAuthor>{isDebater1 ? liveDebate.debater1.name : liveDebate.debater2.name}</MessageAuthor>
                    <p>{message.content}</p>
                    <MessageTime>
                      {message.timestamp.toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </MessageTime>
                  </MessageBubble>
                </MessageRow>
              );
            })}
            <div ref={chatEndRef} />
          </ChatStream>
        </DebatePanel>

        <Sidebar>
          <Card>
            <CardTitle>
              <TrendingUp size={20} color="#6366F1" />
              누구의 설득력이 더 높았나요?
            </CardTitle>

            {!hasVoted ? (
              <VoteActions>
                <VoteButton onClick={() => handleVote(liveDebate.debater1.id)}>{liveDebate.debater1.name}에게 투표</VoteButton>
                <VoteButton $accent onClick={() => handleVote(liveDebate.debater2.id)}>
                  {liveDebate.debater2.name}에게 투표
                </VoteButton>
              </VoteActions>
            ) : (
              <VoteSuccess>
                <SuccessIcon>
                  <ThumbsUp size={24} />
                </SuccessIcon>
                <SuccessTitle>투표 완료!</SuccessTitle>
                <MutedText>
                  {selectedDebater === liveDebate.debater1.id ? liveDebate.debater1.name : liveDebate.debater2.name}
                  에게 투표했습니다.
                </MutedText>
              </VoteSuccess>
            )}

            <VoteResults>
              <div>
                <VoteRowHeader>
                  <VoteLabel>{liveDebate.debater1.name}</VoteLabel>
                  <VotePercent>{debater1Percentage}%</VotePercent>
                </VoteRowHeader>
                <ProgressTrack>
                  <ProgressFill $width={debater1Percentage} />
                </ProgressTrack>
                <MutedText>{liveDebate.votes.debater1.toLocaleString()}표</MutedText>
              </div>

              <div>
                <VoteRowHeader>
                  <VoteLabel>{liveDebate.debater2.name}</VoteLabel>
                  <VotePercent $accent>{debater2Percentage}%</VotePercent>
                </VoteRowHeader>
                <ProgressTrack>
                  <ProgressFill $width={debater2Percentage} $accent />
                </ProgressTrack>
                <MutedText>{liveDebate.votes.debater2.toLocaleString()}표</MutedText>
              </div>
            </VoteResults>
          </Card>

          <Card>
            <CardTitle>토론 정보</CardTitle>
            <InfoList>
              <InfoItem>
                <InfoLabel>주제</InfoLabel>
                <strong>{liveDebate.topic.title}</strong>
              </InfoItem>
              <InfoItem>
                <InfoLabel>카테고리</InfoLabel>
                <strong>{liveDebate.topic.category}</strong>
              </InfoItem>
              <InfoItem>
                <InfoLabel>시작 시간</InfoLabel>
                <strong>
                  {liveDebate.startTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                </strong>
              </InfoItem>
            </InfoList>
          </Card>

          <ArchiveCard to="/past-debates">
            <ArchiveTitle>
              <Trophy size={22} color="#6366F1" />
              지난 토론
            </ArchiveTitle>
            <ArchiveText>종료된 토론 결과와 전체 내용을 확인해보세요.</ArchiveText>
            <ArchiveLinkText>전체 보기</ArchiveLinkText>
          </ArchiveCard>
        </Sidebar>
      </MainGrid>
    </Container>
  );
}
