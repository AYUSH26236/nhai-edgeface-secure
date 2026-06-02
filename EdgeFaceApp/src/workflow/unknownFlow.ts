import { UnknownUserAction } from '../types/unknown';
import { handleUnknownUser } from '../services/unknownService';
import { getSyncStatus } from '../services/syncService';

export interface UnknownFlowResult {
  action: UnknownUserAction;
  message: string;
  success: boolean;
  requiresApproval: boolean;
}

export async function runUnknownFlow(
  action: UnknownUserAction,
  faceImageBase64?: string,
  name?: string,
): Promise<UnknownFlowResult> {
  const { isOnline } = getSyncStatus();

  // If search DataLake requested but offline, fall back to enroll
  if (action === 'SEARCH_DATALAKE' && !isOnline) {
    return {
      action: 'ENROLL_TEMP',
      message: 'Offline — DataLake unavailable. Proceeding with temp enrollment.',
      success: false,
      requiresApproval: true,
    };
  }

  const result = await handleUnknownUser(action, faceImageBase64, name);

  return {
    action,
    message: result.message,
    success: result.success,
    requiresApproval: action === 'ENROLL_TEMP',
  };
}