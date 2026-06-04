export interface SyncResult {
  uploaded: number;
  purged: number;
  pending: number;
  success: boolean;
  error?: string;
}

export interface SyncStatus {
  lastSyncAt?: number;
  pendingLogs: number;
  pendingWorkers: number;
  isOnline: boolean;
}