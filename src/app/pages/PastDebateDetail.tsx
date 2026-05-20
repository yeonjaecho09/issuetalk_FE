import { useParams, Link } from 'react-router';
import styled from 'styled-components';
import { ArrowLeft, Trophy, Calendar, TrendingUp, Award } from 'lucide-react';
import { getPastDebateById } from '../data/mockData';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[6]};
`;

const EmptyState = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[12]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
  text-align: center;
`;

const EmptyTitle = styled.h2`
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[6]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const TextLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.semibold};

  &:hover {
    text-decoration: underline;
  }
`;

const Hero = styled.section`
  margin-bottom: ${props => props.theme.spacing[6]};
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid rgba(99, 102, 241, 0.2);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.08));
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const Badge = styled.span<{ $muted?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => (props.$muted ? props.theme.colors.mutedForeground : props.theme.colors.primary)};
  background-color: ${props => (props.$muted ? 'rgba(148, 163, 184, 0.16)' : 'rgba(99, 102, 241, 0.1)')};
`;

const HeroTitle = styled.h1`
  margin-bottom: ${props => props.theme.spacing[3]};
`;

const HeroDescription = styled.p`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.lg};
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(300px, 1fr);
  gap: ${props => props.theme.spacing[6]};

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[6]};
`;

const WinnerCard = styled.section`
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  text-align: center;
  color: white;
  background: linear-gradient(135deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.primary});
`;

const WinnerIconWrap = styled.div`
  margin-bottom: ${props => props.theme.spacing[3]};
`;

const WinnerTitle = styled.h2`
  margin-bottom: ${props => props.theme.spacing[2]};
  color: white;
`;

const WinnerValue = styled.div`
  margin-bottom: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const WinnerPercent = styled.div`
  font-size: ${props => props.theme.fontSizes.lg};
  opacity: 0.9;
`;

const Panel = styled.section`
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
`;

const PanelHeader = styled.div`
  padding: ${props => props.theme.spacing[6]};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(236, 72, 153, 0.05));
`;

const PanelTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[1]};
`;

const PanelCaption = styled.p`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const ChatHistory = styled.div`
  max-height: 800px;
  overflow-y: auto;
  padding: ${props => props.theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[6]};
  background-color: rgba(241, 245, 249, 0.35);
`;

const MessageRow = styled.div<{ $alignEnd?: boolean }>`
  display: flex;
  justify-content: ${props => (props.$alignEnd ? 'flex-end' : 'flex-start')};
