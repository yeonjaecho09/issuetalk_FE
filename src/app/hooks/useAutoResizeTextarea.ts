import { useEffect, useRef } from 'react';

export function useAutoResizeTextarea<T extends HTMLTextAreaElement>(value: string) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  }, [value]);

  return ref;
}
