import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthShell } from '../components/AuthShell';
import { useAuth } from '../features/auth/useAuth';
import { NoticeCard } from '../features/auth/components/AuthForms.styles';
import { AdminSignupForm } from '../features/auth/components/AdminSignupForm';

export function AdminSignupPage() {
  const navigate = useNavigate();
  const { signupAdmin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !nickname.trim() || !email.trim() || !password.trim() || !adminCode.trim() || !verificationToken.trim()) {
      setErrorMessage('모든 항목을 입력해 주세요.');
      return;
    }

    try {
      signupAdmin({
        name,
        nickname,
        email,
        password,
        adminCode,
        verificationToken,
      });
      setErrorMessage(null);
      navigate('/admin', { replace: true });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '관리자 계정 생성 중 문제가 발생했습니다.');
    }
  };

  return (
    <AuthShell
      eyebrow="관리자 회원가입"
      title="관리자 전용 회원가입"
      description="운영진 계정은 접근 코드와 인증 토큰을 함께 입력해야 생성할 수 있습니다."
      footerPrompt="일반 사용자 계정이 필요하신가요?"
      footerLinkLabel="일반 회원가입"
      footerLinkTo="/signup"
      sideTitle="운영 권한이 필요한 계정 생성"
      sideDescription="신고 처리, 게시물 운영, 토론방 제어를 담당하는 관리자 계정 전용 가입 화면입니다."
      highlights={['관리자 접근 코드 확인', '인증 토큰 기반 가입 검증', '운영 콘솔 접근 전용 계정']}
    >
      <NoticeCard>
        <strong>관리자 가입 정보</strong>
        <p>접근 코드: <code>ISSUETALK-ADMIN</code></p>
        <p>인증 토큰: <code>ADMIN-ACCESS-2026</code></p>
      </NoticeCard>
      <AdminSignupForm
        name={name}
        nickname={nickname}
        email={email}
        password={password}
        adminCode={adminCode}
        verificationToken={verificationToken}
        errorMessage={errorMessage}
        showPassword={showPassword}
        showToken={showToken}
        onTogglePassword={() => setShowPassword(value => !value)}
        onToggleToken={() => setShowToken(value => !value)}
        onChangeName={setName}
        onChangeNickname={setNickname}
        onChangeEmail={setEmail}
        onChangePassword={setPassword}
        onChangeAdminCode={setAdminCode}
        onChangeVerificationToken={setVerificationToken}
        onSubmit={handleSubmit}
      />
    </AuthShell>
  );
}
