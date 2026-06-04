import { AuthResult, AuthState } from '../types/auth';
import { recognizeFace } from '../services/edgeface';
import { logEvent } from '../services/auditService';

// This is the image-based verification path (used for enrollment verification)
// The live camera path uses authPipeline.ts instead
export async function verifyFaceImage(faceImageBase64: string): Promise<AuthResult> {
  try {
    const result = await recognizeFace(faceImageBase64);
    if (result.matched) {
      logEvent('AUTH_SUCCESS', { workerId: result.workerId, confidence: result.confidence });
      return {
        success: true,
        state: 'AUTHENTICATED',
        message: `Welcome, ${result.workerName}`,
        confidence: result.confidence,
        workerId: result.workerId,
        workerName: result.workerName,
      };
    }
    logEvent('UNKNOWN_USER');
    return {
      success: false,
      state: 'UNKNOWN_USER',
      message: 'Face not recognized',
      confidence: result.confidence,
    };
  } catch (e: any) {
    return { success: false, state: 'ERROR', message: e?.message ?? 'Verification failed' };
  }
}