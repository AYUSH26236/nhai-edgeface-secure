import { EnrollmentRequest } from '../types/enrollment';
import { createTempEnrollment, approveEnrollment } from '../services/enrollmentService';
import { logEvent } from '../services/auditService';

export interface EnrollmentPipelineResult {
  success: boolean;
  message: string;
  enrollmentId?: string;
}

export async function startEnrollment(
  name: string,
  faceImages: string[],
  isVisitor = false,
): Promise<EnrollmentPipelineResult> {
  if (!name.trim()) {
    return { success: false, message: 'Name is required' };
  }
  if (!faceImages.length) {
    return { success: false, message: 'At least one face image required' };
  }
  try {
    // Use first image for enrollment (V2: use all for better embedding)
    const request = await createTempEnrollment(name, faceImages[0], isVisitor);
    return {
      success: true,
      message: `Enrollment submitted for ${name}. Awaiting supervisor approval.`,
      enrollmentId: request.id,
    };
  } catch (e: any) {
    logEvent('AUTH_FAIL', { metadata: { reason: 'ENROLLMENT_ERROR', error: e?.message } });
    return { success: false, message: 'Enrollment failed. Please try again.' };
  }
}

export function supervisorApprove(enrollmentId: string): EnrollmentPipelineResult {
  const worker = approveEnrollment(enrollmentId);
  if (!worker) return { success: false, message: 'Enrollment not found' };
  return { success: true, message: `${worker.name} approved and added to database.` };
}