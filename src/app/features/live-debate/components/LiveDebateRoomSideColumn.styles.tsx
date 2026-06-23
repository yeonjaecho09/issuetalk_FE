import styled, { css } from 'styled-components';
import { DangerButton, PrimaryButton } from '../../../components/ui/primitives';

export const ParticipationPanel = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const ParticipationHint = styled.p`
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.7;
`;

export const ParticipationBadge = styled.div<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => (props.$active ? props.theme.colors.primaryForeground : props.theme.colors.foreground)};
  background: ${props =>
    props.$active
      ? `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.accent})`
      : props.theme.colors.secondary};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const ParticipationActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${props => props.theme.spacing[3]};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ParticipationSecondaryActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[3]};
`;

export const ParticipationButton = styled(PrimaryButton)<{ $secondary?: boolean }>`
  width: 100%;
  background: ${props =>
    props.$secondary
      ? `linear-gradient(135deg, ${props.theme.colors.liveRed}, ${props.theme.colors.accent})`
      : `linear-gradient(135deg, ${props.theme.colors.primary}, #818cf8)`};
`;

export const VotePanel = styled.div`
  margin-top: ${props => props.theme.spacing[4]};
  display: grid;
  gap: ${props => props.theme.spacing[3]};
`;

export const VoteBar = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.secondary};
`;

export const VoteFillRow = styled.div`
  display: flex;
  min-height: 0.9rem;
`;

const voteFillBase = css<{ $width: number }>`
  width: ${props => `${props.$width}%`};
  transition: width ${props => props.theme.transitions.normal};
`;

export const VoteFillPrimary = styled.div<{ $width: number }>`
  ${voteFillBase};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, #818cf8);
`;

export const VoteFillAccent = styled.div<{ $width: number }>`
  ${voteFillBase};
  background: linear-gradient(135deg, ${props => props.theme.colors.liveRed}, ${props => props.theme.colors.accent});
`;

export const VoteMetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  flex-wrap: wrap;
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const VoteActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${props => props.theme.spacing[3]};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const VoteButton = styled(PrimaryButton)<{ $secondary?: boolean }>`
  width: 100%;
  background: ${props =>
    props.$secondary
      ? `linear-gradient(135deg, ${props.theme.colors.liveRed}, ${props.theme.colors.accent})`
      : `linear-gradient(135deg, ${props.theme.colors.primary}, #818cf8)`};

  &:hover:not(:disabled) {
    background: ${props =>
      props.$secondary
        ? `linear-gradient(135deg, ${props.theme.colors.liveRed}, ${props.theme.colors.accent})`
        : `linear-gradient(135deg, ${props.theme.colors.primary}, #818cf8)`};
  }
`;

export const VoteHint = styled.p`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
  line-height: 1.7;
`;

export const InfoList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};
  padding-bottom: ${props => props.theme.spacing[3]};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const InfoLabel = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
`;

export const InfoValue = styled.div`
  text-align: right;
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

export const ReportText = styled.p`
  margin-top: ${props => props.theme.spacing[3]};
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.7;
`;

export const ReportButtonWrap = styled.div`
  margin-top: ${props => props.theme.spacing[3]};
`;

export const ReportButton = styled(DangerButton)``;

export const ReportSuccess = styled.div`
  margin-top: ${props => props.theme.spacing[3]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.lg};
  color: #166534;
  background: #dcfce7;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
`;
