import { useEffect, useState } from 'react';
import { subscribeLiveDebateStorageUpdates } from '../../../data/liveDebateSubscriptions';

export function useLiveDebateStorageVersion() {
  const [storageVersion, setStorageVersion] = useState(0);

  useEffect(() => {
    return subscribeLiveDebateStorageUpdates(() => {
      setStorageVersion(value => value + 1);
    });
  }, []);

  return storageVersion;
}
