import styled from 'styled-components';
import { HeroDescription, HeroEyebrow, HeroSection, HeroTitle } from '../../../components/ui/primitives';

export const MyPageHero = HeroSection;
export const MyPageEyebrow = HeroEyebrow;

export const MyPageTitle = styled(HeroTitle)`
  font-size: clamp(2rem, 4vw, 3.5rem);
`;

export const MyPageDescription = HeroDescription;

export const MyPageGrid = styled.section`
  display: grid;
  grid-template-columns: minmax(320px, 0.9fr) minmax(0, 1.4fr);
  gap: ${props => props.theme.spacing[6]};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const MyPageColumn = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[5]};
  align-content: start;
`;
