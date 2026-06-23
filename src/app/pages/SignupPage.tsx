import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthShell } from '../components/AuthShell';
import { useAuth } from '../features/auth/useAuth';
import { SignupForm } from '../features/auth/components/SignupForm';

export function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSendCode = () => {
    if (!email.trim()) {
      setErrorMessage('인증 코드를 보내려면 이메일을 먼저 입력해 주세요.');
      return;
    }

    setIsCodeSent(true);
    setErrorMessage(null);
  };

  const handleVerify = () => {
    if (!verificationCode.trim()) {
      setErrorMessage('인증 코드를 입력해 주세요.');
      return;
    }

    setIsVerified(true);
    setErrorMessage(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !nickname.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('필수 정보를 모두 입력해 주세요.');
      return;
    }

    if (!isVerified) {
      setErrorMessage('이메일 인증을 완료해 주세요.');
      return;
    }

    if (!agreeToTerms) {
      setErrorMessage('약관 동의가 필요합니다.');
      return;
    }

    try {
      signup({ name, nickname, email, password });
      setErrorMessage(null);
      navigate('/');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '회원가입 중 문제가 발생했습니다.');
    }
  };

  return (
    <AuthShell
      eyebrow="회원가입"
      title="이슈톡 회원가입"
      description="이메일 인증을 마치고 커뮤니티와 오늘의 토론에 참여할 계정을 만들어 보세요."
      footerPrompt="이미 계정이 있나요?"
      footerLinkLabel="로그인"
      footerLinkTo="/login"
      secondaryFooterPrompt="운영진 계정을 만들어야 하나요?"
      secondaryFooterLinkLabel="관리자 회원가입"
      secondaryFooterLinkTo="/admin/signup"
      sideTitle="참여를 이어갈 개인 계정"
      sideDescription="회원가입을 마치면 토론 예약, 글 작성, 프로필 관리까지 하나의 계정으로 자연스럽게 이어집니다."
      highlights={['이메일 인증 상태 확인', '커뮤니티 활동과 계정 설정 연동', '토론 참여 이력 관리']}
    >
      <SignupForm
        name={name}
        nickname={nickname}
        email={email}
        verificationCode={verificationCode}
        password={password}
        agreeToTerms={agreeToTerms}
        errorMessage={errorMessage}
        showPassword={showPassword}
        isCodeSent={isCodeSent}
        isVerified={isVerified}
        onTogglePassword={() => setShowPassword(value => !value)}
        onSendCode={handleSendCode}
        onVerify={handleVerify}
        onChangeName={setName}
        onChangeNickname={setNickname}
        onChangeEmail={setEmail}
        onChangeVerificationCode={setVerificationCode}
        onChangePassword={setPassword}
        onChangeAgreeToTerms={setAgreeToTerms}
        onSubmit={handleSubmit}
      />
    </AuthShell>
  );
}
