/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { DangerButton, HeroDescription, HeroSection, HeroTitle, SecondaryButton, SurfaceCard } from '../../../components/ui/primitives';

export const AdminHero = HeroSection;
export const AdminTitle = HeroTitle;
export const AdminDescription = HeroDescription;

export const AdminStack = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

export const AdminCard = SurfaceCard;

export const ItemList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const ItemCard = styled.div`
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
`;

export const ItemText = styled.p`
  margin-top: ${props => props.theme.spacing[2]};
`;

export const ItemMeta = styled.div`
  margin-top: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const ItemActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[2]};
  flex-wrap: wrap;
  margin-top: ${props => props.theme.spacing[3]};
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
  padding-top: ${props => props.theme.spacing[3]};
  border-top: 1px solid ${props => props.theme.colors.border};

  > div:last-child {
    display: flex;
    gap: ${props => props.theme.spacing[2]};
  }
`;

export const PaginationInfo = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const PaginationButton = styled(SecondaryButton)`
  min-width: 4.5rem;
`;

export const AdminActionButton = styled(SecondaryButton)``;
export const AdminDangerButton = styled(DangerButton)``;
