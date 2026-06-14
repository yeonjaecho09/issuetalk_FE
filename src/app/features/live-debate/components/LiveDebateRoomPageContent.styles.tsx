import { Link } from 'react-router';
import styled, { css } from 'styled-components';
import { DangerButton, PrimaryButton, SecondaryButton, SurfaceCard } from '../../../components/ui/primitives';

export const BackLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const NotFoundActions = styled.div`
  margin-top: ${props => props.theme.spacing[4]};
`;

export const HeroCard = styled(SurfaceCard)`
  margin-top: ${props => props.theme.spacing[4]};
  color: white;
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.16), transparent 28%),
    linear-gradient(135deg, #7c2d12 0%, ${props => props.theme.colors.liveRed} 38%, ${props => props.theme.colors.accent} 100%);
  border: none;
  box-shadow: ${props => props.theme.shadows.lg};
`;

export const HeroTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};
  flex-wrap: wrap;
`;

export const HeroEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.full};
  background: rgba(255, 255, 255, 0.14);
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const HeroStatus = styled.div<{ $live?: boolean }>`
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => (props.$live ? 'rgba(255, 255, 255, 0.22)' : 'rgba(15, 23, 42, 0.18)')};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const SummaryTitle = styled.h1`
  margin-top: ${props => props.theme.spacing[4]};
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.1;
`;

export const SummaryText = styled.p`
  max-width: 52rem;
  margin-top: ${props => props.theme.spacing[3]};
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.8;
`;

export const HeroMetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const HeroMetaChip = styled.div`
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.full};
  background: rgba(255, 255, 255, 0.12);
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[2]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const Tag = styled.span`
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  background: rgba(255, 255, 255, 0.14);
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const ParticipantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${props => props.theme.spacing[4]};
  margin-top: ${props => props.theme.spacing[5]};

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

export const ParticipantCard = styled.div`
  padding: ${props => props.theme.spacing[5]};
  border-radius: ${props => props.theme.borderRadius.xl};
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
`;

export const ParticipantLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.78;
`;

export const ParticipantName = styled.div`
  margin-top: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const ParticipantStance = styled.p`
  margin-top: ${props => props.theme.spacing[2]};
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.7;
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(300px, 0.95fr);
  gap: ${props => props.theme.spacing[4]};
  margin-top: ${props => props.theme.spacing[4]};

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

export const MainColumn = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

export const SideColumn = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

export const SectionCard = styled(SurfaceCard)``;

export const SectionTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  flex-wrap: wrap;
`;

export const SectionCaption = styled.p`
  margin-top: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.7;
`;

export const ParticipationPanel = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const ParticipationHint = styled.p`
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.7;
`;

export const ParticipationBadge = styled.div<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => (props.$active ? props.theme.colors.primaryForeground : props.theme.colors.foreground)};
  background: ${props =>
    props.$active
      ? `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.accent})`
      : props.theme.colors.secondary};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const ParticipationActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${props => props.theme.spacing[3]};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ParticipationSecondaryActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[3]};
`;

export const ParticipationButton = styled(PrimaryButton)<{ $secondary?: boolean }>`
  width: 100%;
  background: ${props =>
    props.$secondary
      ? `linear-gradient(135deg, ${props.theme.colors.liveRed}, ${props.theme.colors.accent})`
      : `linear-gradient(135deg, ${props.theme.colors.primary}, #818cf8)`};
`;

export const ComposerForm = styled.form`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const ComposerTextarea = styled.textarea`
  min-height: 8rem;
  resize: vertical;
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  background: ${props => props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.foreground};
  font: inherit;

  &:focus {
    outline: 2px solid rgba(99, 102, 241, 0.18);
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const ComposerFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  flex-wrap: wrap;
`;

export const ComposerButton = styled(PrimaryButton)``;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.div`
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  background: ${props => props.theme.colors.secondary};
`;

export const MetricLabel = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const MetricValue = styled.div`
  margin-top: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.extrabold};
`;

export const TimelineList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const TimelineItem = styled.div<{ $active?: boolean }>`
  position: relative;
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[4]} ${props => props.theme.spacing[4]} ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: 1px solid ${props => (props.$active ? props.theme.colors.primary : props.theme.colors.border)};
  background: ${props => (props.$active ? 'rgba(99, 102, 241, 0.08)' : props.theme.colors.card)};

  &::before {
    content: '';
    position: absolute;
    left: ${props => props.theme.spacing[3]};
    top: ${props => props.theme.spacing[5]};
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 9999px;
    background: ${props => (props.$active ? props.theme.colors.primary : props.theme.colors.border)};
  }
`;

export const TimelineTitle = styled.div`
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const TimelineText = styled.p`
  margin-top: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.7;
`;

export const MessageList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const MessageRow = styled.div<{ $align: 'left' | 'right' }>`
  display: flex;
  justify-content: ${props => (props.$align === 'right' ? 'flex-end' : 'flex-start')};
