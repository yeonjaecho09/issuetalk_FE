import { CommunityRichText } from '../../community/components/CommunityRichText';
import { GuideList, PreviewBody, PreviewCard, PreviewTitle, SideCard } from './NewCommunityPostContent.styles';

type NewCommunityPostSidebarProps = {
  title: string;
  body: string;
};

export function NewCommunityPostSidebar({ title, body }: NewCommunityPostSidebarProps) {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <PreviewCard>
        <div>미리보기</div>
        <PreviewTitle>{title.trim() || '제목 미리보기'}</PreviewTitle>
        <PreviewBody>
          {body.trim() ? <CommunityRichText content={body} /> : <p>본문을 입력하면 오른쪽에서 실제 표시 형태를 바로 확인할 수 있습니다.</p>}
        </PreviewBody>
      </PreviewCard>

      <SideCard>
        <strong>작성 가이드</strong>
        <GuideList>
          <li>이제 에디터를 누르면 마크다운 기호가 아니라 실제 서식이 바로 적용됩니다.</li>
          <li>이미지를 업로드하면 즉시 본문 안에 보이고 상세 페이지에서도 같은 형태로 렌더링됩니다.</li>
          <li>링크는 주소 입력 후 선택한 텍스트에 바로 연결됩니다.</li>
          <li>키보드로도 빠르게 입력할 수 있도록 자주 쓰는 단축키를 함께 지원합니다.</li>
        </GuideList>
      </SideCard>
    </div>
  );
}
