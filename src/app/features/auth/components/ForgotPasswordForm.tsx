import { FieldLabel, FormGrid, FormSubmitButton, InlineLink, NoticeCard, TextInput } from './AuthForms.styles';

export function ForgotPasswordForm() {
  return (
    <FormGrid>
      <NoticeCard>등록된 이메일로 비밀번호 재설정 링크를 보내드립니다.</NoticeCard>
      <FieldLabel>
        이메일
        <TextInput type="email" placeholder="you@example.com" />
      </FieldLabel>
      <FormSubmitButton type="submit">재설정 링크 보내기</FormSubmitButton>
      <InlineLink to="/login">로그인으로 돌아가기</InlineLink>
    </FormGrid>
  );
}
