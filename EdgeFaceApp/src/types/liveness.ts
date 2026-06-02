export type LivenessChallenge = 'BLINK' | 'SMILE' | 'TURN_LEFT' | 'TURN_RIGHT';

export interface LivenessResult {
  passed: boolean;
  challengesPassed: LivenessChallenge[];
  spoofDetected: boolean;
}