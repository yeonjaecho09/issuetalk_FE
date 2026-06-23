import { PageContainer } from '../../../components/ui/primitives';
import type { CommunityCategory } from '../../../data/communityData';
import { BackLink, WriteGrid, WriteHero, WriteHeroDescription, WriteHeroTitle } from './NewCommunityPostContent.styles';
import { NewCommunityPostEditor } from './NewCommunityPostEditor';
import { NewCommunityPostSidebar } from './NewCommunityPostSidebar';
import { useCommunityRichTextEditor } from './useCommunityRichTextEditor';

type NewCommunityPostContentProps = {
  categories: CommunityCategory[];
  selectedCategory: CommunityCategory;
  title: string;
  body: string;
  onSelectCategory: (category: CommunityCategory) => void;
  onChangeTitle: (value: string) => void;
  onChangeBody: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
};

export function NewCommunityPostContent({
  categories,
  selectedCategory,
  title,
  body,
  onSelectCategory,
  onChangeTitle,
  onChangeBody,
  onSubmit,
}: NewCommunityPostContentProps) {
  const editor = useCommunityRichTextEditor(body, onChangeBody);

  return (
    <PageContainer>
      <BackLink to="/community">커뮤니티로 돌아가기</BackLink>
      <WriteHero>
        <div>커뮤니티 작성</div>
        <WriteHeroTitle>커뮤니티 글 작성</WriteHeroTitle>
        <WriteHeroDescription>
          굵게, 기울임, 인용, 링크, 이미지까지 실제 보이는 형태 그대로 입력되도록 에디터를 바꿨습니다.
        </WriteHeroDescription>
      </WriteHero>

      <WriteGrid>
        <NewCommunityPostEditor
          categories={categories}
          selectedCategory={selectedCategory}
          title={title}
          onSelectCategory={onSelectCategory}
          onChangeTitle={onChangeTitle}
          onSubmit={onSubmit}
          editorRef={editor.editorRef}
          imageInputRef={editor.imageInputRef}
          toolbarState={editor.toolbarState}
          runCommand={editor.runCommand}
          handleCreateLink={editor.handleCreateLink}
          handleEditorKeyDown={editor.handleEditorKeyDown}
          handleEditorFocus={editor.handleEditorFocus}
          handleEditorBeforeInput={editor.handleEditorBeforeInput}
          handleImageUpload={editor.handleImageUpload}
          syncBodyFromEditor={editor.syncBodyFromEditor}
        />

        <NewCommunityPostSidebar title={title} body={body} />
      </WriteGrid>
    </PageContainer>
  );
}
