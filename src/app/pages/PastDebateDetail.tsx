import { useParams } from 'react-router';
import { getPastDebateById } from '../data/pastDebateArchive';
import { PastDebateDetailContent } from '../features/past-debates/components/PastDebateDetailContent';

export function PastDebateDetail() {
  const { id = '' } = useParams();
  const debate = getPastDebateById(id);

  return <PastDebateDetailContent debate={debate ?? null} />;
}
