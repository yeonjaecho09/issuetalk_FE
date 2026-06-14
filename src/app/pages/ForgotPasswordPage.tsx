import { AuthShell } from '../components/AuthShell';
import { ForgotPasswordForm } from '../features/auth/components/ForgotPasswordForm';

export function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="비밀번호 재설정"
      title="비밀번호 재설정"
      description="가입한 이메일 주소를 입력하면 비밀번호 재설정 안내를 이어서 받을 수 있습니다."
      footerPrompt="로그인 화면으로 돌아가시겠어요?"
      footerLinkLabel="로그인"
      footerLinkTo="/login"
      sideTitle="계정 보안을 안전하게 복구"
      sideDescription="재설정 안내가 끝나면 새 비밀번호로 다시 로그인해 토론과 커뮤니티 활동을 이어갈 수 있습니다."
      highlights={['이메일 본인 확인 안내', '보안 강화를 위한 재설정 절차', '로그인 복구 경로 제공']}
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
