export type SyncEventType =
  | "ATTENDANCE_LOG"
  | "VISITOR_LOG"
  | "TEMP_WORKER_LOG"
  | "SPOOF_LOG"
  | "UNKNOWN_LOG";

export type SyncQueueItem = {
  id: string;
  type: SyncEventType;
  payload: Record<string, unknown>;
  createdAt: string;
  synced: boolean;
};

const syncQueue: SyncQueueItem[] = [];

export function addToSyncQueue(
  type: SyncEventType,
  payload: Record<string, unknown>
): SyncQueueItem {
  const item: SyncQueueItem = {
    id: `sync_${Date.now()}`,
    type,
    payload,
    createdAt: new Date().toISOString(),
    synced: false
  };

  syncQueue.push(item);
  return item;
}

export function getPendingSyncItems(): SyncQueueItem[] {
  return syncQueue.filter((item) => !item.synced);
}

export function markItemAsSynced(id: string): void {
  const item = syncQueue.find((queueItem) => queueItem.id === id);
  if (item) item.synced = true;
}

export function markAllAsSynced(): void {
  syncQueue.forEach((item) => {
    item.synced = true;
  });
}

export function purgeSyncedItems(): number {
  const before = syncQueue.length;

  for (let i = syncQueue.length - 1; i >= 0; i--) {
    if (syncQueue[i].synced) {
      syncQueue.splice(i, 1);
    }
  }

  return before - syncQueue.length;
}