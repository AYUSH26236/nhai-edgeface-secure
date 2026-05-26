export type AuthDecision =
  | "APPROVED"
  | "REJECTED"
  | "UNKNOWN";

export interface AuthResult {

  matched: boolean;

  workerId: string;

  workerName: string;

  confidence: number;

  livenessPass: boolean;

  decision: AuthDecision;

  timestamp: string;

}
