import styled from 'styled-components';
import { SectionTitle, SurfaceCard } from '../../../components/ui/primitives';

export const ProfileCardRoot = SurfaceCard;
export const ProfileSectionTitle = SectionTitle;

export const ProfileTop = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[5]};
`;

export const Avatar = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.full};
  color: white;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const ProfileName = styled.div`
  margin-bottom: ${props => props.theme.spacing[1]};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const ProfileMeta = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[5]};
`;

export const StatCard = styled.div`
  padding: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: rgba(99, 102, 241, 0.06);
`;

export const StatLabel = styled.div`
  margin-bottom: ${props => props.theme.spacing[1]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.xs};
`;

export const StatValue = styled.div`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const InfoList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const Strong = styled.strong`
  color: ${props => props.theme.colors.foreground};
`;
