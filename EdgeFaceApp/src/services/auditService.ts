import { AuditLog, AuditEventType } from '../types/audit';

const logs: AuditLog[] = [];

export function logEvent(
  eventType: AuditEventType,
  extras?: Partial<Omit<AuditLog, 'id' | 'eventType' | 'timestamp' | 'synced'>>,
): AuditLog {
  const log: AuditLog = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    eventType,
    timestamp: Date.now(),
    synced: false,
    ...extras,
  };
  logs.push(log);
  if (__DEV__) console.log('[AUDIT]', log);
  return log;
}

export function getUnsynced(): AuditLog[] { return logs.filter(l => !l.synced); }
export function getAllLogs(): AuditLog[] { return [...logs]; }
export function markSynced(ids: string[]) {
  const set = new Set(ids);
  logs.forEach(l => { if (set.has(l.id)) l.synced = true; });
}