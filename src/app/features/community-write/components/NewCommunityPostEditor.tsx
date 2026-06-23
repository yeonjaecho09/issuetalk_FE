import type { CommunityCategory } from '../../../data/communityData';
import { EditorToolbarButton } from './EditorToolbarButton';
import {
  ActionRow,
  CancelLink,
  CategoryButton,
  CategoryList,
  EditorShell,
  FieldLabel,
  FormCard,
  HelperText,
  HiddenFileInput,
  SubmitButton,
  TextArea,
  TextInput,
  Toolbar,
  WriteForm,
} from './NewCommunityPostContent.styles';
import type { ToolbarState } from './useCommunityRichTextEditor';

type NewCommunityPostEditorProps = {
  categories: CommunityCategory[];
  selectedCategory: CommunityCategory;
  title: string;
  onSelectCategory: (category: CommunityCategory) => void;
  onChangeTitle: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  editorRef: React.RefObject<HTMLDivElement | null>;
  imageInputRef: React.RefObject<HTMLInputElement | null>;
  toolbarState: ToolbarState;
  runCommand: (command: string, value?: string) => void;
  handleCreateLink: () => void;
  handleEditorKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  handleEditorFocus: () => void;
  handleEditorBeforeInput: () => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  syncBodyFromEditor: () => void;
};

export function NewCommunityPostEditor({
  categories,
  selectedCategory,
  title,
  onSelectCategory,
  onChangeTitle,
  onSubmit,
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
}: NewCommunityPostEditorProps) {
  const toolbarItems = [
    { key: 'bold', label: '굵게', active: toolbarState.bold, onClick: () => runCommand('bold') },
    { key: 'italic', label: '기울임', active: toolbarState.italic, onClick: () => runCommand('italic') },
    { key: 'strike', label: '취소선', active: toolbarState.strikeThrough, onClick: () => runCommand('strikeThrough') },
    { key: 'list', label: '목록', active: toolbarState.insertUnorderedList, onClick: () => runCommand('insertUnorderedList') },
    { key: 'quote', label: '인용', active: toolbarState.blockquote, onClick: () => runCommand('formatBlock', 'blockquote') },
    { key: 'link', label: '링크', active: false, onClick: handleCreateLink },
    { key: 'image', label: '이미지', active: false, onClick: () => imageInputRef.current?.click() },
  ] as const;

  return (
    <FormCard>
      <WriteForm onSubmit={onSubmit}>
        <FieldLabel>
          제목
          <TextInput
            type="text"
            placeholder="게시글 제목을 입력해 주세요."
            value={title}
            onChange={event => onChangeTitle(event.target.value)}
          />
        </FieldLabel>

        <FieldLabel>
          본문
          <EditorShell>
            <Toolbar>
              {toolbarItems.map(item => (
                <EditorToolbarButton
                  key={item.key}
                  active={item.active}
                  onClick={item.onClick}
                  ariaLabel={item.label}
                  title={item.label}
                >
                  {item.label}
                </EditorToolbarButton>
              ))}
            </Toolbar>

            <TextArea
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              data-placeholder="공유하고 싶은 주제와 근거를 구체적으로 적어보세요."
              onFocus={handleEditorFocus}
              onBeforeInput={handleEditorBeforeInput}
              onKeyDown={handleEditorKeyDown}
              onInput={syncBodyFromEditor}
            />
          </EditorShell>

          <HiddenFileInput ref={imageInputRef} type="file" accept="image/*" onChange={handleImageUpload} />
          <HelperText>`Ctrl/Cmd + B` 굵게, `Ctrl/Cmd + I` 기울임, `Ctrl/Cmd + Shift + X` 취소선, `Ctrl/Cmd + K` 링크</HelperText>
        </FieldLabel>

        <div>
          <div>카테고리</div>
          <CategoryList>
            {categories.map(category => (
              <CategoryButton key={category} type="button" $active={selectedCategory === category} onClick={() => onSelectCategory(category)}>
                {category}
              </CategoryButton>
            ))}
          </CategoryList>
        </div>

        <ActionRow>
          <CancelLink to="/community">취소</CancelLink>
          <SubmitButton type="submit">게시글 등록</SubmitButton>
        </ActionRow>
      </WriteForm>
    </FormCard>
  );
}
