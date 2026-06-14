import { Link } from 'react-router';
import styled from 'styled-components';

const CONTROL_HEIGHT = '2.9rem';
const COMPACT_CONTROL_HEIGHT = '2.7rem';

export const LayoutContainer = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(99, 102, 241, 0.08), transparent 35%),
    ${props => props.theme.colors.background};
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.sm};
`;

export const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  padding: 0 ${props => props.theme.spacing[5]};
`;

export const HeaderContent = styled.div`
  min-height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[5]};

  @media (max-width: 1180px) {
    gap: ${props => props.theme.spacing[4]};
  }

  @media (max-width: 920px) {
    padding: ${props => props.theme.spacing[4]} 0;
    flex-wrap: wrap;
  }
`;

export const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  flex: 0 0 auto;
  transition: transform ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-1px);
  }
`;

export const LogoCopy = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LogoIcon = styled.div`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: ${props => props.theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  box-shadow: ${props => props.theme.shadows.md};
`;

export const LogoText = styled.strong`
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.extrabold};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const LogoCaption = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.mutedForeground};

  @media (max-width: 1180px) {
    display: none;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  flex: 1;
  min-width: 0;
  justify-content: center;
  margin: 0 ${props => props.theme.spacing[2]};

  @media (max-width: 920px) {
    order: 3;
    width: 100%;
    margin: 0;
    justify-content: stretch;
  }

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const NavLink = styled(Link)<{ $isActive?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  min-height: ${CONTROL_HEIGHT};
  padding: 0 ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.xl};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
  transition: all ${props => props.theme.transitions.fast};
  border: 1px solid transparent;
  white-space: nowrap;

  @media (max-width: 1180px) {
    min-height: ${COMPACT_CONTROL_HEIGHT};
    padding: 0 ${props => props.theme.spacing[3]};
    font-size: ${props => props.theme.fontSizes.xs};
  }

  ${props =>
    props.$isActive
      ? `
    color: ${props.theme.colors.primaryForeground};
    background: linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.accent});
    box-shadow: ${props.theme.shadows.md};
  `
      : `
    color: ${props.theme.colors.foreground};
    background-color: rgba(255, 255, 255, 0.65);
    border-color: ${props.theme.colors.border};

    &:hover {
      border-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.primary};
    }
  `}
`;

export const ActionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  justify-content: center;
  min-height: ${CONTROL_HEIGHT};
  padding: 0 ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.foreground};
  background: rgba(255, 255, 255, 0.72);
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
  white-space: nowrap;
  transition:
    background-color ${props => props.theme.transitions.fast},
    border-color ${props => props.theme.transitions.fast},
    color ${props => props.theme.transitions.fast};

  @media (max-width: 1180px) {
    min-height: ${COMPACT_CONTROL_HEIGHT};
    padding: 0 ${props => props.theme.spacing[3]};
    font-size: ${props => props.theme.fontSizes.xs};
  }

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
    background-color: #eef2ff;
  }
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  justify-content: center;
  min-height: ${CONTROL_HEIGHT};
  padding: 0 ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.foreground};
  background: rgba(255, 255, 255, 0.72);
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  white-space: nowrap;
  transition:
    background-color ${props => props.theme.transitions.fast},
    border-color ${props => props.theme.transitions.fast},
    color ${props => props.theme.transitions.fast};

  @media (max-width: 1180px) {
    min-height: ${COMPACT_CONTROL_HEIGHT};
    padding: 0 ${props => props.theme.spacing[3]};
    font-size: ${props => props.theme.fontSizes.xs};
  }

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
    background-color: #eef2ff;
  }
`;

export const HeaderActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  flex-wrap: wrap;
  flex: 0 1 auto;
  justify-content: flex-end;
  row-gap: ${props => props.theme.spacing[2]};

  @media (max-width: 1180px) {
    gap: ${props => props.theme.spacing[1]};
  }
`;

export const UserGreeting = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${CONTROL_HEIGHT};
  padding: 0 ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: rgba(99, 102, 241, 0.08);
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};

  @media (max-width: 1180px) {
    display: none;
  }
`;

export const Footer = styled.footer`
  display: none;
`;

export const FooterContainer = styled.div``;
export const FooterContent = styled.div``;
export const FooterBrand = styled.div``;
export const FooterIcon = styled.div``;
export const FooterText = styled.div``;
export const FooterTitle = styled.span``;
export const FooterCaption = styled.span``;
export const Copyright = styled.span``;