`;

const MessageBubble = styled.div<{ $accent?: boolean }>`
  max-width: 75%;
  padding: ${props => props.theme.spacing[5]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border-top-left-radius: ${props => (props.$accent ? props.theme.borderRadius['2xl'] : '0.4rem')};
  border-top-right-radius: ${props => (props.$accent ? '0.4rem' : props.theme.borderRadius['2xl'])};
  color: white;
  background-color: ${props => (props.$accent ? props.theme.colors.accent : props.theme.colors.primary)};
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const MessageRole = styled.span`
  opacity: 0.8;
  font-size: ${props => props.theme.fontSizes.xs};
`;

const MessageTime = styled.div`
  margin-top: ${props => props.theme.spacing[3]};
  font-size: ${props => props.theme.fontSizes.xs};
  opacity: 0.78;
`;

const StickyCard = styled.section`
  position: sticky;
  top: 6rem;
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};

  @media (max-width: 1000px) {
    position: static;
  }
`;

const CardTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const VoteStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
`;

const VoteCard = styled.div<{ $accent?: boolean; $winner?: boolean }>`
  padding: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: ${props =>
    props.$winner
      ? `2px solid ${props.$accent ? props.theme.colors.accent : props.theme.colors.primary}`
      : '1px solid transparent'};
  background-color: ${props =>
    props.$accent
      ? props.$winner
        ? 'rgba(236, 72, 153, 0.12)'
        : 'rgba(236, 72, 153, 0.05)'
      : props.$winner
        ? 'rgba(99, 102, 241, 0.12)'
        : 'rgba(99, 102, 241, 0.05)'};
`;

const VoteHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[3]};
`;

const VoteHeaderCopy = styled.div`
  flex: 1;
`;

const VoteAvatar = styled.div<{ $accent?: boolean }>`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.full};
  color: white;
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.bold};
  background-color: ${props => (props.$accent ? props.theme.colors.accent : props.theme.colors.primary)};
`;

const VoteName = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const VoteRole = styled.div`
  margin-top: ${props => props.theme.spacing[1]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.xs};
`;

const VoteMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const Muted = styled.span`
  color: ${props => props.theme.colors.mutedForeground};
`;

const VoteStrong = styled.strong<{ $accent?: boolean }>`
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
`;

const VotePercent = styled.div<{ $accent?: boolean }>`
  margin-top: ${props => props.theme.spacing[2]};
  text-align: right;
  color: ${props => (props.$accent ? props.theme.colors.accent : props.theme.colors.primary)};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const Divider = styled.div`
  margin-top: ${props => props.theme.spacing[6]};
  padding-top: ${props => props.theme.spacing[6]};
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const StatCard = styled.section`
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
`;

const StatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[3]};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};
`;

export function PastDebateDetail() {
  const { id } = useParams<{ id: string }>();
  const debate = id ? getPastDebateById(id) : undefined;

  if (!debate) {
    return (
      <Container>
        <EmptyState>
          <EmptyTitle>토론을 찾을 수 없습니다</EmptyTitle>
          <TextLink to="/past-debates">지난 토론 목록으로 돌아가기</TextLink>
        </EmptyState>
      </Container>
    );
  }

  const totalVotes = debate.votes.debater1 + debate.votes.debater2;
  const debater1Percentage = Math.round((debate.votes.debater1 / totalVotes) * 100);
  const debater2Percentage = Math.round((debate.votes.debater2 / totalVotes) * 100);
  const winner = debate.votes.debater1 > debate.votes.debater2 ? debate.debater1 : debate.debater2;
  const winnerIsDebater1 = debate.votes.debater1 > debate.votes.debater2;

  return (
    <Container>
      <BackLink to="/past-debates">
        <ArrowLeft size={16} />
        지난 토론 목록
      </BackLink>

      <Hero>
        <BadgeRow>
          <Badge>{debate.topic.category}</Badge>
          <Badge $muted>종료</Badge>
          <Badge $muted>
            <Calendar size={12} />
            {debate.startTime.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Badge>
        </BadgeRow>
        <HeroTitle>{debate.topic.title}</HeroTitle>
        <HeroDescription>{debate.topic.content}</HeroDescription>
      </Hero>

      <MainGrid>
        <Stack>
          <WinnerCard>
            <WinnerIconWrap>
              <Trophy size={48} />
            </WinnerIconWrap>
            <WinnerTitle>토론 승자</WinnerTitle>
            <WinnerValue>{winner.name}</WinnerValue>
            <WinnerPercent>{winnerIsDebater1 ? debater1Percentage : debater2Percentage}% 득표</WinnerPercent>
          </WinnerCard>

          <Panel>
            <PanelHeader>
              <PanelTitle>
                <TrendingUp size={20} />
                토론 전체 내용
              </PanelTitle>
              <PanelCaption>총 {debate.messages.length}개의 발언</PanelCaption>
            </PanelHeader>

            <ChatHistory>
              {debate.messages.map(message => {
                const isDebater1 = message.debaterId === debate.debater1.id;

                return (
                  <MessageRow key={message.id} $alignEnd={!isDebater1}>
                    <MessageBubble $accent={!isDebater1}>
                      <MessageHeader>
                        {isDebater1 ? debate.debater1.name : debate.debater2.name}
                        <MessageRole>{isDebater1 ? '찬성' : '반대'}</MessageRole>
                      </MessageHeader>
                      <p>{message.content}</p>
                      <MessageTime>
                        {message.timestamp.toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </MessageTime>
                    </MessageBubble>
                  </MessageRow>
                );
              })}
            </ChatHistory>
          </Panel>
        </Stack>

        <Stack>
          <StickyCard>
            <CardTitle>
              <Award size={20} color="#6366F1" />
              투표 결과
            </CardTitle>

            <VoteStack>
              <VoteCard $winner={winnerIsDebater1}>
                <VoteHeader>
                  <VoteAvatar>{debate.debater1.name[0]}</VoteAvatar>
                  <VoteHeaderCopy>
                    <VoteName>
                      {debate.debater1.name}
                      {winnerIsDebater1 && <Trophy size={16} color="#6366F1" />}
                    </VoteName>
                    <VoteRole>찬성 입장</VoteRole>
                  </VoteHeaderCopy>
                </VoteHeader>
                <VoteMeta>
                  <Muted>득표수</Muted>
                  <VoteStrong>{debate.votes.debater1.toLocaleString()}표</VoteStrong>
                </VoteMeta>
                <ProgressTrack>
                  <ProgressFill $width={debater1Percentage} />
                </ProgressTrack>
                <VotePercent>{debater1Percentage}%</VotePercent>
              </VoteCard>

              <VoteCard $accent $winner={!winnerIsDebater1}>
                <VoteHeader>
                  <VoteAvatar $accent>{debate.debater2.name[0]}</VoteAvatar>
                  <VoteHeaderCopy>
                    <VoteName>
                      {debate.debater2.name}
                      {!winnerIsDebater1 && <Trophy size={16} color="#EC4899" />}
                    </VoteName>
                    <VoteRole>반대 입장</VoteRole>
                  </VoteHeaderCopy>
                </VoteHeader>
                <VoteMeta>
                  <Muted>득표수</Muted>
                  <VoteStrong $accent>{debate.votes.debater2.toLocaleString()}표</VoteStrong>
                </VoteMeta>
                <ProgressTrack>
                  <ProgressFill $width={debater2Percentage} $accent />
                </ProgressTrack>
                <VotePercent $accent>{debater2Percentage}%</VotePercent>
              </VoteCard>
            </VoteStack>

            <Divider>
              <StatRow>
                <Muted>총 투표 수</Muted>
                <strong>{totalVotes.toLocaleString()}명</strong>
              </StatRow>
            </Divider>
          </StickyCard>

          <StatCard>
            <CardTitle>토론 통계</CardTitle>
            <StatList>
              <StatRow>
                <Muted>총 발언</Muted>
                <strong>{debate.messages.length}개</strong>
              </StatRow>
              <StatRow>
                <Muted>진행 시간</Muted>
                <strong>1시간</strong>
              </StatRow>
              <StatRow>
                <Muted>토론 날짜</Muted>
                <strong>
                  {debate.startTime.toLocaleDateString('ko-KR', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </strong>
              </StatRow>
            </StatList>
          </StatCard>
        </Stack>
      </MainGrid>
    </Container>
  );
}
