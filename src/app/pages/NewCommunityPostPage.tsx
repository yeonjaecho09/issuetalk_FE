import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import styled from 'styled-components';
import { ArrowLeft, ImagePlus, PenSquare, Send } from 'lucide-react';
import { communityCategories } from '../data/communityData';

const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[6]} ${props => props.theme.spacing[16]};
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[6]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Header = styled.section`
  margin-bottom: ${props => props.theme.spacing[8]};
  padding: ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid rgba(99, 102, 241, 0.18);
  background:
    radial-gradient(circle at top left, rgba(99, 102, 241, 0.12), transparent 30%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(236, 72, 153, 0.08));
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => props.theme.colors.primary};
  background-color: rgba(99, 102, 241, 0.1);
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const Title = styled.h1`
  margin-bottom: ${props => props.theme.spacing[3]};
  font-size: clamp(2rem, 4vw, 3.5rem);
`;

const Description = styled.p`
  max-width: 46rem;
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.lg};
  line-height: 1.8;
`;

const Layout = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.6fr);
  gap: ${props => props.theme.spacing[6]};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Form = styled.form`
  display: grid;
  gap: ${props => props.theme.spacing[5]};
`;

const Card = styled.div`
  padding: ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.card};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const FieldGroup = styled.label`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
`;

const Label = styled.span`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const Input = styled.input`
  width: 100%;
  min-height: 3.5rem;
  padding: 0 ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: ${props => props.theme.colors.inputBackground};
  font-size: ${props => props.theme.fontSizes.base};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 18rem;
  resize: vertical;
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: ${props => props.theme.colors.inputBackground};
  font-size: ${props => props.theme.fontSizes.base};
  line-height: 1.75;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
  }
`;

const CategoryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[3]};
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[5]};
  border: 1px solid ${props => (props.$active ? 'transparent' : props.theme.colors.border)};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => (props.$active ? props.theme.colors.primaryForeground : props.theme.colors.foreground)};
  background: ${props =>
    props.$active
      ? `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.accent})`
      : props.theme.colors.card};
  box-shadow: ${props => (props.$active ? props.theme.shadows.md : 'none')};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

const UploadPlaceholder = styled.button`
  display: grid;
  place-items: center;
  gap: ${props => props.theme.spacing[2]};
  width: 100%;
  min-height: 10rem;
  border: 1px dashed ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  color: ${props => props.theme.colors.mutedForeground};
  background-color: rgba(241, 245, 249, 0.55);
  transition: border-color ${props => props.theme.transitions.fast}, color ${props => props.theme.transitions.fast};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing[3]};

  @media (max-width: 640px) {
    flex-direction: column-reverse;
  }
`;

const SecondaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3.5rem;
  padding: 0 ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.foreground};
  background-color: ${props => props.theme.colors.card};
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  min-height: 3.5rem;
  padding: 0 ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.xl};
  color: ${props => props.theme.colors.primaryForeground};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  box-shadow: ${props => props.theme.shadows.md};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const Sidebar = styled.aside`
  display: grid;
  gap: ${props => props.theme.spacing[5]};
  align-content: start;
`;

const SideTitle = styled.h3`
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const GuideList = styled.ul`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
  padding-left: ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.7;
`;

const PreviewCard = styled.div`
  padding: ${props => props.theme.spacing[5]};
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: rgba(99, 102, 241, 0.06);
`;

const PreviewBadge = styled.span`
  display: inline-block;
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => props.theme.colors.primary};
  background-color: rgba(99, 102, 241, 0.12);
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const PreviewTitle = styled.h4`
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const PreviewText = styled.p`
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.7;
  white-space: pre-wrap;
`;

export function NewCommunityPostPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<(typeof communityCategories)[number]>('정책 제안');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/community');
  };

  return (
    <Container>
      <BackLink to="/community">
        <ArrowLeft size={16} />
        커뮤니티로 돌아가기
      </BackLink>

      <Header>
        <Eyebrow>
          <PenSquare size={16} />
          Write a post
        </Eyebrow>
        <Title>새로운 대화를 커뮤니티에 남겨보세요</Title>
        <Description>
          토론에서 미처 다 하지 못한 이야기, 정책 제안, 자료 공유, 스터디 모집까지 이 공간에서 길게 이어갈 수 있습니다. 읽는 사람이
          바로 맥락을 이해할 수 있게 제목과 핵심 배경을 또렷하게 적어보세요.
        </Description>
      </Header>

      <Layout>
        <Form onSubmit={handleSubmit}>
          <Card>
            <FieldGroup>
              <Label>카테고리</Label>
              <CategoryGrid>
                {communityCategories.filter(item => item !== '전체').map(item => (
                  <CategoryButton key={item} type="button" $active={category === item} onClick={() => setCategory(item)}>
                    {item}
                  </CategoryButton>
                ))}
              </CategoryGrid>
            </FieldGroup>
          </Card>

          <Card>
            <FieldGroup>
              <Label>제목</Label>
              <Input value={title} onChange={event => setTitle(event.target.value)} placeholder="읽는 사람이 바로 이해할 수 있는 제목을 적어주세요" required />
            </FieldGroup>
          </Card>

          <Card>
            <FieldGroup>
              <Label>본문</Label>
              <Textarea
                value={content}
                onChange={event => setContent(event.target.value)}
                placeholder="문제의 배경, 내가 던지고 싶은 질문, 참고 자료나 제안 내용을 함께 적어주세요."
                required
              />
            </FieldGroup>
          </Card>

          <Card>
            <FieldGroup>
              <Label>이미지 첨부</Label>
              <UploadPlaceholder type="button">
                <ImagePlus size={28} />
                이미지를 업로드할 자리입니다
              </UploadPlaceholder>
            </FieldGroup>
          </Card>

          <Actions>
            <SecondaryLink to="/community">취소</SecondaryLink>
            <SubmitButton type="submit">
              게시하기
              <Send size={16} />
            </SubmitButton>
          </Actions>
        </Form>

        <Sidebar>
          <Card>
            <SideTitle>작성 가이드</SideTitle>
            <GuideList>
              <li>한 줄 주장보다 맥락과 근거를 함께 적으면 더 많은 답변을 받을 수 있어요.</li>
              <li>자료를 인용할 때는 출처와 날짜를 함께 남겨주세요.</li>
              <li>모집 글이라면 일정, 방식, 참여 조건을 짧게라도 포함해 주세요.</li>
            </GuideList>
          </Card>

          <Card>
            <SideTitle>미리보기</SideTitle>
            <PreviewCard>
              <PreviewBadge>{category}</PreviewBadge>
              <PreviewTitle>{title || '제목이 여기에 표시됩니다'}</PreviewTitle>
              <PreviewText>{content || '본문을 입력하면 여기에서 글의 톤과 길이를 미리 확인할 수 있어요.'}</PreviewText>
            </PreviewCard>
          </Card>
        </Sidebar>
      </Layout>
    </Container>
  );
}
