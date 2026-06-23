import { Link } from 'react-router';
import styled from 'styled-components';
import { PrimaryButton, SecondaryButton, SurfaceCard } from '../../../components/ui/primitives';

export const BackLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const DetailCard = styled(SurfaceCard)`
  margin-top: ${props => props.theme.spacing[4]};
`;

export const NotFoundActions = styled.div`
  margin-top: ${props => props.theme.spacing[4]};
`;

export const DetailTitle = styled.h1`
  margin-top: ${props => props.theme.spacing[3]};
`;

export const DetailMeta = styled.div`
  margin-top: ${props => props.theme.spacing[3]};
  color: ${props => props.theme.colors.mutedForeground};
`;

export const DetailBody = styled.div`
  margin-top: ${props => props.theme.spacing[4]};
  display: grid;
  gap: ${props => props.theme.spacing[4]};
  line-height: 1.8;

  h1,
  h2,
  h3 {
    line-height: 1.25;
  }

  p,
  blockquote,
  ul {
    margin: 0;
  }

  ul {
    padding-left: 1.25rem;
  }

  blockquote {
    padding-left: ${props => props.theme.spacing[4]};
    border-left: 3px solid ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.mutedForeground};
  }

  code {
    padding: 0.125rem 0.375rem;
    border-radius: ${props => props.theme.borderRadius.md};
    background: ${props => props.theme.colors.secondary};
    font-size: 0.95em;
  }

  a {
    color: ${props => props.theme.colors.primary};
    font-weight: ${props => props.theme.fontWeights.semibold};
  }

  img {
    width: 100%;
    max-height: 32rem;
    object-fit: cover;
    border-radius: ${props => props.theme.borderRadius.xl};
    border: 1px solid ${props => props.theme.colors.border};
  }
`;

export const SectionStack = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const ActionButton = styled(SecondaryButton)``;
export const SubmitButton = styled(PrimaryButton)``;

export const FormGrid = styled.form`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
`;

export const CommentTextarea = styled.textarea`
  min-height: 7rem;
  max-height: 18rem;
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  resize: none;
  overflow: hidden;
`;

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