`;

export const MessageCard = styled.article<{ $isCurrent?: boolean; $align: 'left' | 'right'; $side: 'pro' | 'con' }>`
  max-width: min(88%, 38rem);
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid
    ${props =>
      props.$side === 'pro'
        ? 'rgba(59, 130, 246, 0.3)'
        : props.$isCurrent
          ? 'rgba(239, 68, 68, 0.34)'
          : 'rgba(251, 146, 60, 0.26)'};
  border-radius: ${props =>
    props.$align === 'right'
      ? `${props.theme.borderRadius.xl} ${props.theme.borderRadius.xl} ${props.theme.borderRadius.sm} ${props.theme.borderRadius.xl}`
      : `${props.theme.borderRadius.xl} ${props.theme.borderRadius.xl} ${props.theme.borderRadius.xl} ${props.theme.borderRadius.sm}`};
  background: ${props =>
    props.$side === 'pro'
      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.16), rgba(96, 165, 250, 0.08))'
      : props.$isCurrent
        ? 'linear-gradient(135deg, rgba(248, 113, 113, 0.18), rgba(251, 146, 60, 0.1))'
        : 'linear-gradient(135deg, rgba(251, 146, 60, 0.16), rgba(253, 186, 116, 0.08))'};
  box-shadow: ${props => (props.$isCurrent ? props.theme.shadows.sm : 'none')};
`;

export const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  flex-wrap: wrap;
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const MessageSpeaker = styled.div`
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const MessageSpeakerMeta = styled.span<{ $side: 'pro' | 'con' }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => (props.$side === 'pro' ? '#1d4ed8' : '#c2410c')};
  background: ${props => (props.$side === 'pro' ? 'rgba(59, 130, 246, 0.12)' : 'rgba(251, 146, 60, 0.16)')};
`;

export const MessageTimestamp = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
`;

export const MessageText = styled.p`
  margin-top: ${props => props.theme.spacing[2]};
  line-height: 1.8;
`;

export const VotePanel = styled.div`
  margin-top: ${props => props.theme.spacing[4]};
  display: grid;
  gap: ${props => props.theme.spacing[3]};
`;

export const VoteBar = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.secondary};
`;

export const VoteFillRow = styled.div`
  display: flex;
  min-height: 0.9rem;
`;

const voteFillBase = css<{ $width: number }>`
  width: ${props => `${props.$width}%`};
  transition: width ${props => props.theme.transitions.normal};
`;

export const VoteFillPrimary = styled.div<{ $width: number }>`
  ${voteFillBase};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, #818cf8);
`;

export const VoteFillAccent = styled.div<{ $width: number }>`
  ${voteFillBase};
  background: linear-gradient(135deg, ${props => props.theme.colors.liveRed}, ${props => props.theme.colors.accent});
`;

export const VoteMetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  flex-wrap: wrap;
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const VoteActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${props => props.theme.spacing[3]};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const VoteButton = styled(PrimaryButton)<{ $secondary?: boolean }>`
  width: 100%;
  background: ${props =>
    props.$secondary
      ? `linear-gradient(135deg, ${props.theme.colors.liveRed}, ${props.theme.colors.accent})`
      : `linear-gradient(135deg, ${props.theme.colors.primary}, #818cf8)`};

  &:hover:not(:disabled) {
    background: ${props =>
      props.$secondary
        ? `linear-gradient(135deg, ${props.theme.colors.liveRed}, ${props.theme.colors.accent})`
        : `linear-gradient(135deg, ${props.theme.colors.primary}, #818cf8)`};
  }
`;

export const VoteHint = styled.p`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
  line-height: 1.7;
`;

export const InfoList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};
  padding-bottom: ${props => props.theme.spacing[3]};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const InfoLabel = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
`;

export const InfoValue = styled.div`
  text-align: right;
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

export const QuestionForm = styled.form`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const QuestionTextarea = styled.textarea`
  min-height: 7.5rem;
  resize: vertical;
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  background: ${props => props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.foreground};
  font: inherit;

  &:focus {
    outline: 2px solid rgba(99, 102, 241, 0.18);
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const QuestionActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  align-items: center;
  flex-wrap: wrap;
`;

export const CharacterCount = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const QuestionSubmitButton = styled(SecondaryButton)``;

export const QuestionList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const QuestionCard = styled.div`
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  background: ${props => props.theme.colors.card};
`;

export const QuestionMeta = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const QuestionText = styled.p`
  margin-top: ${props => props.theme.spacing[2]};
  line-height: 1.7;
`;

export const ReportText = styled.p`
  margin-top: ${props => props.theme.spacing[3]};
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.7;
`;

export const ReportButtonWrap = styled.div`
  margin-top: ${props => props.theme.spacing[3]};
`;

export const ReportButton = styled(DangerButton)``;

export const ReportSuccess = styled.div`
  margin-top: ${props => props.theme.spacing[3]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.lg};
  color: #166534;
  background: #dcfce7;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
`;
