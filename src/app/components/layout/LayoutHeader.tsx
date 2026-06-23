import { LogIn, LogOut, MessageCircle, Radio, ShieldCheck, Trophy, UserPlus, UserRound } from 'lucide-react';
import { useLocation } from 'react-router';
import { useAuth } from '../../features/auth/useAuth';
import {
  ActionButton,
  ActionLink,
  Header,
  HeaderActions,
  HeaderContainer,
  HeaderContent,
  LogoCaption,
  LogoCopy,
  LogoIcon,
  LogoLink,
  LogoText,
  Nav,
  NavLink,
  UserGreeting,
} from './Layout.styles';

const navItems = [
  { to: '/', label: '메인', icon: MessageCircle, isActive: (pathname: string) => pathname === '/' },
  { to: '/community', label: '커뮤니티', icon: MessageCircle, isActive: (pathname: string) => pathname.startsWith('/community') },
  { to: '/live', label: '실시간 토론', icon: Radio, isActive: (pathname: string) => pathname.startsWith('/live') },
  {
    to: '/past-debates',
    label: '지난 토론',
    icon: Trophy,
    isActive: (pathname: string) => pathname.startsWith('/past-debate') || pathname === '/past-debates',
  },
];

export function LayoutHeader() {
  const location = useLocation();
  const { currentUser, isLoggedIn, isAdmin, logout } = useAuth();

  return (
    <Header>
      <HeaderContainer>
        <HeaderContent>
          <LogoLink to="/">
            <LogoIcon>
              <MessageCircle size={20} />
            </LogoIcon>
            <LogoCopy>
              <LogoText>이슈톡</LogoText>
              <LogoCaption>건강한 토론과 커뮤니티를 위한 공간</LogoCaption>
            </LogoCopy>
          </LogoLink>

          <Nav>
            {navItems.map(item => {
              const Icon = item.icon;

              return (
                <NavLink key={item.to} to={item.to} $isActive={item.isActive(location.pathname)}>
                  <Icon size={16} />
                  {item.label}
                </NavLink>
              );
            })}
          </Nav>

          <HeaderActions>
            {isLoggedIn && currentUser ? <UserGreeting>{currentUser.nickname}님</UserGreeting> : null}

            {isAdmin ? (
              <ActionLink to="/admin">
                <ShieldCheck size={16} />
                관리자
              </ActionLink>
            ) : null}

            <ActionLink to="/mypage">
              <UserRound size={16} />
              마이페이지
            </ActionLink>

            {isLoggedIn ? (
              <ActionButton type="button" onClick={logout}>
                <LogOut size={16} />
                로그아웃
              </ActionButton>
            ) : (
              <>
                <ActionLink to="/login">
                  <LogIn size={16} />
                  로그인
                </ActionLink>
                <ActionLink to="/signup">
                  <UserPlus size={16} />
                  회원가입
                </ActionLink>
              </>
            )}
          </HeaderActions>
        </HeaderContent>
      </HeaderContainer>
    </Header>
  );
}
