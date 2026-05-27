import { useState } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { AuthShell } from '../components/AuthShell';

const Form = styled.form`
  display: grid;
  gap: ${props => props.theme.spacing[5]};
  position: relative;
  z-index: 1;
`;

const NameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${props => props.theme.spacing[4]};

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
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

const CheckGrid = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
`;

const CheckLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing[3]};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: ${props => props.theme.fontSizes.sm};
  line-height: 1.6;
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  margin-top: 0.15rem;
  accent-color: ${props => props.theme.colors.primary};
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

const InlineLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.bold};

  &:hover {
    text-decoration: underline;
  }
`;

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <AuthShell
      eyebrow="Create account"
      title="의견이 모이는 공간에 새 계정을 만들어보세요"
      description="몇 가지 기본 정보만 입력하면 이슈를 팔로우하고, 토론에 참여하고, 내 관점을 기록하는 개인 공간이 바로 열립니다."
      footerPrompt="이미 계정이 있나요?"
      footerLinkLabel="로그인"
      footerLinkTo="/login"
      sideTitle="참여할수록 더 선명해지는 개인 토론 공간"
      sideDescription="회원가입 후에는 내가 반응한 주제, 저장한 아카이브, 팔로우한 토론 흐름을 묶어서 볼 수 있도록 확장 가능한 구조를 염두에 둔 UI로 구성했습니다."
      highlights={[
        '관심 분야를 기준으로 추천 토론과 아카이브를 받아볼 수 있어요.',
        '프로필 기반으로 내 활동 내역과 관점 변화를 한눈에 정리할 수 있어요.',
        '서비스 확장 시 닉네임, 알림 설정, 소셜 연동 같은 항목을 자연스럽게 붙일 수 있어요.',
      ]}
    >
      <Form onSubmit={handleSubmit}>
        <NameGrid>
          <FieldGroup>
            <FieldLabel>이름</FieldLabel>
            <InputWrap>
              <IconWrap>
                <UserRound size={18} />
              </IconWrap>
              <Input type="text" placeholder="홍길동" autoComplete="name" required />
            </InputWrap>
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>닉네임</FieldLabel>
            <InputWrap>
              <IconWrap>
                <UserRound size={18} />
              </IconWrap>
              <Input type="text" placeholder="issuetalker" autoComplete="nickname" required />
            </InputWrap>
          </FieldGroup>
        </NameGrid>

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
              placeholder="8자 이상 비밀번호"
              autoComplete="new-password"
              required
            />
            <ToggleButton type="button" onClick={() => setShowPassword(prev => !prev)} aria-label="비밀번호 표시 전환">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </ToggleButton>
          </InputWrap>
        </FieldGroup>

        <CheckGrid>
          <CheckLabel>
            <Checkbox type="checkbox" required />
            서비스 이용약관 및 개인정보 처리방침에 동의합니다.
          </CheckLabel>
          <CheckLabel>
            <Checkbox type="checkbox" />
            새로운 토론, 아카이브, 주요 업데이트 소식을 이메일로 받아보겠습니다.
          </CheckLabel>
        </CheckGrid>

        <SubmitButton type="submit">
          회원가입
          <ArrowRight size={18} />
        </SubmitButton>

        <HelperText>
          퍼블리싱 단계에서는 기본 입력 흐름과 정보 구조를 먼저 잡아두었습니다. 이후 서버 연동 시 이메일 중복 확인, 비밀번호 규칙,
          약관 상세 링크는 <InlineLink to="/login">기존 인증 흐름</InlineLink>과 함께 바로 확장할 수 있습니다.
        </HelperText>
      </Form>
    </AuthShell>
  );
}
