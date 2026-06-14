import styled from 'styled-components';
import { SurfaceCard } from '../../../components/ui/primitives';

export const Sidebar = styled.aside`
  display: grid;
  gap: ${props => props.theme.spacing[5]};
  align-content: start;
`;

export const SidebarCard = SurfaceCard;

export const SidebarTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

export const HotList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
`;

export const HotItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${props => props.theme.spacing[3]};
  align-items: start;
`;

export const Rank = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const HotText = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[1]};
`;

export const HotTitle = styled.div`
  font-weight: ${props => props.theme.fontWeights.semibold};
  line-height: 1.5;
`;

export const HotMeta = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.xs};
`;

export const GuideList = styled.ul`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  padding-left: ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.7;
`;
