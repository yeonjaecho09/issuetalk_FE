import type { MouseEventHandler, ReactNode } from 'react';
import { ToolbarButton } from './NewCommunityPostContent.styles';

type EditorToolbarButtonProps = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
  ariaLabel?: string;
  title?: string;
};

export function EditorToolbarButton({ children, onClick, active = false, ariaLabel, title }: EditorToolbarButtonProps) {
  return (
    <ToolbarButton type="button" onClick={onClick} aria-label={ariaLabel} title={title} $active={active} aria-pressed={active}>
      {children}
    </ToolbarButton>
  );
}
