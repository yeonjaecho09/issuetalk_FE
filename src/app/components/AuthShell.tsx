import type { ReactNode } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import { Sparkles } from 'lucide-react';

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  footerPrompt: string;
  footerLinkLabel: string;
  footerLinkTo: string;
  secondaryFooterPrompt?: string;
  secondaryFooterLinkLabel?: string;
  secondaryFooterLinkTo?: string;
  children: ReactNode;
  sideTitle: string;
  sideDescription: string;
  highlights: string[];
};

const Page = styled.main`
  max-width: 100%;
  padding: ${props => props.theme.spacing[10]} ${props => props.theme.spacing[6]} ${props => props.theme.spacing[16]};
  display: flex;
  justify-content: center;
`;

const Panel = styled.div`
  width: 50vw;
  position: relative;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid rgba(99, 102, 241, 0.18);
  background-color: ${props => props.theme.colors.card};
  box-shadow: ${props => props.theme.shadows.lg};
`;

const FormPanel = styled(Panel)`
  padding: ${props => props.theme.spacing[10]};

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing[8]};
  }
`;

const AmbientGlow = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top left, rgba(99, 102, 241, 0.18), transparent 35%),
    radial-gradient(circle at bottom right, rgba(236, 72, 153, 0.14), transparent 30%);
  pointer-events: none;
`;


const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[5]};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => props.theme.colors.primary};
  background-color: rgba(99, 102, 241, 0.1);
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
  letter-spacing: 0.02em;
`;

const Title = styled.h1`
  margin-bottom: ${props => props.theme.spacing[3]};
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.05;
`;

const Description = styled.p`
  max-width: 34rem;
  margin-bottom: ${props => props.theme.spacing[8]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.lg};
  line-height: 1.7;
`;

const FooterRow = styled.div`
  margin-top: ${props => props.theme.spacing[6]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const FooterStack = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
`;

const FooterLink = styled(Link)`
  margin-left: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.bold};

  &:hover {
    text-decoration: underline;
  }
`;


export function AuthShell({
  eyebrow,
  title,
  description,
  footerPrompt,
  footerLinkLabel,
  footerLinkTo,
  secondaryFooterPrompt,
  secondaryFooterLinkLabel,
  secondaryFooterLinkTo,
  children,
}: AuthShellProps) {
  return (
    <Page>
        <FormPanel>
          <AmbientGlow />
          <Eyebrow>
            <Sparkles size={16} />
            {eyebrow}
          </Eyebrow>
          <Title>{title}</Title>
          <Description>{description}</Description>
          {children}
          <FooterStack>
            <FooterRow>
              {footerPrompt}
              <FooterLink to={footerLinkTo}>{footerLinkLabel}</FooterLink>
            </FooterRow>
            {secondaryFooterPrompt && secondaryFooterLinkLabel && secondaryFooterLinkTo ? (
              <FooterRow>
                {secondaryFooterPrompt}
                <FooterLink to={secondaryFooterLinkTo}>{secondaryFooterLinkLabel}</FooterLink>
              </FooterRow>
            ) : null}
          </FooterStack>
        </FormPanel>
    </Page>
  );
}
