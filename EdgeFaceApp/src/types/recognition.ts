export interface RecognitionResult {
  matched: boolean;
  workerId?: string;
  confidence: number;
  workerName?: string;
}