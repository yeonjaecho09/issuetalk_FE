import styled from 'styled-components';
import { SectionTitle, SurfaceCard } from '../../../components/ui/primitives';

export const PostsCardRoot = SurfaceCard;
export const PostsSectionTitle = SectionTitle;

export const PostList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

export const PostCard = styled.article`
  padding: ${props => props.theme.spacing[5]};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: rgba(248, 250, 252, 0.82);
`;

export const PostCategory = styled.div`
  margin-bottom: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const PostTitle = styled.h3`
  margin-bottom: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes.xl};
`;

export const PostExcerpt = styled.p`
  margin-bottom: ${props => props.theme.spacing[3]};
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.7;
`;

export const PostMeta = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;
