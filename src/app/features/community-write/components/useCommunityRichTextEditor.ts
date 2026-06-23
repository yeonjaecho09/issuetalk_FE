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

function isEditorEffectivelyEmpty(editor: HTMLDivElement) {
  const text = editor.textContent?.replace(/\u200B/g, '').trim() ?? '';
  const normalizedHtml = normalizeEditorHtml(editor.innerHTML)
    .replace(/&nbsp;/g, '')
    .replace(/\s+/g, '')
    .trim();

  return text.length === 0 && (normalizedHtml === '' || normalizedHtml === '<div><br></div>' || normalizedHtml === '<br>');
}

function placeCaretAtStart(editor: HTMLDivElement) {
  if (typeof window === 'undefined') return;

  const selection = window.getSelection();
  if (!selection) return;

  const range = document.createRange();
  range.selectNodeContents(editor);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

function resetTypingFormat(editor: HTMLDivElement) {
  editor.innerHTML = '';
  placeCaretAtStart(editor);
  document.execCommand('styleWithCSS', false, 'false');

  if (document.queryCommandState('bold')) {
    document.execCommand('bold', false);
  }

  if (document.queryCommandState('italic')) {
    document.execCommand('italic', false);
  }

  if (document.queryCommandState('strikeThrough')) {
    document.execCommand('strikeThrough', false);
  }

  if (document.queryCommandState('insertUnorderedList')) {
    document.execCommand('insertUnorderedList', false);
  }

  document.execCommand('removeFormat', false);
  document.execCommand('formatBlock', false, 'div');
  placeCaretAtStart(editor);
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

  const syncBodyFromEditor = () => {
    const editor = editorRef.current;
    if (!editor) return;
    onChangeBody(normalizeEditorHtml(editor.innerHTML));
    if (isEditorEffectivelyEmpty(editor)) {
      setToolbarState(EMPTY_TOOLBAR_STATE);
    }
  };

  const updateToolbarStateForCommand = (command: string) => {
    setToolbarState(current => {
      if (command === 'bold') {
        return { ...current, bold: !current.bold };
      }

      if (command === 'italic') {
        return { ...current, italic: !current.italic };
      }

      if (command === 'strikeThrough') {
        return { ...current, strikeThrough: !current.strikeThrough };
      }

      if (command === 'insertUnorderedList') {
        return { ...current, insertUnorderedList: !current.insertUnorderedList };
      }

      if (command === 'formatBlock') {
        return { ...current, blockquote: !current.blockquote };
      }

      return current;
    });
  };

  const runCommand = (command: string, value?: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    editor.focus();
    document.execCommand(command, false, value);
    syncBodyFromEditor();
    updateToolbarStateForCommand(command);
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

  const handleEditorFocus = () => {
    const editor = editorRef.current;
    if (!editor || !isEditorEffectivelyEmpty(editor)) {
      return;
    }

    resetTypingFormat(editor);
    setToolbarState(EMPTY_TOOLBAR_STATE);
  };

  const handleEditorBeforeInput = () => {
    const editor = editorRef.current;
    if (!editor || !isEditorEffectivelyEmpty(editor)) return;
    resetTypingFormat(editor);
    setToolbarState(EMPTY_TOOLBAR_STATE);
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
    handleEditorFocus,
    handleEditorBeforeInput,
    handleImageUpload,
    syncBodyFromEditor,
  };
}
