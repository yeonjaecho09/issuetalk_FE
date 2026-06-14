import { Bell, Mail, Settings, ShieldCheck } from 'lucide-react';
import { SettingCopy, SettingItem, SettingList, SettingTitle, SettingsCardRoot, SettingsSectionTitle } from './AccountSettingsCard.styles';

const settings = [
  {
    icon: Mail,
    title: '이메일 변경',
    description: '현재 등록된 이메일 주소를 변경하고 다시 인증하는 흐름을 나중에 연결할 수 있는 영역입니다.',
  },
  {
    icon: ShieldCheck,
    title: '비밀번호 및 보안',
    description: '비밀번호 재설정, 로그인 기기 확인, 계정 보호 설정을 모아보는 섹션입니다.',
  },
  {
    icon: Bell,
    title: '알림 설정',
    description: '실시간 토론 시작, 댓글, 좋아요, 운영 공지 알림 수신 여부를 조절하는 영역입니다.',
  },
];

export function AccountSettingsCard() {
  return (
    <SettingsCardRoot>
      <SettingsSectionTitle>
        <Settings size={20} />
        계정 설정
      </SettingsSectionTitle>

      <SettingList>
        {settings.map(setting => {
          const Icon = setting.icon;

          return (
            <SettingItem key={setting.title}>
              <SettingTitle>
                <Icon size={16} style={{ marginRight: '0.35rem', verticalAlign: 'text-bottom' }} />
                {setting.title}
              </SettingTitle>
              <SettingCopy>{setting.description}</SettingCopy>
            </SettingItem>
          );
        })}
      </SettingList>
    </SettingsCardRoot>
  );
}
