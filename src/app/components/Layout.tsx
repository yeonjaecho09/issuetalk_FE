import { Link, Outlet, useLocation } from 'react-router';
import styled from 'styled-components';
import { MessageCircle, Radio, Trophy } from 'lucide-react';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(99, 102, 241, 0.08), transparent 35%),
    ${props => props.theme.colors.background};
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const HeaderContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[6]};
`;

const HeaderContent = styled.div`
  min-height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};

  @media (max-width: 768px) {
    min-height: auto;
    padding: ${props => props.theme.spacing[4]} 0;
    flex-direction: column;
    align-items: stretch;
  }
`;

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  transition: transform ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-1px);
  }
`;

const LogoIcon = styled.div`
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

const LogoCopy = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoText = styled.strong`
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.extrabold};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const LogoCaption = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.mutedForeground};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};

  @media (max-width: 768px) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const NavLink = styled(Link)<{ $isActive?: boolean; $live?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[5]};
  border-radius: ${props => props.theme.borderRadius.xl};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
  transition: all ${props => props.theme.transitions.fast};
  border: 1px solid transparent;

  ${props =>
    props.$isActive
      ? `
    color: ${props.theme.colors.primaryForeground};
    background: ${props.$live
      ? `linear-gradient(135deg, ${props.theme.colors.liveRed}, ${props.theme.colors.accent})`
      : `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.accent})`};
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

const Footer = styled.footer`
  margin-top: ${props => props.theme.spacing[20]};
  border-top: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
`;

const FooterContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[6]};
`;

const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FooterBrand = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
`;

const FooterIcon = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
`;

const FooterText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[1]};
`;

const FooterTitle = styled.span`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const FooterCaption = styled.span`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.mutedForeground};
`;

const Copyright = styled.span`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.mutedForeground};
`;

export function Layout() {
  const location = useLocation();

  return (
    <LayoutContainer>
      <Header>
        <HeaderContainer>
          <HeaderContent>
            <LogoLink to="/">
              <LogoIcon>
                <MessageCircle size={22} />
              </LogoIcon>
              <LogoCopy>
                <LogoText>이슈톡</LogoText>
                <LogoCaption>건강한 토론과 커뮤니티를 위한 공간</LogoCaption>
              </LogoCopy>
            </LogoLink>

            <Nav>
              <NavLink to="/" $isActive={location.pathname === '/'}>
                <MessageCircle size={16} />
                메인
              </NavLink>
              <NavLink to="/live" $isActive={location.pathname === '/live'} $live>
                <Radio size={16} />
                실시간 토론
              </NavLink>
              <NavLink
                to="/past-debates"
                $isActive={location.pathname.startsWith('/past-debate') || location.pathname === '/past-debates'}
              >
                <Trophy size={16} />
                지난 토론
              </NavLink>
            </Nav>
          </HeaderContent>
        </HeaderContainer>
      </Header>

      <Outlet />

      <Footer>
        <FooterContainer>
          <FooterContent>
            <FooterBrand>
              <FooterIcon>
                <MessageCircle size={16} />
              </FooterIcon>
              <FooterText>
                <FooterTitle>이슈톡</FooterTitle>
                <FooterCaption>생각이 부딪히고 관점이 넓어지는 토론 플랫폼</FooterCaption>
              </FooterText>
            </FooterBrand>
            <Copyright>© 2026 이슈톡. 더 나은 대화 문화를 만듭니다.</Copyright>
          </FooterContent>
        </FooterContainer>
      </Footer>
    </LayoutContainer>
  );
}
