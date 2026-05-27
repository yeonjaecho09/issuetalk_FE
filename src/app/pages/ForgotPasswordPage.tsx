import { Link } from 'react-router';
import styled from 'styled-components';
import { ArrowRight, KeyRound, Mail, ShieldAlert } from 'lucide-react';
import { AuthShell } from '../components/AuthShell';

const Form = styled.form`
  display: grid;
  gap: ${props => props.theme.spacing[5]};
  position: relative;
  z-index: 1;
`;

const Notice = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing[3]};
  padding: ${props => props.theme.spacing[4]};
  border: 1px solid rgba(99, 102, 241, 0.18);
  border-radius: ${props => props.theme.borderRadius.xl};
  background-color: rgba(99, 102, 241, 0.06);
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.7;
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

export function ForgotPasswordPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <AuthShell
      eyebrow="Reset password"
      title="비밀번호를 재설정할 수 있도록 도와드릴게요"
      description="가입할 때 사용한 이메일 주소를 입력하면 비밀번호 재설정 링크를 받을 수 있는 화면입니다. 실제 메일 발송 API는 이후 단계에서 연결하면 됩니다."
      footerPrompt="로그인 화면으로 돌아가시겠어요?"
      footerLinkLabel="로그인"
      footerLinkTo="/login"
      sideTitle="안전하게 계정을 다시 확인하는 단계"
      sideDescription="비밀번호 찾기 화면은 불필요한 불안을 줄이고 다음 행동을 분명하게 안내하는 것이 중요해서, 안내 문구와 보안 주의를 함께 보여주는 구성을 택했습니다."
      highlights={[
        '가입 이메일만 기억하면 재설정 흐름으로 자연스럽게 이어질 수 있어요.',
        '보안상 계정 존재 여부를 직접 노출하지 않는 패턴으로 확장하기 쉬운 UI예요.',
        '추후 인증 코드, 메일 전송 완료 상태, 재시도 타이머도 같은 구조에 붙이기 좋습니다.',
      ]}
    >
      <Form onSubmit={handleSubmit}>
        <Notice>
          <ShieldAlert size={18} />
          본인 계정 확인을 위해 재설정 링크는 등록된 이메일로만 발송됩니다. 공용 PC에서는 메일 확인 후 반드시 다시 로그아웃해 주세요.
        </Notice>

        <FieldGroup>
          <FieldLabel>이메일</FieldLabel>
          <InputWrap>
            <IconWrap>
              <Mail size={18} />
            </IconWrap>
            <Input type="email" placeholder="name@example.com" autoComplete="email" required />
          </InputWrap>
        </FieldGroup>

        <SubmitButton type="submit">
          재설정 링크 보내기
          <ArrowRight size={18} />
        </SubmitButton>

        <HelperText>
          퍼블리싱 단계에서는 입력과 안내 중심으로 구성했습니다. 이후 연결 시 성공 상태 화면, 이메일 재전송, 만료 토큰 안내를 이 흐름에
          이어서 붙일 수 있습니다. 계정이 기억나면 <InlineLink to="/login">로그인으로 돌아가기</InlineLink>를 바로 사용할 수 있어요.
        </HelperText>

        <Notice>
          <KeyRound size={18} />
          비밀번호 재설정 메일을 받지 못했다면 스팸함을 먼저 확인하고, 입력한 이메일이 가입한 주소와 같은지 다시 확인해 주세요.
        </Notice>
      </Form>
    </AuthShell>
  );
}
