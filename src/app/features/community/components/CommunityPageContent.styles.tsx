import styled from 'styled-components';
import { HeroSection, HeroTitle } from '../../../components/ui/primitives';

export const CommunityHeader = styled(HeroSection)`
  margin-bottom: ${props => props.theme.spacing[6]};

  p {
    margin-top: ${props => props.theme.spacing[3]};
    max-width: 42rem;
    color: ${props => props.theme.colors.mutedForeground};
    line-height: 1.8;
  }
`;

export const CommunityTitle = styled(HeroTitle)``;
