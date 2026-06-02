export interface SyncStatus {
  lastSyncAt?: number;
  pendingLogs: number;
  pendingWorkers: number;
  isOnline: boolean;
}