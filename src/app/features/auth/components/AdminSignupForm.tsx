import { FieldLabel, FormGrid, FormSubmitButton, InlineActionButton, InputRow, TextInput } from './AuthForms.styles';

type AdminSignupFormProps = {
  name: string;
  nickname: string;
  email: string;
  password: string;
  adminCode: string;
  verificationToken: string;
  errorMessage: string | null;
  showPassword: boolean;
  showToken: boolean;
  onTogglePassword: () => void;
  onToggleToken: () => void;
  onChangeName: (value: string) => void;
  onChangeNickname: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onChangeAdminCode: (value: string) => void;
  onChangeVerificationToken: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
};

export function AdminSignupForm({
  name,
  nickname,
  email,
  password,
  adminCode,
  verificationToken,
  errorMessage,
  showPassword,
  showToken,
  onTogglePassword,
  onToggleToken,
  onChangeName,
  onChangeNickname,
  onChangeEmail,
  onChangePassword,
  onChangeAdminCode,
  onChangeVerificationToken,
  onSubmit,
}: AdminSignupFormProps) {
  return (
    <FormGrid onSubmit={onSubmit}>
      <FieldLabel>
        이름
        <TextInput type="text" placeholder="운영자 이름" value={name} onChange={event => onChangeName(event.target.value)} />
      </FieldLabel>
      <FieldLabel>
        닉네임
        <TextInput type="text" placeholder="운영자 닉네임" value={nickname} onChange={event => onChangeNickname(event.target.value)} />
      </FieldLabel>
      <FieldLabel>
        관리자 이메일
        <TextInput type="email" placeholder="admin@issuetalk.com" value={email} onChange={event => onChangeEmail(event.target.value)} />
      </FieldLabel>
      <FieldLabel>
        비밀번호
        <InputRow>
          <TextInput
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={event => onChangePassword(event.target.value)}
          />
          <InlineActionButton type="button" onClick={onTogglePassword}>
            {showPassword ? '숨기기' : '보기'}
          </InlineActionButton>
        </InputRow>
      </FieldLabel>
      <FieldLabel>
        관리자 접근 코드
        <TextInput type="text" placeholder="ISSUETALK-ADMIN" value={adminCode} onChange={event => onChangeAdminCode(event.target.value)} />
      </FieldLabel>
      <FieldLabel>
        인증 토큰
        <InputRow>
          <TextInput
            type={showToken ? 'text' : 'password'}
            placeholder="인증 토큰"
            value={verificationToken}
            onChange={event => onChangeVerificationToken(event.target.value)}
          />
          <InlineActionButton type="button" onClick={onToggleToken}>
            {showToken ? '숨기기' : '보기'}
          </InlineActionButton>
        </InputRow>
      </FieldLabel>
      {errorMessage ? <p>{errorMessage}</p> : null}
      <FormSubmitButton type="submit">관리자 계정 생성</FormSubmitButton>
    </FormGrid>
  );
}
