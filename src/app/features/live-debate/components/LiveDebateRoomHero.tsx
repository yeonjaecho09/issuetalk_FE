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
  SummaryText,
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
      <SummaryText>{room.summary}</SummaryText>
      <HeroMetaRow>
        <HeroMetaChip>吏꾪뻾??{room.host}</HeroMetaChip>
        <HeroMetaChip>?쒖옉 {formatStartTime(room.startTime)}</HeroMetaChip>
        <HeroMetaChip>?꾩옱 ?쒖껌??{room.viewers.toLocaleString()}紐?</HeroMetaChip>
        <HeroMetaChip>?꾩쟻 硫붿떆吏 {room.messagesCount}媛?</HeroMetaChip>
        <HeroMetaChip>?꾩껜 ?좊줎 ?쒓컙 42遺?</HeroMetaChip>
      </HeroMetaRow>
      <TagRow>
        {room.tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </TagRow>
      <ParticipantGrid>
        <ParticipantCard>
          <ParticipantLabel>?좊줎??A</ParticipantLabel>
          <ParticipantName>{room.debater1.name}</ParticipantName>
          <ParticipantStance>{room.debater1.stance}</ParticipantStance>
        </ParticipantCard>
        <ParticipantCard>
          <ParticipantLabel>?좊줎??B</ParticipantLabel>
          <ParticipantName>{room.debater2.name}</ParticipantName>
          <ParticipantStance>{room.debater2.stance}</ParticipantStance>
        </ParticipantCard>
      </ParticipantGrid>
    </HeroCard>
  );
}
