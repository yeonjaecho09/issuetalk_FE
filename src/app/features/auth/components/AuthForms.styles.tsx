import styled from 'styled-components';
import { Link } from 'react-router';
import { PrimaryButton, SecondaryButton } from '../../../components/ui/primitives';

export const FormGrid = styled.form`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

export const TwoColumnGrid = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FieldLabel = styled.label`
  display: grid;
  gap: ${props => props.theme.spacing[2]};
`;

export const TextInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
`;

export const InputRow = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[2]};
  margin-top: ${props => props.theme.spacing[2]};

  @media (max-width: 640px) {
    flex-wrap: wrap;
  }
`;

export const HelperRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  flex-wrap: wrap;
`;

export const CheckboxLabel = styled.label`
  display: inline-flex;
  gap: ${props => props.theme.spacing[2]};
  align-items: center;
`;

export const InlineLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const NoticeCard = styled.div`
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  background-color: rgba(99, 102, 241, 0.04);
`;

export const VerificationCard = styled.div`
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
`;

export const VerificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  align-items: center;
`;

export const VerificationText = styled.p`
  margin-top: ${props => props.theme.spacing[3]};
  color: ${props => props.theme.colors.mutedForeground};
`;

export const FormSubmitButton = styled(PrimaryButton)`
  width: 100%;
`;

export const InlineActionButton = styled(SecondaryButton)`
  white-space: nowrap;
`;
