import { Link } from 'react-router';
import styled from 'styled-components';
import { Trophy, Calendar, Users, TrendingUp } from 'lucide-react';
import { pastDebates } from '../data/mockData';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[6]};
`;

const PageHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
`;

const HeaderIcon = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.xl};
  color: white;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
`;

const Description = styled.p`
  margin-top: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.mutedForeground};
`;

const DebateList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[6]};
`;

const DebateCard = styled(Link)`
  display: block;
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
  transition: transform ${props => props.theme.transitions.fast}, box-shadow ${props => props.theme.transitions.fast}, border-color ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const DebateHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[6]};
  margin-bottom: ${props => props.theme.spacing[4]};

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const DebateHeaderCopy = styled.div`
  flex: 1;
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[3]};
`;

const Badge = styled.span<{ $muted?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: ${props => (props.$muted ? 'rgba(148, 163, 184, 0.16)' : 'rgba(99, 102, 241, 0.1)')};
  color: ${props => (props.$muted ? props.theme.colors.mutedForeground : props.theme.colors.primary)};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

const DebateTitle = styled.h2`
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const DebateSummary = styled.p`
  color: ${props => props.theme.colors.mutedForeground};
`;

const WinnerCard = styled.div`
  min-width: 140px;
  padding: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.xl};
  color: white;
  text-align: center;
  background: linear-gradient(135deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.primary});
`;

const WinnerIconWrap = styled.div`
  margin-bottom: ${props => props.theme.spacing[1]};
`;

const WinnerLabel = styled.div`
  margin-bottom: ${props => props.theme.spacing[1]};
  font-size: ${props => props.theme.fontSizes.xs};
`;

const DebaterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[4]};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DebaterCard = styled.div<{ $accent?: boolean }>`
  padding: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: ${props => (props.$accent ? 'rgba(236, 72, 153, 0.05)' : 'rgba(99, 102, 241, 0.05)')};
`;

const DebaterHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[3]};
`;

const DebaterAvatar = styled.div<{ $accent?: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.full};
  color: white;
  font-weight: ${props => props.theme.fontWeights.bold};
  background-color: ${props => (props.$accent ? props.theme.colors.accent : props.theme.colors.primary)};
`;

const DebaterName = styled.div`
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const DebaterRole = styled.div`
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

const VoteStrong = styled.strong<{ $accent?: boolean }>`
  color: ${props => (props.$accent ? props.theme.colors.accent : props.theme.colors.primary)};
`;

const ProgressTrack = styled.div`
  height: 0.5rem;
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

const Percent = styled.div<{ $accent?: boolean }>`
  margin-top: ${props => props.theme.spacing[2]};
  text-align: right;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => (props.$accent ? props.theme.colors.accent : props.theme.colors.primary)};
`;

const FooterStats = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[6]};
  padding-top: ${props => props.theme.spacing[4]};
  border-top: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const FooterStat = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
`;

const FooterLink = styled.span`
  margin-left: auto;
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

const EmptyState = styled.div`
  padding: ${props => props.theme.spacing[12]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
  text-align: center;
  color: ${props => props.theme.colors.mutedForeground};
`;

const EmptyIconWrap = styled.div`
  margin-bottom: ${props => props.theme.spacing[4]};
  opacity: 0.3;
`;

export function PastDebatesPage() {
  return (
    <Container>
      <PageHeader>
        <HeaderRow>
          <HeaderIcon>
            <Trophy size={24} />
          </HeaderIcon>
          <div>
            <h1>지난 토론</h1>
            <Description>종료된 토론의 결과와 전체 흐름을 한눈에 확인해보세요.</Description>
          </div>
        </HeaderRow>
      </PageHeader>

      <DebateList>
        {pastDebates.map(debate => {
          const totalVotes = debate.votes.debater1 + debate.votes.debater2;
          const debater1Percentage = Math.round((debate.votes.debater1 / totalVotes) * 100);
          const debater2Percentage = Math.round((debate.votes.debater2 / totalVotes) * 100);
          const winner = debate.votes.debater1 > debate.votes.debater2 ? debate.debater1 : debate.debater2;

          return (
            <DebateCard key={debate.id} to={`/past-debate/${debate.id}`}>
              <DebateHeader>
                <DebateHeaderCopy>
                  <BadgeRow>
                    <Badge>{debate.topic.category}</Badge>
                    <Badge $muted>종료</Badge>
                    <Badge $muted>
                      <Calendar size={12} />
                      {debate.startTime.toLocaleDateString('ko-KR')}
                    </Badge>
                  </BadgeRow>
                  <DebateTitle>{debate.topic.title}</DebateTitle>
                  <DebateSummary>{debate.topic.content}</DebateSummary>
                </DebateHeaderCopy>

                <WinnerCard>
                  <WinnerIconWrap>
                    <Trophy size={24} />
                  </WinnerIconWrap>
                  <WinnerLabel>승자</WinnerLabel>
                  <strong>{winner.name}</strong>
                </WinnerCard>
              </DebateHeader>

              <DebaterGrid>
                <DebaterCard>
                  <DebaterHeaderRow>
                    <DebaterAvatar>{debate.debater1.name[0]}</DebaterAvatar>
                    <div>
                      <DebaterName>{debate.debater1.name}</DebaterName>
                      <DebaterRole>찬성 입장</DebaterRole>
                    </div>
                  </DebaterHeaderRow>
                  <VoteMeta>
                    <span>득표수</span>
                    <VoteStrong>{debate.votes.debater1.toLocaleString()}표</VoteStrong>
                  </VoteMeta>
                  <ProgressTrack>
                    <ProgressFill $width={debater1Percentage} />
                  </ProgressTrack>
                  <Percent>{debater1Percentage}%</Percent>
                </DebaterCard>

                <DebaterCard $accent>
                  <DebaterHeaderRow>
                    <DebaterAvatar $accent>{debate.debater2.name[0]}</DebaterAvatar>
                    <div>
                      <DebaterName>{debate.debater2.name}</DebaterName>
                      <DebaterRole>반대 입장</DebaterRole>
                    </div>
                  </DebaterHeaderRow>
                  <VoteMeta>
                    <span>득표수</span>
                    <VoteStrong $accent>{debate.votes.debater2.toLocaleString()}표</VoteStrong>
                  </VoteMeta>
                  <ProgressTrack>
                    <ProgressFill $width={debater2Percentage} $accent />
                  </ProgressTrack>
                  <Percent $accent>{debater2Percentage}%</Percent>
                </DebaterCard>
              </DebaterGrid>

              <FooterStats>
                <FooterStat>
                  <Users size={14} />
                  총 {totalVotes.toLocaleString()}명 투표
                </FooterStat>
                <FooterStat>
                  <TrendingUp size={14} />
                  발언 {debate.messages.length}개
                </FooterStat>
                <FooterLink>전체 토론 내용 보기</FooterLink>
              </FooterStats>
            </DebateCard>
          );
        })}
      </DebateList>

      {pastDebates.length === 0 && (
        <EmptyState>
          <EmptyIconWrap>
            <Trophy size={48} />
          </EmptyIconWrap>
          <p>아직 종료된 토론이 없습니다.</p>
        </EmptyState>
      )}
    </Container>
  );
}
