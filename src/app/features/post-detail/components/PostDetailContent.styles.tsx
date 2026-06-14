import { Link } from 'react-router';
import styled from 'styled-components';
import { PrimaryButton, SurfaceCard } from '../../../components/ui/primitives';

export const BackLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const NotFoundActions = styled.div`
  margin-top: ${props => props.theme.spacing[4]};
`;

export const DetailCard = styled(SurfaceCard)`
  margin-top: ${props => props.theme.spacing[4]};
`;

export const DetailTitle = styled.h1`
  margin-top: ${props => props.theme.spacing[3]};
`;

export const DetailMeta = styled.div`
  margin-top: ${props => props.theme.spacing[3]};
  color: ${props => props.theme.colors.mutedForeground};
`;

export const DetailBody = styled.p`
  margin-top: ${props => props.theme.spacing[4]};
  white-space: pre-line;
`;

export const SectionCard = styled(SurfaceCard)`
  margin-top: ${props => props.theme.spacing[4]};
`;

export const CommentForm = styled.form`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const CommentTextarea = styled.textarea`
  min-height: 7rem;
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  resize: vertical;
`;

export const SubmitButton = styled(PrimaryButton)``;

export const CommentList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const CommentCard = styled.div`
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
`;

export const CommentText = styled.p`
  margin-top: ${props => props.theme.spacing[2]};
`;
