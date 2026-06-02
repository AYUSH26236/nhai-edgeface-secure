export type AuthState =
  | 'IDLE'
  | 'NO_FACE'
  | 'FACE_DETECTED'
  | 'QUALITY_PASS'
  | 'LIVENESS_CHALLENGE'
  | 'LIVENESS_PASS'
  | 'RECOGNIZING'
  | 'AUTHENTICATED'
  | 'UNKNOWN_USER'
  | 'REJECTED'
  | 'ERROR';

export interface AuthResult {
  success: boolean;
  state: AuthState;
  message: string;
  confidence?: number;
  workerId?: string;
  workerName?: string;
}