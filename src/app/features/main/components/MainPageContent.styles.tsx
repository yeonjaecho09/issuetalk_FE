import { Link } from 'react-router';
import styled from 'styled-components';
import { HeroDescription, HeroSection, HeroTitle, SectionTitle, SurfaceCard } from '../../../components/ui/primitives';

export const TopicSection = styled(HeroSection)``;

export const TopicEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => props.theme.colors.primary};
  background-color: rgba(99, 102, 241, 0.1);
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const TopicTitle = styled(HeroTitle)`
  max-width: 100rem;
`;

export const TopicDescription = styled(HeroDescription)``;

export const LiveCard = styled(SurfaceCard).attrs({ as: Link })`
  display: block;
  margin-bottom: ${props => props.theme.spacing[8]};
  text-decoration: none;
  color: ${props => props.theme.colors.primaryForeground};
  background: linear-gradient(135deg, ${props => props.theme.colors.liveRed}, ${props => props.theme.colors.accent});
  box-shadow: ${props => props.theme.shadows.md};
  transition:
    transform ${props => props.theme.transitions.fast},
    box-shadow ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

export const LiveEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

export const LiveBadge = styled.span`
  padding: 0.125rem ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: rgba(255, 255, 255, 0.2);
`;

export const LiveTitle = styled.h2`
  margin-top: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: white;
`;

export const LiveMeta = styled.p`
  margin-top: ${props => props.theme.spacing[2]};
  color: rgba(255, 255, 255, 0.9);
`;

export const PostsSection = styled.section``;

export const PostsTitle = styled(SectionTitle)``;

export const PostsList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

export const PostLinkCard = styled(SurfaceCard).attrs({ as: Link })`
  display: block;
  text-decoration: none;
  transition:
    transform ${props => props.theme.transitions.fast},
    box-shadow ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};
  align-items: flex-start;
`;

export const PostCategory = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => props.theme.colors.primary};
  background-color: rgba(99, 102, 241, 0.1);
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const PostExcerpt = styled.p`
  margin-top: ${props => props.theme.spacing[3]};
  color: ${props => props.theme.colors.mutedForeground};
`;

export const PostMeta = styled.p`
  margin-top: ${props => props.theme.spacing[3]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;
