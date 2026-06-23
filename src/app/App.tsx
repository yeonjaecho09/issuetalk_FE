import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './features/auth/AuthProvider';
import { router } from './routes';
import { theme } from './theme';
import { GlobalStyles } from './GlobalStyles';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyles />
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}
