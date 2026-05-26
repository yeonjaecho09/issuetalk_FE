import { Link } from 'react-router';
import styled from 'styled-components';
import { ArrowRight, Clock3, DoorOpen, Flame, Radio, Tag, Users } from 'lucide-react';
import { debateRooms } from '../data/liveDebateRooms';

const Container = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[6]} ${props => props.theme.spacing[16]};
`;

const Hero = styled.section`
  margin-bottom: ${props => props.theme.spacing[8]};
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  color: white;
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.18), transparent 26%),
    linear-gradient(135deg, ${props => props.theme.colors.liveRed}, ${props => props.theme.colors.accent});
  box-shadow: ${props => props.theme.shadows.lg};
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(260px, 0.8fr);
  gap: ${props => props.theme.spacing[6]};

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: rgba(255, 255, 255, 0.16);
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const HeroTitle = styled.h1`
  max-width: 42rem;
  margin-bottom: ${props => props.theme.spacing[3]};
  color: white;
  font-size: clamp(2.35rem, 5vw, 4.2rem);
  line-height: 1.02;
`;

const HeroDescription = styled.p`
  max-width: 42rem;
  color: rgba(255, 255, 255, 0.84);
  font-size: ${props => props.theme.fontSizes.lg};
  line-height: 1.8;
`;

const HeroStats = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

const HeroStat = styled.div`
  padding: ${props => props.theme.spacing[5]};
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
`;

const HeroStatLabel = styled.div`
  margin-bottom: ${props => props.theme.spacing[2]};
  color: rgba(255, 255, 255, 0.76);
  font-size: ${props => props.theme.fontSizes.sm};
`;

const HeroStatValue = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[5]};

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
`;

const SectionCopy = styled.p`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const RoomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${props => props.theme.spacing[5]};

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const RoomCard = styled(Link)`
  display: block;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: transform ${props => props.theme.transitions.fast}, box-shadow ${props => props.theme.transitions.fast}, border-color ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-3px);
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const StatusBar = styled.div<{ $live?: boolean; $scheduled?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.primaryForeground};
  background: ${props =>
    props.$live
      ? `linear-gradient(135deg, ${props.theme.colors.liveRed}, ${props.theme.colors.accent})`
      : props.$scheduled
        ? `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.accent})`
        : 'linear-gradient(135deg, #475569, #64748B)'};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const RoomInner = styled.div`
  padding: ${props => props.theme.spacing[6]};
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[3]};
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => props.theme.colors.primary};
  background-color: rgba(99, 102, 241, 0.1);
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const RoomTitle = styled.h3`
  margin-bottom: ${props => props.theme.spacing[3]};
  font-size: ${props => props.theme.fontSizes['2xl']};
  line-height: 1.3;
`;

const RoomSummary = styled.p`
  margin-bottom: ${props => props.theme.spacing[5]};
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.8;
`;

const VersusRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: ${props => props.theme.spacing[3]};
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[5]};
`;

const DebaterCard = styled.div<{ $accent?: boolean }>`
  padding: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: ${props => (props.$accent ? 'rgba(236, 72, 153, 0.08)' : 'rgba(99, 102, 241, 0.08)')};
`;

const DebaterName = styled.div`
  margin-bottom: ${props => props.theme.spacing[1]};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const DebaterStance = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const Versus = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const RoomMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[5]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const Meta = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
`;

const EnterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};
`;

