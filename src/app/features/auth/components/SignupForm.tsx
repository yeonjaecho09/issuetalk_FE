import {
  CheckboxLabel,
  FieldLabel,
  FormGrid,
  FormSubmitButton,
  InlineActionButton,
  InputRow,
  NoticeCard,
  TextInput,
  TwoColumnGrid,
  VerificationCard,
  VerificationHeader,
  VerificationText,
} from './AuthForms.styles';

type SignupFormProps = {
  name: string;
  nickname: string;
  email: string;
  verificationCode: string;
  password: string;
  agreeToTerms: boolean;
  errorMessage: string | null;
  showPassword: boolean;
  isCodeSent: boolean;
  isVerified: boolean;
  onTogglePassword: () => void;
  onSendCode: () => void;
  onVerify: () => void;
  onChangeName: (value: string) => void;
  onChangeNickname: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangeVerificationCode: (value: string) => void;
  onChangePassword: (value: string) => void;
  onChangeAgreeToTerms: (value: boolean) => void;
  onSubmit: (event: React.FormEvent) => void;
};

export function SignupForm({
  name,
  nickname,
  email,
  verificationCode,
  password,
  agreeToTerms,
  errorMessage,
  showPassword,
  isCodeSent,
  isVerified,
  onTogglePassword,
  onSendCode,
  onVerify,
  onChangeName,
  onChangeNickname,
  onChangeEmail,
  onChangeVerificationCode,
  onChangePassword,
  onChangeAgreeToTerms,
  onSubmit,
}: SignupFormProps) {
  return (
    <FormGrid onSubmit={onSubmit}>
      <TwoColumnGrid>
        <FieldLabel>
          이름
          <TextInput type="text" placeholder="이름" value={name} onChange={event => onChangeName(event.target.value)} />
        </FieldLabel>
        <FieldLabel>
          닉네임
          <TextInput type="text" placeholder="닉네임" value={nickname} onChange={event => onChangeNickname(event.target.value)} />
        </FieldLabel>
      </TwoColumnGrid>

      <FieldLabel>
        이메일
        <TextInput type="email" placeholder="you@example.com" value={email} onChange={event => onChangeEmail(event.target.value)} />
      </FieldLabel>

      <VerificationCard>
        <VerificationHeader>
          <strong>이메일 인증</strong>
          <span>{isVerified ? '인증 완료' : isCodeSent ? '코드 전송됨' : '인증 필요'}</span>
        </VerificationHeader>
        <VerificationText>회원가입 전에 인증 코드를 보내고 확인해 주세요. 데모에서는 아무 코드나 입력해도 인증할 수 있습니다.</VerificationText>
        <InputRow>
          <TextInput type="text" placeholder="인증 코드 입력" value={verificationCode} onChange={event => onChangeVerificationCode(event.target.value)} />
          <InlineActionButton type="button" onClick={onSendCode}>
            코드 전송
          </InlineActionButton>
          <InlineActionButton type="button" onClick={onVerify} disabled={!isCodeSent}>
            인증 확인
          </InlineActionButton>
        </InputRow>
      </VerificationCard>

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

      <NoticeCard>
        <CheckboxLabel>
          <input type="checkbox" checked={agreeToTerms} onChange={event => onChangeAgreeToTerms(event.target.checked)} />
          이용약관과 개인정보 처리방침에 동의합니다.
        </CheckboxLabel>
      </NoticeCard>

      {errorMessage ? <p>{errorMessage}</p> : null}

      <FormSubmitButton type="submit" disabled={!isVerified}>
        회원가입
      </FormSubmitButton>
    </FormGrid>
  );
}
