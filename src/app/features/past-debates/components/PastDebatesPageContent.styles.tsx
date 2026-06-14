import { Link } from 'react-router';
import styled from 'styled-components';
import { HeroSection, HeroTitle, SurfaceCard } from '../../../components/ui/primitives';

export const ArchiveHeader = styled(HeroSection)`
  margin-bottom: ${props => props.theme.spacing[6]};
  color: white;
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.18), transparent 26%),
    linear-gradient(135deg, #1f2937 0%, #7c2d12 45%, ${props => props.theme.colors.accent} 100%);
  box-shadow: ${props => props.theme.shadows.lg};

  p {
    margin-top: ${props => props.theme.spacing[3]};
    max-width: 44rem;
    color: rgba(255, 255, 255, 0.84);
    line-height: 1.8;
  }
`;

export const ArchiveTitle = styled(HeroTitle)`
  color: white;
`;

export const ArchiveEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.full};
  background: rgba(255, 255, 255, 0.14);
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const DebateList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

export const DebateLinkCard = styled(SurfaceCard).attrs({ as: Link })`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  text-decoration: none;
  transition:
    transform ${props => props.theme.transitions.fast},
    box-shadow ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

export const DebateTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  flex-wrap: wrap;
`;

export const DebateStatus = styled.span`
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  color: #9f1239;
  background: rgba(251, 113, 133, 0.12);
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const DebateSummary = styled.p`
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.75;
`;

export const DebateMetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${props => props.theme.spacing[3]};

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const DebateMetaCard = styled.div`
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  background: ${props => props.theme.colors.secondary};
`;

export const DebateMetaLabel = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const DebateMetaValue = styled.div`
  margin-top: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.bold};
`;