const HostText = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const EnterText = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export function LiveDebatePage() {
  const liveRooms = debateRooms.filter(room => room.status === 'live');
  const scheduledRooms = debateRooms.filter(room => room.status === 'scheduled');
  const endedRooms = debateRooms.filter(room => room.status === 'ended');
  const totalViewers = liveRooms.reduce((sum, room) => sum + room.viewers, 0);

  return (
    <Container>
      <Hero>
        <HeroGrid>
          <div>
            <Eyebrow>
              <Radio size={16} />
              Live Debate Lobby
            </Eyebrow>
            <HeroTitle>여러 1:1 토론방을 오가며 원하는 논쟁에 바로 들어가세요</HeroTitle>
            <HeroDescription>
              이제 실시간 토론은 하나의 메인 중계가 아니라, 주제별 1:1 방이 동시에 열리는 구조입니다. 지금 진행 중인 방에 입장해 흐름을
              보고, 곧 시작하는 방을 미리 확인하고, 끝난 매치까지 한 자리에서 이어보세요.
            </HeroDescription>
          </div>

          <HeroStats>
            <HeroStat>
              <HeroStatLabel>진행 중인 방</HeroStatLabel>
              <HeroStatValue>
                <DoorOpen size={20} />
                {liveRooms.length}개
              </HeroStatValue>
            </HeroStat>
            <HeroStat>
              <HeroStatLabel>현재 시청자</HeroStatLabel>
              <HeroStatValue>
                <Users size={20} />
                {totalViewers.toLocaleString()}명
              </HeroStatValue>
            </HeroStat>
            <HeroStat>
              <HeroStatLabel>대기 중인 매치</HeroStatLabel>
              <HeroStatValue>
                <Clock3 size={20} />
                {scheduledRooms.length}개
              </HeroStatValue>
            </HeroStat>
          </HeroStats>
        </HeroGrid>
      </Hero>

      <Section>
        <SectionHeader>
          <div>
            <SectionTitle>지금 바로 들어갈 수 있는 토론방</SectionTitle>
            <SectionCopy>입장하면 해당 1:1 토론의 메시지 흐름과 투표 현황을 바로 볼 수 있습니다.</SectionCopy>
          </div>
        </SectionHeader>

        <RoomGrid>
          {liveRooms.map(room => (
            <RoomCard key={room.id} to={`/live/${room.id}`}>
              <StatusBar $live>
                <Flame size={12} />
                LIVE
              </StatusBar>
              <RoomInner>
                <BadgeRow>
                  <Badge>
                    <Tag size={12} />
                    {room.category}
                  </Badge>
                  <Badge>{room.roundLabel}</Badge>
                </BadgeRow>
                <RoomTitle>{room.title}</RoomTitle>
                <RoomSummary>{room.summary}</RoomSummary>

                <VersusRow>
                  <DebaterCard>
                    <DebaterName>{room.debater1.name}</DebaterName>
                    <DebaterStance>{room.debater1.stance}</DebaterStance>
                  </DebaterCard>
                  <Versus>VS</Versus>
                  <DebaterCard $accent>
                    <DebaterName>{room.debater2.name}</DebaterName>
                    <DebaterStance>{room.debater2.stance}</DebaterStance>
                  </DebaterCard>
                </VersusRow>

                <RoomMeta>
                  <Meta>
                    <Users size={14} />
                    {room.viewers.toLocaleString()}명 시청
                  </Meta>
                  <Meta>
                    <Radio size={14} />
                    메시지 {room.messagesCount}개
                  </Meta>
                  <Meta>
                    <Clock3 size={14} />
                    {new Date(room.startTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                  </Meta>
                </RoomMeta>

                <EnterRow>
                  <HostText>운영: {room.host}</HostText>
                  <EnterText>
                    입장하기
                    <ArrowRight size={16} />
                  </EnterText>
                </EnterRow>
              </RoomInner>
            </RoomCard>
          ))}
        </RoomGrid>
      </Section>

      {scheduledRooms.length > 0 && (
        <Section>
          <SectionHeader>
            <div>
              <SectionTitle>곧 시작하는 방</SectionTitle>
              <SectionCopy>시작 전 미리 주제와 매치업을 확인하고 관심 있는 방을 골라둘 수 있습니다.</SectionCopy>
            </div>
          </SectionHeader>

          <RoomGrid>
            {scheduledRooms.map(room => (
              <RoomCard key={room.id} to={`/live/${room.id}`}>
                <StatusBar $scheduled>
                  <Clock3 size={12} />
                  SCHEDULED
                </StatusBar>
                <RoomInner>
                  <BadgeRow>
                    <Badge>{room.category}</Badge>
                    <Badge>{room.roundLabel}</Badge>
                  </BadgeRow>
                  <RoomTitle>{room.title}</RoomTitle>
                  <RoomSummary>{room.summary}</RoomSummary>
                  <VersusRow>
                    <DebaterCard>
                      <DebaterName>{room.debater1.name}</DebaterName>
                      <DebaterStance>{room.debater1.stance}</DebaterStance>
                    </DebaterCard>
                    <Versus>VS</Versus>
                    <DebaterCard $accent>
                      <DebaterName>{room.debater2.name}</DebaterName>
                      <DebaterStance>{room.debater2.stance}</DebaterStance>
                    </DebaterCard>
                  </VersusRow>
                  <RoomMeta>
                    <Meta>
                      <Clock3 size={14} />
                      {new Date(room.startTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })} 시작
                    </Meta>
                    <Meta>
                      <Users size={14} />
                      대기 {room.viewers.toLocaleString()}명
                    </Meta>
                  </RoomMeta>
                  <EnterRow>
                    <HostText>운영: {room.host}</HostText>
                    <EnterText>
                      방 보기
                      <ArrowRight size={16} />
                    </EnterText>
                  </EnterRow>
                </RoomInner>
              </RoomCard>
            ))}
          </RoomGrid>
        </Section>
      )}

      {endedRooms.length > 0 && (
        <Section>
          <SectionHeader>
            <div>
              <SectionTitle>최근 종료된 토론방</SectionTitle>
              <SectionCopy>종료된 1:1 토론도 다시 들어가 주요 발언과 투표 결과를 확인할 수 있습니다.</SectionCopy>
            </div>
          </SectionHeader>

          <RoomGrid>
            {endedRooms.map(room => (
              <RoomCard key={room.id} to={`/live/${room.id}`}>
                <StatusBar>
                  <Clock3 size={12} />
                  ENDED
                </StatusBar>
                <RoomInner>
                  <BadgeRow>
                    <Badge>{room.category}</Badge>
                    <Badge>{room.roundLabel}</Badge>
                  </BadgeRow>
                  <RoomTitle>{room.title}</RoomTitle>
                  <RoomSummary>{room.summary}</RoomSummary>
                  <VersusRow>
                    <DebaterCard>
                      <DebaterName>{room.debater1.name}</DebaterName>
                      <DebaterStance>{room.debater1.stance}</DebaterStance>
                    </DebaterCard>
                    <Versus>VS</Versus>
                    <DebaterCard $accent>
                      <DebaterName>{room.debater2.name}</DebaterName>
                      <DebaterStance>{room.debater2.stance}</DebaterStance>
                    </DebaterCard>
                  </VersusRow>
                  <RoomMeta>
                    <Meta>
                      <Radio size={14} />
                      메시지 {room.messagesCount}개
                    </Meta>
                    <Meta>
                      <Users size={14} />
                      투표 {(room.votes.debater1 + room.votes.debater2).toLocaleString()}명
                    </Meta>
                  </RoomMeta>
                  <EnterRow>
                    <HostText>운영: {room.host}</HostText>
                    <EnterText>
                      다시 보기
                      <ArrowRight size={16} />
                    </EnterText>
                  </EnterRow>
                </RoomInner>
              </RoomCard>
            ))}
          </RoomGrid>
        </Section>
      )}
    </Container>
  );
}
