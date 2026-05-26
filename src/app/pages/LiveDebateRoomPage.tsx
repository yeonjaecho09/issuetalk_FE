import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router';
import styled from 'styled-components';
import { ArrowLeft, Clock3, Flame, MessageCircle, Radio, TrendingUp, Users } from 'lucide-react';
import { debateRooms, getDebateRoomById } from '../data/liveDebateRooms';

const Container = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[6]} ${props => props.theme.spacing[16]};
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

const EmptyCard = styled.div`
  max-width: 52rem;
  padding: ${props => props.theme.spacing[10]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
`;

const Hero = styled.section<{ $live?: boolean; $scheduled?: boolean }>`
  margin-bottom: ${props => props.theme.spacing[6]};
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  color: white;
  background: ${props =>
    props.$live
      ? `linear-gradient(135deg, ${props.theme.colors.liveRed}, ${props.theme.colors.accent})`
      : props.$scheduled
        ? `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.accent})`
        : 'linear-gradient(135deg, #475569, #64748B)'};
  box-shadow: ${props => props.theme.shadows.lg};
`;

const HeroTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[6]};

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: rgba(255, 255, 255, 0.18);
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const HeroTitle = styled.h1`
  max-width: 44rem;
  margin-bottom: ${props => props.theme.spacing[3]};
  color: white;
  line-height: 1.1;
`;

const HeroSummary = styled.p`
  max-width: 46rem;
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.8;
`;

const HeroStats = styled.div`
  min-width: 240px;
  display: grid;
  gap: ${props => props.theme.spacing[3]};
`;

const HeroStat = styled.div`
  padding: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: rgba(255, 255, 255, 0.14);
`;

const HeroStatLabel = styled.div`
  margin-bottom: ${props => props.theme.spacing[1]};
  color: rgba(255, 255, 255, 0.75);
  font-size: ${props => props.theme.fontSizes.sm};
`;

const HeroStatValue = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const MainGrid = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr);
  gap: ${props => props.theme.spacing[6]};

  @media (max-width: 1040px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.section`
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
`;

const DebaterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-bottom: 1px solid ${props => props.theme.colors.border};

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

const DebaterCard = styled.div<{ $accent?: boolean }>`
  padding: ${props => props.theme.spacing[5]};
  background-color: ${props => (props.$accent ? 'rgba(236, 72, 153, 0.06)' : 'rgba(99, 102, 241, 0.06)')};
  border-right: ${props => (props.$accent ? 'none' : `1px solid ${props.theme.colors.border}`)};
`;

const DebaterName = styled.div`
  margin-bottom: ${props => props.theme.spacing[1]};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const DebaterStance = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const ChatStream = styled.div`
  height: 34rem;
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
  max-width: 72%;
  padding: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.xl};
  border-top-left-radius: ${props => (props.$accent ? props.theme.borderRadius.xl : '0.45rem')};
  border-top-right-radius: ${props => (props.$accent ? '0.45rem' : props.theme.borderRadius.xl)};
  color: white;
  background-color: ${props => (props.$accent ? props.theme.colors.accent : props.theme.colors.primary)};
`;

const MessageAuthor = styled.div`
  margin-bottom: ${props => props.theme.spacing[1]};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const MessageTime = styled.div`
  margin-top: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes.xs};
  opacity: 0.78;
`;

const Sidebar = styled.aside`
  display: grid;
  gap: ${props => props.theme.spacing[5]};
  align-content: start;
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
  display: grid;
  gap: ${props => props.theme.spacing[3]};
`;

const VoteButton = styled.button<{ $accent?: boolean }>`
  min-height: 3.5rem;
  border-radius: ${props => props.theme.borderRadius.xl};
  color: white;
  background-color: ${props => (props.$accent ? props.theme.colors.accent : props.theme.colors.primary)};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const VoteResults = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

const VoteRow = styled.div``;

const VoteMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const VoteTrack = styled.div`
  height: 0.75rem;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: ${props => props.theme.colors.secondary};
`;

const VoteFill = styled.div<{ $width: number; $accent?: boolean }>`
  width: ${props => props.$width}%;
  height: 100%;
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: ${props => (props.$accent ? props.theme.colors.accent : props.theme.colors.primary)};
`;

const InfoList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const Strong = styled.strong`
  color: ${props => props.theme.colors.foreground};
`;

const RelatedList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
`;

const RelatedLink = styled(Link)`
  display: block;
  padding: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: rgba(99, 102, 241, 0.05);
  transition: transform ${props => props.theme.transitions.fast}, background-color ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-1px);
    background-color: rgba(99, 102, 241, 0.09);
  }
`;

