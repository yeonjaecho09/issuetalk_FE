import { Outlet } from 'react-router';
import { LayoutHeader } from './layout/LayoutHeader';
import { LayoutContainer } from './layout/Layout.styles';

export function Layout() {
  return (
    <LayoutContainer>
      <LayoutHeader />
      <Outlet />
    </LayoutContainer>
  );
}
