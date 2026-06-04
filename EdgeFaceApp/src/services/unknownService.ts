import { UnknownUserAction } from '../types/unknown';
import { logEvent } from './auditService';
import { createTempEnrollment } from './enrollmentService';

export async function handleUnknownUser(
  action: UnknownUserAction,
  faceImageBase64?: string,
  name?: string,
): Promise<{ message: string; success: boolean }> {
  switch (action) {
    case 'ENROLL_TEMP': {
      if (!faceImageBase64 || !name) {
        return { message: 'Name and face image required', success: false };
      }
      await createTempEnrollment(name, faceImageBase64, false);
      return { message: 'Enrollment submitted. Pending supervisor approval.', success: true };
    }
    case 'VISITOR_MODE': {
      logEvent('ENROLLMENT_START', { metadata: { type: 'VISITOR' } });
      return { message: 'Visitor access granted (limited).', success: true };
    }
    case 'SEARCH_DATALAKE': {
      // V2: search AWS DataLake
      return { message: 'DataLake search not available offline.', success: false };
    }
    case 'DENY': {
      logEvent('AUTH_FAIL', { metadata: { reason: 'OPERATOR_DENIED' } });
      return { message: 'Access denied.', success: false };
    }
  }
}