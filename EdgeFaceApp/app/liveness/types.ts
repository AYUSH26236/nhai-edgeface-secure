export type LivenessChallenge =
  | 'BLINK'
  | 'TURN_LEFT'
  | 'TURN_RIGHT'
  | 'SMILE';

export interface LivenessState {
  currentChallenge: LivenessChallenge;

  instruction: string;

  completed: boolean;

  failed: boolean;

  progress: number;

  verified: boolean;
}