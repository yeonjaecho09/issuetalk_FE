import styled, { css } from 'styled-components';

export const PageContainer = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[6]} ${props => props.theme.spacing[16]};
`;

export const HeroSection = styled.section`
  margin-bottom: ${props => props.theme.spacing[8]};
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid rgba(99, 102, 241, 0.18);
  background:
    radial-gradient(circle at top right, rgba(236, 72, 153, 0.14), transparent 28%),
    linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(255, 255, 255, 0.95));
`;

export const HeroEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => props.theme.colors.primary};
  background-color: rgba(99, 102, 241, 0.1);
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const HeroTitle = styled.h1`
  margin-bottom: ${props => props.theme.spacing[3]};
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.08;
`;

export const HeroDescription = styled.p`
  max-width: 44rem;
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.8;
`;

export const SurfaceCard = styled.section`
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
  box-shadow: ${props => props.theme.shadows.sm};
  word-break: keep-all;  
  word-break: break-all;  
`;

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[4]};
  font-size: ${props => props.theme.fontSizes['2xl']};
`;

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: ${props => props.theme.spacing[2]};
  min-height: 2.75rem;
  padding: 0 ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid transparent;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
  transition:
    background-color ${props => props.theme.transitions.fast},
    background ${props => props.theme.transitions.fast},
    color ${props => props.theme.transitions.fast},
    box-shadow ${props => props.theme.transitions.fast},
    border-color ${props => props.theme.transitions.fast},
    opacity ${props => props.theme.transitions.fast};

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const PrimaryButton = styled.button`
  ${buttonBase};
  color: ${props => props.theme.colors.primaryForeground};
  background: ${props => props.theme.colors.primary};
  box-shadow: ${props => props.theme.shadows.md};

`;

export const SecondaryButton = styled.button`
  ${buttonBase};
  color: ${props => props.theme.colors.foreground};
  border-color: ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.secondary};

  &:hover:not(:disabled) {
    border-color: ${props => props.theme.colors.primary};
    background-color: #e2e8f0;
  }
`;

export const DangerButton = styled.button`
  ${buttonBase};
  color: white;
  background: ${props => props.theme.colors.destructive};
  box-shadow: ${props => props.theme.shadows.sm};

  &:hover:not(:disabled) {
    background: #dc2626;
  }
`;

export const PillButton = styled.button<{ $active?: boolean }>`
  min-width: 2.75rem;
  height: 2.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[1]};
  padding: 0 ${props => props.theme.spacing[4]};
  border: 1px solid ${props => (props.$active ? 'transparent' : props.theme.colors.border)};
  border-radius: ${props => props.theme.borderRadius.xl};
  color: ${props => (props.$active ? props.theme.colors.primaryForeground : props.theme.colors.foreground)};
  background: ${props => (props.$active ? props.theme.colors.primary : props.theme.colors.card)};
  box-shadow: ${props => (props.$active ? props.theme.shadows.md : 'none')};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition:
    background-color ${props => props.theme.transitions.fast},
    background ${props => props.theme.transitions.fast},
    border-color ${props => props.theme.transitions.fast},
    color ${props => props.theme.transitions.fast};

  &:hover:not(:disabled) {
    border-color: ${props => (props.$active ? 'transparent' : props.theme.colors.primary)};
    background: ${props => (props.$active ? '#4f46e5' : '#eef2ff')};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;
