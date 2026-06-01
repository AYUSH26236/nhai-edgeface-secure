export type AuditEventType =
  | 'AUTH_SUCCESS'
  | 'AUTH_FAIL'
  | 'LIVENESS_FAIL'
  | 'QUALITY_FAIL'
  | 'UNKNOWN_USER'
  | 'ENROLLMENT_START'
  | 'ENROLLMENT_COMPLETE';

export interface AuditLog {
  id: string;
  eventType: AuditEventType;
  workerId?: string;
  timestamp: number;
  confidence?: number;
  synced: boolean;
  metadata?: Record<string, unknown>;
}