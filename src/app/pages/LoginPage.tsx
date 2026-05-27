import { useState } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { AuthShell } from '../components/AuthShell';

const Form = styled.form`
  display: grid;
  gap: ${props => props.theme.spacing[5]};
  position: relative;
  z-index: 1;
`;

const FieldGroup = styled.label`
  display: grid;
  gap: ${props => props.theme.spacing[2]};
`;

const FieldLabel = styled.span`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  min-height: 3.75rem;
  padding: 0 ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: rgba(248, 250, 252, 0.9);
  transition: border-color ${props => props.theme.transitions.fast}, box-shadow ${props => props.theme.transitions.fast};

  &:focus-within {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
  }
`;

const Input = styled.input`
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: ${props => props.theme.colors.foreground};
  font-size: ${props => props.theme.fontSizes.base};
`;

const IconWrap = styled.div`
  color: ${props => props.theme.colors.mutedForeground};
`;

const ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.colors.mutedForeground};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const OptionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};
  font-size: ${props => props.theme.fontSizes.sm};

  @media (max-width: 560px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.mutedForeground};
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  accent-color: ${props => props.theme.colors.primary};
`;

const InlineLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.bold};

  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  min-height: 3.75rem;
  border-radius: ${props => props.theme.borderRadius.xl};
  color: ${props => props.theme.colors.primaryForeground};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  box-shadow: ${props => props.theme.shadows.md};
  transition: transform ${props => props.theme.transitions.fast}, box-shadow ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const HelperText = styled.p`
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
  line-height: 1.7;
`;

const Divider = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};

  &::before,
  &::after {
    content: '';
    height: 1px;
    background-color: ${props => props.theme.colors.border};
  }
`;

const SocialRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${props => props.theme.spacing[3]};

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const SocialButton = styled.button`
  min-height: 3.25rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: white;
  transition: border-color ${props => props.theme.transitions.fast}, transform ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-1px);
    border-color: ${props => props.theme.colors.primary};
  }
`;

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="다시 돌아온 대화를 이어가보세요"
      description="이메일로 로그인하고 실시간 토론 참여, 게시글 반응 확인, 지난 대화 아카이브를 한 곳에서 이어보세요."
      footerPrompt="아직 계정이 없나요?"
      footerLinkLabel="회원가입"
      footerLinkTo="/signup"
      sideTitle="빠르게 로그인하고 바로 참여하세요"
      sideDescription="IssueTalk는 사회 이슈에 대한 의견 교환이 끊기지 않도록, 익숙하고 빠른 진입 경험을 중심으로 설계된 토론 플랫폼입니다."
      highlights={[
        '실시간 토론 알림과 참여 내역을 내 계정에서 바로 확인할 수 있어요.',
        '관심 주제를 저장해두고 새로운 논쟁이 열리면 빠르게 이어서 참여할 수 있어요.',
        '활동 기록과 좋아요, 댓글 흐름을 하나의 대시보드처럼 관리할 수 있어요.',
      ]}
    >
      <Form onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldLabel>이메일</FieldLabel>
          <InputWrap>
            <IconWrap>
              <Mail size={18} />
            </IconWrap>
            <Input type="email" placeholder="name@example.com" autoComplete="email" required />
          </InputWrap>
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>비밀번호</FieldLabel>
          <InputWrap>
            <IconWrap>
              <LockKeyhole size={18} />
            </IconWrap>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력하세요"
              autoComplete="current-password"
              required
            />
            <ToggleButton type="button" onClick={() => setShowPassword(prev => !prev)} aria-label="비밀번호 표시 전환">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </ToggleButton>
          </InputWrap>
        </FieldGroup>

        <OptionsRow>
          <CheckboxLabel>
            <Checkbox type="checkbox" />
            로그인 상태 유지
          </CheckboxLabel>
          <InlineLink to="/forgot-password">비밀번호를 잊으셨나요?</InlineLink>
        </OptionsRow>

        <SubmitButton type="submit">
          로그인
          <ArrowRight size={18} />
        </SubmitButton>

        <HelperText>
          이 화면은 퍼블리싱된 UI입니다. 이후 API 연결 시 유효성 검사, 소셜 로그인, 비밀번호 재설정 플로우를 쉽게 붙일 수 있게
          구성해두었습니다.
        </HelperText>

        <Divider>또는</Divider>

        <SocialRow>
          <SocialButton type="button">Google로 계속하기</SocialButton>
          <SocialButton type="button">Kakao로 계속하기</SocialButton>
        </SocialRow>
      </Form>
    </AuthShell>
  );
}
