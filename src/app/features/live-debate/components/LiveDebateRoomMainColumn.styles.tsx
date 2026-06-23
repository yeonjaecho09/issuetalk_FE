import styled from 'styled-components';
import { PrimaryButton, SecondaryButton } from '../../../components/ui/primitives';

export const ComposerForm = styled.form`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const ComposerTextarea = styled.textarea`
  min-height: 8rem;
  max-height: 20rem;
  resize: none;
  overflow: hidden;
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  background: ${props => props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.foreground};
  font: inherit;

  &:focus {
    outline: 2px solid rgba(99, 102, 241, 0.18);
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const ComposerFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  flex-wrap: wrap;
`;

export const ComposerButton = styled(PrimaryButton)``;

export const TimeCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  flex-wrap: wrap;
`;

export const TimeCardMeta = styled.span`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const TimeMetricRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[3]};
`;

export const TimeMetricCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0 1 14rem;
  min-width: 12rem;
  gap: ${props => props.theme.spacing[3]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  background: ${props => props.theme.colors.secondary};
`;

export const TimeMetricLabel = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const TimeMetricValue = styled.div`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.extrabold};
`;

export const TimelineList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const TimelineItem = styled.div<{ $active?: boolean }>`
  position: relative;
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[4]} ${props => props.theme.spacing[4]} ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: 1px solid ${props => (props.$active ? props.theme.colors.primary : props.theme.colors.border)};
  background: ${props => (props.$active ? 'rgba(99, 102, 241, 0.08)' : props.theme.colors.card)};

  &::before {
    content: '';
    position: absolute;
    left: ${props => props.theme.spacing[3]};
    top: ${props => props.theme.spacing[5]};
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 9999px;
    background: ${props => (props.$active ? props.theme.colors.primary : props.theme.colors.border)};
  }
`;

export const TimelineTitle = styled.div`
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const TimelineText = styled.p`
  margin-top: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.7;
`;

export const MessageList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const MessageRow = styled.div<{ $align: 'left' | 'right' }>`
  display: flex;
  justify-content: ${props => (props.$align === 'right' ? 'flex-end' : 'flex-start')};
`;

export const MessageCard = styled.article<{ $isCurrent?: boolean; $align: 'left' | 'right'; $side: 'pro' | 'con' }>`
  max-width: min(88%, 38rem);
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid
    ${props =>
      props.$side === 'pro'
        ? 'rgba(59, 130, 246, 0.3)'
        : props.$isCurrent
          ? 'rgba(239, 68, 68, 0.34)'
          : 'rgba(251, 146, 60, 0.26)'};
  border-radius: ${props =>
    props.$align === 'right'
      ? `${props.theme.borderRadius.xl} ${props.theme.borderRadius.xl} ${props.theme.borderRadius.sm} ${props.theme.borderRadius.xl}`
      : `${props.theme.borderRadius.xl} ${props.theme.borderRadius.xl} ${props.theme.borderRadius.xl} ${props.theme.borderRadius.sm}`};
  background: ${props =>
    props.$side === 'pro'
      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.16), rgba(96, 165, 250, 0.08))'
      : props.$isCurrent
        ? 'linear-gradient(135deg, rgba(248, 113, 113, 0.18), rgba(251, 146, 60, 0.1))'
        : 'linear-gradient(135deg, rgba(251, 146, 60, 0.16), rgba(253, 186, 116, 0.08))'};
  box-shadow: ${props => (props.$isCurrent ? props.theme.shadows.sm : 'none')};
`;

export const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  flex-wrap: wrap;
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const MessageSpeaker = styled.div`
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const MessageSpeakerMeta = styled.span<{ $side: 'pro' | 'con' }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => (props.$side === 'pro' ? '#1d4ed8' : '#c2410c')};
  background: ${props => (props.$side === 'pro' ? 'rgba(59, 130, 246, 0.12)' : 'rgba(251, 146, 60, 0.16)')};
`;

export const MessageTimestamp = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
`;

export const MessageText = styled.p`
  margin-top: ${props => props.theme.spacing[2]};
  line-height: 1.8;
`;

export const QuestionForm = styled.form`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const QuestionTextarea = styled.textarea`
  min-height: 7.5rem;
  max-height: 18rem;
  resize: none;
  overflow: hidden;
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  background: ${props => props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.foreground};
  font: inherit;

  &:focus {
    outline: 2px solid rgba(99, 102, 241, 0.18);
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const QuestionActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  align-items: center;
  flex-wrap: wrap;
`;

export const CharacterCount = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const QuestionSubmitButton = styled(SecondaryButton)``;

export const QuestionList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const QuestionCard = styled.div`
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  background: ${props => props.theme.colors.card};
`;

export const QuestionMeta = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const QuestionText = styled.p`
  margin-top: ${props => props.theme.spacing[2]};
  line-height: 1.7;
`;
