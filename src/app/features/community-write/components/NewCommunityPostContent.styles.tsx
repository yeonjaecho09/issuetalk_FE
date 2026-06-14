import { Link } from 'react-router';
/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { HeroDescription, HeroSection, HeroTitle, PillButton, PrimaryButton, SecondaryButton, SurfaceCard } from '../../../components/ui/primitives';

export const BackLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const WriteHero = styled(HeroSection)`
  margin-top: ${props => props.theme.spacing[4]};
`;

export const WriteHeroTitle = HeroTitle;
export const WriteHeroDescription = HeroDescription;

export const WriteGrid = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.8fr);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const FormCard = SurfaceCard;
export const SideCard = SurfaceCard;

export const WriteForm = styled.form`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
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

export const TextArea = styled.div`
  min-height: 14rem;
  width: 100%;
  padding: ${props => props.theme.spacing[4]};
  line-height: 1.7;
  outline: none;
  white-space: pre-wrap;
  overflow-wrap: anywhere;

  &[contenteditable='true']:empty::before {
    content: attr(data-placeholder);
    color: ${props => props.theme.colors.mutedForeground};
  }

  &:focus {
    background: rgba(99, 102, 241, 0.02);
  }

  p,
  blockquote,
  ul,
  ol {
    margin: 0 0 ${props => props.theme.spacing[3]} 0;
  }

  ul,
  ol {
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

  img {
    display: block;
    width: 100%;
    max-height: 24rem;
    margin: ${props => props.theme.spacing[3]} 0;
    object-fit: cover;
    border-radius: ${props => props.theme.borderRadius.xl};
    border: 1px solid ${props => props.theme.colors.border};
  }
`;

export const EditorShell = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  background: ${props => props.theme.colors.card};
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[3]};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.secondary};
`;

export const ToolbarButton = styled(SecondaryButton)<{ $active?: boolean }>`
  min-height: 2.4rem;
  padding: 0 ${props => props.theme.spacing[3]};
  border-color: ${props => (props.$active ? props.theme.colors.primary : props.theme.colors.border)};
  color: ${props => (props.$active ? props.theme.colors.primary : props.theme.colors.foreground)};
  background: ${props => (props.$active ? 'rgba(99, 102, 241, 0.12)' : props.theme.colors.secondary)};
  box-shadow: ${props => (props.$active ? props.theme.shadows.sm : 'none')};
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const HelperText = styled.p`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
  line-height: 1.7;
`;

export const PreviewCard = styled(SurfaceCard)`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

export const PreviewTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
`;

export const PreviewBody = styled.div`
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
    max-height: 28rem;
    object-fit: cover;
    border-radius: ${props => props.theme.borderRadius.xl};
    border: 1px solid ${props => props.theme.colors.border};
  }
`;

export const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[2]};
  margin-top: ${props => props.theme.spacing[3]};
`;

export const CategoryButton = styled(PillButton)``;

export const ActionRow = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[3]};
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const SubmitButton = styled(PrimaryButton)``;

export const CancelLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const GuideList = styled.ul`
  margin-top: ${props => props.theme.spacing[4]};
  padding-left: 1.25rem;
  display: grid;
  gap: ${props => props.theme.spacing[3]};
`;
