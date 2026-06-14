import styled from 'styled-components';
import { SectionTitle, SurfaceCard } from '../../../components/ui/primitives';

export const SettingsCardRoot = SurfaceCard;
export const SettingsSectionTitle = SectionTitle;

export const SettingList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
`;

export const SettingItem = styled.div`
  padding: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: rgba(248, 250, 252, 0.82);
`;

export const SettingTitle = styled.div`
  margin-bottom: ${props => props.theme.spacing[1]};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const SettingCopy = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
  line-height: 1.6;
`;
