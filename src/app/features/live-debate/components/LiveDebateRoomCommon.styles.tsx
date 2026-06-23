import { Link } from 'react-router';
import styled from 'styled-components';
import { SurfaceCard } from '../../../components/ui/primitives';

export const BackLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const NotFoundActions = styled.div`
  margin-top: ${props => props.theme.spacing[4]};
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(300px, 0.95fr);
  gap: ${props => props.theme.spacing[4]};
  margin-top: ${props => props.theme.spacing[4]};

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

export const MainColumn = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

export const SideColumn = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

export const SectionCard = styled(SurfaceCard)``;

export const SectionTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  flex-wrap: wrap;
`;

export const SectionCaption = styled.p`
  margin-top: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.7;
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.div`
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  background: ${props => props.theme.colors.secondary};
`;

export const MetricLabel = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const MetricValue = styled.div`
  margin-top: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.extrabold};
`;
