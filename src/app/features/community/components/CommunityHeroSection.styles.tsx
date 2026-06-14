import styled from 'styled-components';
import { HeroDescription, HeroEyebrow, HeroSection, HeroTitle } from '../../../components/ui/primitives';

export const CommunityHero = HeroSection;
export const CommunityEyebrow = HeroEyebrow;

export const CommunityTitle = styled(HeroTitle)`
  max-width: 42rem;
  line-height: 1.05;
`;

export const CommunityDescription = styled(HeroDescription)`
  font-size: ${props => props.theme.fontSizes.lg};
`;

export const CommunityHeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(260px, 0.7fr);
  gap: ${props => props.theme.spacing[6]};

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const HeroStats = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

export const HeroStatCard = styled.div`
  padding: ${props => props.theme.spacing[5]};
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: rgba(255, 255, 255, 0.78);
  box-shadow: ${props => props.theme.shadows.md};
`;

export const HeroStatLabel = styled.div`
  margin-bottom: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const HeroStatValue = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
`;
