import { useEffect, useRef, useState } from 'react';

export type ToolbarState = {
  bold: boolean;
  italic: boolean;
  strikeThrough: boolean;
  insertUnorderedList: boolean;
  blockquote: boolean;
};

const EMPTY_TOOLBAR_STATE: ToolbarState = {
  bold: false,
  italic: false,
  strikeThrough: false,
  insertUnorderedList: false,
  blockquote: false,
};

function normalizeEditorHtml(html: string) {
  const trimmed = html.trim();
  if (trimmed === '<br>' || trimmed === '<div><br></div>' || trimmed === '<p><br></p>') {
    return '';
  }
  return html;
}

export function useCommunityRichTextEditor(body: string, onChangeBody: (value: string) => void) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [toolbarState, setToolbarState] = useState<ToolbarState>(EMPTY_TOOLBAR_STATE);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    if (editor.innerHTML === body) return;
    editor.innerHTML = body;
  }, [body]);

  const refreshToolbarState = () => {
    const editor = editorRef.current;
    const selection = typeof window !== 'undefined' ? window.getSelection() : null;

    if (!editor || !selection || selection.rangeCount === 0) {
      setToolbarState(EMPTY_TOOLBAR_STATE);
      return;
    }

    const anchorNode = selection.anchorNode;
    if (!anchorNode || !editor.contains(anchorNode)) {
      setToolbarState(EMPTY_TOOLBAR_STATE);
      return;
    }

    const parentElement =
      anchorNode.nodeType === Node.ELEMENT_NODE ? (anchorNode as Element) : anchorNode.parentElement;

    setToolbarState({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
      blockquote: Boolean(parentElement?.closest('blockquote')),
    });
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      refreshToolbarState();
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  });

  const syncBodyFromEditor = () => {
    const editor = editorRef.current;
    if (!editor) return;
    onChangeBody(normalizeEditorHtml(editor.innerHTML));
    refreshToolbarState();
  };

  const runCommand = (command: string, value?: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    editor.focus();
    document.execCommand(command, false, value);
    syncBodyFromEditor();
    refreshToolbarState();
  };

  const handleCreateLink = () => {
    const url = window.prompt('링크 주소를 입력해 주세요', 'https://');
    if (!url) return;
    runCommand('createLink', url);
  };

  const handleEditorKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const isModifierPressed = event.ctrlKey || event.metaKey;
    if (!isModifierPressed) return;

    const key = event.key.toLowerCase();

    if (key === 'b') {
      event.preventDefault();
      runCommand('bold');
      return;
    }

    if (key === 'i') {
      event.preventDefault();
      runCommand('italic');
      return;
    }

    if (key === 'k') {
      event.preventDefault();
      handleCreateLink();
      return;
    }

    if (event.shiftKey && key === 'x') {
      event.preventDefault();
      runCommand('strikeThrough');
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      if (!result) return;
      runCommand('insertImage', result);
      event.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  return {
    editorRef,
    imageInputRef,
    toolbarState,
    runCommand,
    handleCreateLink,
    handleEditorKeyDown,
    handleImageUpload,
    syncBodyFromEditor,
  };
}