const RelatedTitle = styled.div`
  margin-bottom: ${props => props.theme.spacing[1]};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const RelatedMeta = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export function LiveDebateRoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const room = roomId ? getDebateRoomById(roomId) : undefined;
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [selectedDebater, setSelectedDebater] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [room?.messages.length]);

  const totalVotes = useMemo(() => {
    if (!room) return 0;
    return room.votes.debater1 + room.votes.debater2;
  }, [room]);

  if (!room) {
    return (
      <Container>
        <BackLink to="/live">
          <ArrowLeft size={16} />
          토론방 목록으로
        </BackLink>
        <EmptyCard>
          <h2>토론방을 찾을 수 없습니다.</h2>
          <p>삭제되었거나 잘못된 주소일 수 있습니다. 다른 1:1 토론방으로 이동해보세요.</p>
        </EmptyCard>
      </Container>
    );
  }

  const debater1Percent = totalVotes === 0 ? 0 : Math.round((room.votes.debater1 / totalVotes) * 100);
  const debater2Percent = totalVotes === 0 ? 0 : Math.round((room.votes.debater2 / totalVotes) * 100);
  const relatedRooms = debateRooms.filter(item => item.id !== room.id).slice(0, 3);

  return (
    <Container>
      <BackLink to="/live">
        <ArrowLeft size={16} />
        토론방 목록으로
      </BackLink>

      <Hero $live={room.status === 'live'} $scheduled={room.status === 'scheduled'}>
        <HeroTop>
          <div>
            <BadgeRow>
              <Badge>
                {room.status === 'live' ? <Flame size={12} /> : <Clock3 size={12} />}
                {room.status === 'live' ? 'LIVE' : room.status === 'scheduled' ? 'SCHEDULED' : 'ENDED'}
              </Badge>
              <Badge>{room.category}</Badge>
              <Badge>{room.roundLabel}</Badge>
            </BadgeRow>
            <HeroTitle>{room.title}</HeroTitle>
            <HeroSummary>{room.summary}</HeroSummary>
          </div>

          <HeroStats>
            <HeroStat>
              <HeroStatLabel>시청자</HeroStatLabel>
              <HeroStatValue>
                <Users size={18} />
                {room.viewers.toLocaleString()}명
              </HeroStatValue>
            </HeroStat>
            <HeroStat>
              <HeroStatLabel>메시지 수</HeroStatLabel>
              <HeroStatValue>
                <MessageCircle size={18} />
                {room.messagesCount}개
              </HeroStatValue>
            </HeroStat>
            <HeroStat>
              <HeroStatLabel>시작 시간</HeroStatLabel>
              <HeroStatValue>
                <Clock3 size={18} />
                {new Date(room.startTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
              </HeroStatValue>
            </HeroStat>
          </HeroStats>
        </HeroTop>
      </Hero>

      <MainGrid>
        <Panel>
          <DebaterGrid>
            <DebaterCard>
              <DebaterName>{room.debater1.name}</DebaterName>
              <DebaterStance>{room.debater1.stance}</DebaterStance>
            </DebaterCard>
            <DebaterCard $accent>
              <DebaterName>{room.debater2.name}</DebaterName>
              <DebaterStance>{room.debater2.stance}</DebaterStance>
            </DebaterCard>
          </DebaterGrid>

          <ChatStream>
            {room.messages.map(message => {
              const isDebater1 = message.debaterId === room.debater1.id;

              return (
                <MessageRow key={message.id} $alignEnd={!isDebater1}>
                  <MessageBubble $accent={!isDebater1}>
                    <MessageAuthor>{isDebater1 ? room.debater1.name : room.debater2.name}</MessageAuthor>
                    <div>{message.content}</div>
                    <MessageTime>
                      {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
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
        </Panel>

        <Sidebar>
          <Card>
            <CardTitle>
              <TrendingUp size={20} color="#6366F1" />
              실시간 반응 투표
            </CardTitle>

            {room.status === 'live' && !hasVoted ? (
              <VoteActions>
                <VoteButton onClick={() => { setSelectedDebater(room.debater1.id); setHasVoted(true); }}>
                  {room.debater1.name} 선택
                </VoteButton>
                <VoteButton
                  $accent
                  onClick={() => {
                    setSelectedDebater(room.debater2.id);
                    setHasVoted(true);
                  }}
                >
                  {room.debater2.name} 선택
                </VoteButton>
              </VoteActions>
            ) : (
              <InfoList style={{ marginBottom: '1.5rem' }}>
                <div>
                  <Strong>
                    {room.status === 'live'
                      ? `${selectedDebater === room.debater1.id ? room.debater1.name : room.debater2.name}에게 투표했습니다.`
                      : '이 토론방은 투표가 마감되었어요.'}
                  </Strong>
                </div>
              </InfoList>
            )}

            <VoteResults>
              <VoteRow>
                <VoteMeta>
                  <span>{room.debater1.name}</span>
                  <strong>{debater1Percent}%</strong>
                </VoteMeta>
                <VoteTrack>
                  <VoteFill $width={debater1Percent} />
                </VoteTrack>
              </VoteRow>
              <VoteRow>
                <VoteMeta>
                  <span>{room.debater2.name}</span>
                  <strong>{debater2Percent}%</strong>
                </VoteMeta>
                <VoteTrack>
                  <VoteFill $width={debater2Percent} $accent />
                </VoteTrack>
              </VoteRow>
            </VoteResults>
          </Card>

          <Card>
            <CardTitle>
              <Radio size={20} color="#6366F1" />
              방 정보
            </CardTitle>
            <InfoList>
              <div>
                카테고리
                <br />
                <Strong>{room.category}</Strong>
              </div>
              <div>
                운영 주체
                <br />
                <Strong>{room.host}</Strong>
              </div>
              <div>
                방 상태
                <br />
                <Strong>{room.status === 'live' ? '진행 중' : room.status === 'scheduled' ? '시작 예정' : '종료됨'}</Strong>
              </div>
            </InfoList>
          </Card>

          <Card>
            <CardTitle>
              <Users size={20} color="#6366F1" />
              다른 토론방
            </CardTitle>
            <RelatedList>
              {relatedRooms.map(item => (
                <RelatedLink key={item.id} to={`/live/${item.id}`}>
                  <RelatedTitle>{item.title}</RelatedTitle>
                  <RelatedMeta>
                    {item.category} · {item.status === 'live' ? '진행 중' : item.status === 'scheduled' ? '예정' : '종료'}
                  </RelatedMeta>
                </RelatedLink>
              ))}
            </RelatedList>
          </Card>
        </Sidebar>
      </MainGrid>
    </Container>
  );
}
