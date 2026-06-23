import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AuthShell } from '../components/AuthShell';
import { useAuth } from '../features/auth/useAuth';
import { LoginForm } from '../features/auth/components/LoginForm';

type LoginLocationState = {
  from?: string;
  message?: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const locationState = (location.state as LoginLocationState | null) ?? null;
  const [errorMessage, setErrorMessage] = useState<string | null>(locationState?.message ?? null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErrorMessage('이메일과 비밀번호를 입력해 주세요.');
      return;
    }

    try {
      const session = login({ email, password });
      const requestedPath = locationState?.from || '/';
      const requestedAdminPage = requestedPath.startsWith('/admin');

      if (requestedAdminPage && session.role !== 'admin') {
        setErrorMessage('관리자 페이지는 관리자 계정으로만 접근할 수 있습니다.');
        navigate('/', { replace: true });
        return;
      }

      setErrorMessage(null);
      navigate(requestedPath, { replace: true });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '로그인 중 문제가 발생했습니다.');
    }
  };

  return (
    <AuthShell
      eyebrow="로그인"
      title="이슈톡에 로그인"
      description="토론 예약, 커뮤니티 참여, 마이페이지 이용을 위해 로그인해 주세요."
      footerPrompt="계정이 아직 없나요?"
      footerLinkLabel="회원가입"
      footerLinkTo="/signup"
      sideTitle="오늘의 이슈를 더 가까이 만나는 시작"
      sideDescription="로그인하면 오늘의 토론에 참여하고, 커뮤니티 글과 댓글 활동을 내 흐름 안에서 이어갈 수 있습니다."
      highlights={['토론 예약과 참여 이력 확인', '내 커뮤니티 활동 관리', '공지와 운영 알림 빠르게 확인']}
    >
      <LoginForm
        email={email}
        password={password}
        rememberMe={rememberMe}
        errorMessage={errorMessage}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(value => !value)}
        onChangeEmail={setEmail}
        onChangePassword={setPassword}
        onChangeRememberMe={setRememberMe}
        onSubmit={handleSubmit}
      />
    </AuthShell>
  );
}
