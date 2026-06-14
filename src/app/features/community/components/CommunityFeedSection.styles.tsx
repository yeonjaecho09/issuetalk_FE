import { Link } from 'react-router';
import styled from 'styled-components';

export const Feed = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

export const FeedHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const FeedTitle = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const WriteLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[5]};
  border-radius: ${props => props.theme.borderRadius.xl};
  color: ${props => props.theme.colors.primaryForeground};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  box-shadow: ${props => props.theme.shadows.md};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
  transition: transform ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-1px);
  }
`;
