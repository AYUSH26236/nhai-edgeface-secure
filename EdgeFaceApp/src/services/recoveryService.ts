import { getAllLogs } from './auditService';
import { getAllWorkers } from './workerStore';
import { getSyncStatus } from './syncService';

export interface SystemHealth {
  workerCount: number;
  pendingLogs: number;
  isOnline: boolean;
  lastSyncAt?: number;
  status: 'HEALTHY' | 'DEGRADED' | 'OFFLINE';
}

export function getSystemHealth(): SystemHealth {
  const sync = getSyncStatus();
  const workerCount = getAllWorkers().length;
  const pendingLogs = sync.pendingLogs;

  let status: SystemHealth['status'] = 'HEALTHY';
  if (!sync.isOnline) status = 'OFFLINE';
  else if (pendingLogs > 100) status = 'DEGRADED';

  return {
    workerCount,
    pendingLogs,
    isOnline: sync.isOnline,
    lastSyncAt: sync.lastSyncAt,
    status,
  };
}

export function exportLogsAsJSON(): string {
  return JSON.stringify(getAllLogs(), null, 2);
}