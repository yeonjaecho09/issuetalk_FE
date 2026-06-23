import { Link } from 'react-router';
import styled from 'styled-components';

export const PostCard = styled(Link)`
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: transform ${props => props.theme.transitions.fast}, box-shadow ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

export const PinBanner = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.primaryForeground};
  background-color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const PostInner = styled.div`
  padding: ${props => props.theme.spacing[6]};
`;

export const PostMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[3]};

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const CategoryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => props.theme.colors.primary};
  background-color: rgba(99, 102, 241, 0.1);
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const AuthorText = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const TitleLink = styled.h1`
  display: block;
  margin-bottom: ${props => props.theme.spacing[3]};

  &:hover h3 {
    color: ${props => props.theme.colors.primary};
  }
`;

export const PostTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes['2xl']};
  transition: color ${props => props.theme.transitions.fast};
`;

export const Excerpt = styled.p`
  margin-bottom: ${props => props.theme.spacing[5]};
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.8;
`;

export const ContentFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[4]};
`;

export const Metrics = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const Metric = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
`;

export const ReadLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};

  &:hover {
    text-decoration: underline;
  }
`;
