import type { ReactNode } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import { MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  footerPrompt: string;
  footerLinkLabel: string;
  footerLinkTo: string;
  children: ReactNode;
  sideTitle: string;
  sideDescription: string;
  highlights: string[];
};

const Page = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[10]} ${props => props.theme.spacing[6]} ${props => props.theme.spacing[16]};
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  gap: ${props => props.theme.spacing[6]};
  align-items: stretch;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
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

const SidePanel = styled(Panel)`
  padding: ${props => props.theme.spacing[10]};
  color: white;
  background:
    linear-gradient(145deg, rgba(17, 24, 39, 0.92), rgba(99, 102, 241, 0.9)),
    linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing[8]};
  }
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

const FooterLink = styled(Link)`
  margin-left: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.bold};

  &:hover {
    text-decoration: underline;
  }
`;

const SideBrand = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const SideBrandIcon = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(8px);
`;

const SideBrandText = styled.div`
  display: flex;
  flex-direction: column;
`;

const SideBrandTitle = styled.strong`
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes.xl};
`;

const SideBrandCaption = styled.span`
  color: rgba(255, 255, 255, 0.75);
  font-size: ${props => props.theme.fontSizes.sm};
`;

const SideTitle = styled.h2`
  margin-bottom: ${props => props.theme.spacing[3]};
  color: white;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
`;

const SideDescription = styled.p`
  margin-bottom: ${props => props.theme.spacing[8]};
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.8;
`;

const HighlightList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[4]};
`;

const Highlight = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing[3]};
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: rgba(255, 255, 255, 0.08);
`;

const HighlightIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.lg};
  background-color: rgba(255, 255, 255, 0.12);
`;

const HighlightText = styled.p`
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.7;
`;

export function AuthShell({
  eyebrow,
  title,
  description,
  footerPrompt,
  footerLinkLabel,
  footerLinkTo,
  children,
  sideTitle,
  sideDescription,
  highlights,
}: AuthShellProps) {
  return (
    <Page>
      <Grid>
        <FormPanel>
          <AmbientGlow />
          <Eyebrow>
            <Sparkles size={16} />
            {eyebrow}
          </Eyebrow>
          <Title>{title}</Title>
          <Description>{description}</Description>
          {children}
          <FooterRow>
            {footerPrompt}
            <FooterLink to={footerLinkTo}>{footerLinkLabel}</FooterLink>
          </FooterRow>
        </FormPanel>

        <SidePanel>
          <SideBrand>
            <SideBrandIcon>
              <MessageCircle size={20} />
            </SideBrandIcon>
            <SideBrandText>
              <SideBrandTitle>IssueTalk</SideBrandTitle>
              <SideBrandCaption>토론과 커뮤니티를 위한 공간</SideBrandCaption>
            </SideBrandText>
          </SideBrand>

          <SideTitle>{sideTitle}</SideTitle>
          <SideDescription>{sideDescription}</SideDescription>

          <HighlightList>
            {highlights.map(item => (
              <Highlight key={item}>
                <HighlightIcon>
                  <ShieldCheck size={18} />
                </HighlightIcon>
                <HighlightText>{item}</HighlightText>
              </Highlight>
            ))}
          </HighlightList>
        </SidePanel>
      </Grid>
    </Page>
  );
}
