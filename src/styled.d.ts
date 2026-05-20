import 'styled-components';
import type { Theme } from './app/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
