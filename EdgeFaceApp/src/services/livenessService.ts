import { DetectedFace } from '../types/face';
import { LivenessChallenge } from '../types/liveness';
import { THRESHOLDS } from '../config/thresholds';

const T = THRESHOLDS.liveness;

export class BlinkDetector {
  private blinkCount = 0;
  private eyesWereClosed = false;
  private targetBlinks: number;
  constructor(targetBlinks = 1) { this.targetBlinks = targetBlinks; }

  update(face: DetectedFace): boolean {
    const left = face.landmarks.leftEyeOpenProbability ?? 1;
    const right = face.landmarks.rightEyeOpenProbability ?? 1;
    const avg = (left + right) / 2;
    if (!this.eyesWereClosed && avg < T.blinkEyeClosedThreshold) {
      this.eyesWereClosed = true;
    } else if (this.eyesWereClosed && avg > T.blinkEyeOpenThreshold) {
      this.eyesWereClosed = false;
      this.blinkCount++;
    }
    return this.blinkCount >= this.targetBlinks;
  }
  reset() { this.blinkCount = 0; this.eyesWereClosed = false; }
}

export class SmileDetector {
  private heldFrames = 0;
  private required = 10;
  update(face: DetectedFace): boolean {
    const smile = face.landmarks.smilingProbability ?? 0;
    this.heldFrames = smile > T.smileThreshold ? this.heldFrames + 1 : 0;
    return this.heldFrames >= this.required;
  }
  reset() { this.heldFrames = 0; }
}

export class HeadTurnDetector {
  private direction: 'LEFT' | 'RIGHT';
  private heldFrames = 0;
  private required = 8;
  constructor(direction: 'LEFT' | 'RIGHT') { this.direction = direction; }
  update(face: DetectedFace): boolean {
    const yaw = face.landmarks.headEulerAngleY ?? 0;
    const turned = this.direction === 'LEFT'
      ? yaw < -T.headTurnYawThreshold
      : yaw > T.headTurnYawThreshold;
    this.heldFrames = turned ? this.heldFrames + 1 : 0;
    return this.heldFrames >= this.required;
  }
  reset() { this.heldFrames = 0; }
}

export function getChallengeInstruction(c: LivenessChallenge): string {
  const map: Record<LivenessChallenge, string> = {
    BLINK: 'Please blink once',
    SMILE: 'Please smile',
    TURN_LEFT: 'Turn your head left',
    TURN_RIGHT: 'Turn your head right',
  };
  return map[c];
}

export function pickRandomChallenge(exclude?: LivenessChallenge): LivenessChallenge {
  const all: LivenessChallenge[] = ['BLINK', 'SMILE', 'TURN_LEFT', 'TURN_RIGHT'];
  const pool = exclude ? all.filter(c => c !== exclude) : all;
  return pool[Math.floor(Math.random() * pool.length)];
}