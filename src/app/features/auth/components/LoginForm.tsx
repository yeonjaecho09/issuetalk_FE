import { CheckboxLabel, FieldLabel, FormGrid, FormSubmitButton, HelperRow, InlineActionButton, InlineLink, InputRow, TextInput } from './AuthForms.styles';

type LoginFormProps = {
  email: string;
  password: string;
  rememberMe: boolean;
  errorMessage: string | null;
  showPassword: boolean;
  onTogglePassword: () => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onChangeRememberMe: (value: boolean) => void;
  onSubmit: (event: React.FormEvent) => void;
};

export function LoginForm({
  email,
  password,
  rememberMe,
  errorMessage,
  showPassword,
  onTogglePassword,
  onChangeEmail,
  onChangePassword,
  onChangeRememberMe,
  onSubmit,
}: LoginFormProps) {
  return (
    <FormGrid onSubmit={onSubmit}>
      <FieldLabel>
        이메일
        <TextInput type="email" placeholder="you@example.com" value={email} onChange={event => onChangeEmail(event.target.value)} />
      </FieldLabel>
      <FieldLabel>
        비밀번호
        <InputRow>
          <TextInput
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={event => onChangePassword(event.target.value)}
          />
          <InlineActionButton type="button" onClick={onTogglePassword}>
            {showPassword ? '숨기기' : '보기'}
          </InlineActionButton>
        </InputRow>
      </FieldLabel>
      <HelperRow>
        <CheckboxLabel>
          <input type="checkbox" checked={rememberMe} onChange={event => onChangeRememberMe(event.target.checked)} />
          로그인 상태 유지
        </CheckboxLabel>
        <InlineLink to="/forgot-password">비밀번호 찾기</InlineLink>
      </HelperRow>
      {errorMessage ? <p>{errorMessage}</p> : null}
      <FormSubmitButton type="submit">로그인</FormSubmitButton>
    </FormGrid>
  );
}
