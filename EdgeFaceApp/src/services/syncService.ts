import { SyncResult, SyncStatus } from '../types/sync';
import { getUnsynced, markSynced } from './auditService';
import { getAllWorkers } from './workerStore';

// V1: offline-only, sync is a no-op but tracks state
// V2: replace uploadLogs/uploadWorkers with real AWS calls

let lastSyncAt: number | undefined;
let isOnline = false;

export function setOnlineStatus(online: boolean) {
  isOnline = online;
}

export function getSyncStatus(): SyncStatus {
  const unsynced = getUnsynced();
  const pendingWorkers = getAllWorkers().filter(w => w.syncStatus !== 'SYNCED').length;
  return {
    lastSyncAt,
    pendingLogs: unsynced.length,
    pendingWorkers,
    isOnline,
  };
}

// V2: replace this with real AWS S3/DynamoDB upload
async function uploadLogs(): Promise<number> {
  if (!isOnline) return 0;
  const unsynced = getUnsynced();
  if (!unsynced.length) return 0;
  // TODO: POST to AWS endpoint
  // await fetch('https://your-api/logs', { method: 'POST', body: JSON.stringify(unsynced) })
  markSynced(unsynced.map(l => l.id));
  return unsynced.length;
}

// V2: upload pending worker enrollments to DataLake
async function uploadWorkers(): Promise<number> {
  if (!isOnline) return 0;
  const pending = getAllWorkers().filter(w => w.syncStatus === 'PENDING');
  if (!pending.length) return 0;
  // TODO: POST to DataLake endpoint
  return pending.length;
}

export async function sync(): Promise<SyncResult> {
  if (!isOnline) {
    return { uploaded: 0, purged: 0, pending: getUnsynced().length, success: false, error: 'Offline' };
  }
  try {
    const uploaded = await uploadLogs();
    const pendingWorkers = await uploadWorkers();
    lastSyncAt = Date.now();
    return { uploaded, purged: 0, pending: pendingWorkers, success: true };
  } catch (e: any) {
    return { uploaded: 0, purged: 0, pending: 0, success: false, error: e?.message };
  }
}