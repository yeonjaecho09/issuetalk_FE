import { Link } from 'react-router';
import styled from 'styled-components';
import { SurfaceCard } from '../../../components/ui/primitives';

export const BackLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const NotFoundActions = styled.div`
  margin-top: ${props => props.theme.spacing[4]};
`;

export const SummaryCard = styled(SurfaceCard)`
  margin-top: ${props => props.theme.spacing[4]};
  color: white;
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.16), transparent 28%),
    linear-gradient(135deg, #1f2937 0%, #7c2d12 42%, ${props => props.theme.colors.accent} 100%);
  border: none;
  box-shadow: ${props => props.theme.shadows.lg};
`;

export const SummaryTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};
  flex-wrap: wrap;
`;

export const SummaryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.full};
  background: rgba(255, 255, 255, 0.14);
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const SummaryTitle = styled.h1`
  margin-top: ${props => props.theme.spacing[4]};
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.08;
`;

export const SummaryText = styled.p`
  margin-top: ${props => props.theme.spacing[3]};
  max-width: 52rem;
  color: rgba(255, 255, 255, 0.84);
  line-height: 1.8;
`;

export const SummaryMetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[5]};

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryMetaCard = styled.div`
  padding: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.xl};
  background: rgba(255, 255, 255, 0.12);
`;

export const SummaryMetaLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  opacity: 0.78;
`;

export const SummaryMetaValue = styled.div`
  margin-top: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const DetailGrid = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
  grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.9fr);
  margin-top: ${props => props.theme.spacing[4]};

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

export const SectionCard = styled(SurfaceCard)``;

export const SectionTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  flex-wrap: wrap;
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

export const MessageCard = styled.article<{ $align: 'left' | 'right'; $side: 'pro' | 'con' }>`
  max-width: min(88%, 38rem);
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid
    ${props => (props.$side === 'pro' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(251, 146, 60, 0.26)')};
  border-radius: ${props =>
    props.$align === 'right'
      ? `${props.theme.borderRadius.xl} ${props.theme.borderRadius.xl} ${props.theme.borderRadius.sm} ${props.theme.borderRadius.xl}`
      : `${props.theme.borderRadius.xl} ${props.theme.borderRadius.xl} ${props.theme.borderRadius.xl} ${props.theme.borderRadius.sm}`};
  background: ${props =>
    props.$side === 'pro'
      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.16), rgba(96, 165, 250, 0.08))'
      : 'linear-gradient(135deg, rgba(251, 146, 60, 0.16), rgba(253, 186, 116, 0.08))'};
`;

export const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  flex-wrap: wrap;
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const MessageSpeakerMeta = styled.span<{ $side: 'pro' | 'con' }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => (props.$side === 'pro' ? '#1d4ed8' : '#c2410c')};
  background: ${props => (props.$side === 'pro' ? 'rgba(59, 130, 246, 0.12)' : 'rgba(251, 146, 60, 0.16)')};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const MessageTimestamp = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
`;

export const MessageText = styled.p`
  margin-top: ${props => props.theme.spacing[2]};
  line-height: 1.8;
`;

export const SideColumn = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

export const VoteCard = styled(SurfaceCard)``;

export const VoteBar = styled.div`
  overflow: hidden;
  margin-top: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.secondary};
`;

export const VoteFillRow = styled.div`
  display: flex;
  min-height: 0.9rem;
`;

export const VoteFillPrimary = styled.div<{ $width: number }>`
  width: ${props => `${props.$width}%`};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, #818cf8);
`;

export const VoteFillAccent = styled.div<{ $width: number }>`
  width: ${props => `${props.$width}%`};
  background: linear-gradient(135deg, ${props => props.theme.colors.liveRed}, ${props => props.theme.colors.accent});
`;

export const VoteMetaRow = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const MetaCard = styled(SurfaceCard)``;

export const MetaRow = styled.div`
  margin-top: ${props => props.theme.spacing[4]};
  line-height: 1.7;
`;
