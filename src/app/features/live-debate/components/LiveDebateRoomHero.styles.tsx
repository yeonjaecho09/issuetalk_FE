import styled from 'styled-components';
import { SurfaceCard } from '../../../components/ui/primitives';

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
