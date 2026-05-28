export type AuthState =
  | 'idle'
  | 'detecting'
  | 'quality_check'
  | 'liveness'
  | 'recognizing'
  | 'authenticated'
  | 'unknown'
  | 'failed';

export interface AuthResult {

  success: boolean;

  state: AuthState;

  confidence?: number;

  workerId?: string;

  message?: string;
}