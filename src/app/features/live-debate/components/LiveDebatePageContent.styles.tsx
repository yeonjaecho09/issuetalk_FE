import { Link } from 'react-router';
import styled from 'styled-components';
import { HeroSection, HeroTitle, PrimaryButton, SurfaceCard } from '../../../components/ui/primitives';

export const DebateHeader = styled(HeroSection)`
  margin-bottom: ${props => props.theme.spacing[6]};
  color: white;
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.18), transparent 26%),
    linear-gradient(135deg, ${props => props.theme.colors.liveRed}, ${props => props.theme.colors.accent});
  box-shadow: ${props => props.theme.shadows.lg};

  p {
    margin-top: ${props => props.theme.spacing[3]};
    color: rgba(255, 255, 255, 0.86);
  }
`;

export const DebateTitle = styled(HeroTitle)`
  color: white;
`;

export const DebateEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: rgba(255, 255, 255, 0.16);
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const RoomList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

export const CreatePanel = styled(SurfaceCard)`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[5]};
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[5]};

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const CreatePanelMeta = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const CreatePanelTitle = styled.h2`
  margin-top: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes['2xl']};
  line-height: 1.3;
`;

export const CreateHelperText = styled.p`
  margin-top: ${props => props.theme.spacing[3]};
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.7;
`;

export const CreatePanelButton = styled(PrimaryButton)`
  min-width: 14rem;
`;

export const ParticipationNotice = styled(SurfaceCard)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[5]};
  border-color: rgba(99, 102, 241, 0.24);
  background:
    linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(255, 255, 255, 0.96)),
    ${props => props.theme.colors.card};

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const ParticipationNoticeTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xl};
`;

export const ParticipationNoticeText = styled.p`
  margin-top: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.7;
`;

export const ParticipantRoomLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: 0 ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.lg};
  color: ${props => props.theme.colors.primaryForeground};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  box-shadow: ${props => props.theme.shadows.md};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
  white-space: nowrap;
`;

export const EmptyState = styled(SurfaceCard)`
  color: ${props => props.theme.colors.mutedForeground};
  text-align: center;
  line-height: 1.8;
`;

export const RoomCard = styled(SurfaceCard)`
  transition:
    transform ${props => props.theme.transitions.fast},
    box-shadow ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

export const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};
  flex-wrap: wrap;
`;

export const RoomSummary = styled.p`
  margin-top: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.7;
`;

export const RoomStatus = styled.div<{ $live?: boolean }>`
  align-self: flex-start;
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => (props.$live ? props.theme.colors.primaryForeground : props.theme.colors.foreground)};
  background: ${props => (props.$live ? `linear-gradient(135deg, ${props.theme.colors.liveRed}, ${props.theme.colors.accent})` : props.theme.colors.secondary)};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const RoomTagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[2]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const RoomTag = styled.span`
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => props.theme.colors.primary};
  background: rgba(99, 102, 241, 0.1);
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const RoomVersus = styled.div`
  margin-top: ${props => props.theme.spacing[4]};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const RoomMeta = styled.div`
  margin-top: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
  line-height: 1.7;
`;

export const RoomActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const ReserveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: 0 ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid transparent;
  color: ${props => props.theme.colors.primaryForeground};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  box-shadow: ${props => props.theme.shadows.md};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const WatchLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: 0 ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.foreground};
  background-color: ${props => props.theme.colors.card};
`;

export const WatchDisabled = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: 0 ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.mutedForeground};
  background-color: ${props => props.theme.colors.secondary};
`;

export const ReserveMeta = styled.p`
  margin-top: ${props => props.theme.spacing[3]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;
