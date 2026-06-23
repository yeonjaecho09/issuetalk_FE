import type { DebateRoom } from '../../../data/liveDebateRooms';
import {
  HeroCard,
  HeroEyebrow,
  HeroMetaChip,
  HeroMetaRow,
  HeroStatus,
  HeroTopRow,
  ParticipantCard,
  ParticipantGrid,
  ParticipantLabel,
  ParticipantName,
  ParticipantStance,
  SummaryTitle,
  Tag,
  TagRow,
} from './LiveDebateRoomPageContent.styles';
import { formatRoomStatus, formatStartTime } from './liveDebateRoomContent.utils';

type LiveDebateRoomHeroProps = {
  room: DebateRoom;
};

export function LiveDebateRoomHero({ room }: LiveDebateRoomHeroProps) {
  return (
    <HeroCard>
      <HeroTopRow>
        <HeroEyebrow>{room.roundLabel}</HeroEyebrow>
        <HeroStatus $live={room.status === 'live'}>{formatRoomStatus(room.status)}</HeroStatus>
      </HeroTopRow>
      <SummaryTitle>{room.title}</SummaryTitle>
      <HeroMetaRow>
        <HeroMetaChip>진행자 {room.host}</HeroMetaChip>
        <HeroMetaChip>시작 {formatStartTime(room.startTime)}</HeroMetaChip>
        <HeroMetaChip>현재 관전자 {room.viewers.toLocaleString()}명</HeroMetaChip>
        <HeroMetaChip>누적 메시지 {room.messagesCount}개</HeroMetaChip>
        <HeroMetaChip>전체 토론 시간 30분</HeroMetaChip>
      </HeroMetaRow>
      <TagRow>
        {room.tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </TagRow>
      <ParticipantGrid>
        <ParticipantCard>
          <ParticipantLabel>토론자 A</ParticipantLabel>
          <ParticipantName>{room.debater1.name}</ParticipantName>
          <ParticipantStance>{room.debater1.stance}</ParticipantStance>
        </ParticipantCard>
        <ParticipantCard>
          <ParticipantLabel>토론자 B</ParticipantLabel>
          <ParticipantName>{room.debater2.name}</ParticipantName>
          <ParticipantStance>{room.debater2.stance}</ParticipantStance>
        </ParticipantCard>
      </ParticipantGrid>
    </HeroCard>
  );
}
