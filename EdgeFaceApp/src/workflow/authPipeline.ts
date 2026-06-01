import { AuthState } from '../types/auth';
import { DetectedFace } from '../types/face';
import { QualityResult } from '../types/quality';
import { LivenessChallenge } from '../types/liveness';
import { RecognitionResult } from '../types/recognition';
import { assessQuality } from '../services/qualityService';
import { BlinkDetector, SmileDetector, HeadTurnDetector, pickRandomChallenge, getChallengeInstruction } from '../services/livenessService';
import { matchEmbedding } from '../services/recognitionService';
import { getAllWorkers } from '../services/workerStore';
import { logEvent } from '../services/auditService';
import { THRESHOLDS } from '../config/thresholds';

export interface PipelineState {
  authState: AuthState;
  faceCount: number;
  quality?: QualityResult;
  livenessChallenge?: LivenessChallenge;
  livenesChallengeInstruction?: string;
  livenessProgress: number;
  recognition?: RecognitionResult;
  statusMessage: string;
}

const STATUS: Record<AuthState, string> = {
  IDLE: 'Initializing...',
  NO_FACE: 'No face detected. Please look at camera.',
  FACE_DETECTED: 'Face detected. Checking quality...',
  QUALITY_PASS: 'Starting liveness check...',
  LIVENESS_CHALLENGE: 'Follow the on-screen instruction',
  LIVENESS_PASS: 'Liveness verified. Identifying...',
  RECOGNIZING: 'Identifying...',
  AUTHENTICATED: 'Access Granted ✓',
  UNKNOWN_USER: 'Unknown user detected',
  REJECTED: 'Access Denied',
  ERROR: 'System error',
};

export class AuthPipeline {
  private state: AuthState = 'IDLE';
  private frameCount = 0;
  private stableFrames = 0;
  private lastFaceCount = 0;
  private currentChallenge?: LivenessChallenge;
  private challengeStartTime = 0;
  private blink = new BlinkDetector();
  private smile = new SmileDetector();
  private headTurn?: HeadTurnDetector;
  private listeners: Array<(s: PipelineState) => void> = [];

  subscribe(fn: (s: PipelineState) => void) {
    this.listeners.push(fn);
    return () => { this.listeners = this.listeners.filter(l => l !== fn); };
  }

  private emit(override?: Partial<PipelineState>) {
    const base: PipelineState = {
      authState: this.state,
      faceCount: this.lastFaceCount,
      livenessProgress: 0,
      statusMessage: STATUS[this.state],
    };
    this.listeners.forEach(l => l({ ...base, ...override }));
  }

  private go(next: AuthState) { this.state = next; this.stableFrames = 0; }

  processFrame(faces: DetectedFace[]) {
    this.frameCount++;
    if (this.frameCount % THRESHOLDS.pipeline.frameSkip !== 0) return;
    this.lastFaceCount = faces.length;

    if (!faces.length) {
      if (this.state !== 'NO_FACE' && this.state !== 'IDLE') { this.go('NO_FACE'); this.emit(); }
      return;
    }

    const face = faces.reduce((a, b) =>
      a.bounds.width * a.bounds.height > b.bounds.width * b.bounds.height ? a : b
    );

    switch (this.state) {
      case 'IDLE':
      case 'NO_FACE':
        this.stableFrames++;
        if (this.stableFrames >= THRESHOLDS.pipeline.stableFramesRequired) {
          this.go('FACE_DETECTED'); this.emit();
        }
        break;

      case 'FACE_DETECTED': {
        const quality = assessQuality(face);
        if (quality.passed) { this.go('QUALITY_PASS'); this.emit({ quality }); }
        else this.emit({ authState: 'FACE_DETECTED', quality, statusMessage: quality.failReasons[0] ?? 'Adjust position' });
        break;
      }

      case 'QUALITY_PASS':
        this.currentChallenge = pickRandomChallenge();
        this.challengeStartTime = Date.now();
        this.blink.reset(); this.smile.reset();
        if (this.currentChallenge === 'TURN_LEFT') this.headTurn = new HeadTurnDetector('LEFT');
        else if (this.currentChallenge === 'TURN_RIGHT') this.headTurn = new HeadTurnDetector('RIGHT');
        this.go('LIVENESS_CHALLENGE');
        this.emit({ livenessChallenge: this.currentChallenge, livenesChallengeInstruction: getChallengeInstruction(this.currentChallenge) });
        break;

      case 'LIVENESS_CHALLENGE': {
        if (Date.now() - this.challengeStartTime > THRESHOLDS.liveness.challengeTimeoutMs) {
          logEvent('LIVENESS_FAIL');
          this.go('REJECTED');
          this.emit({ statusMessage: 'Liveness timeout. Try again.' });
          setTimeout(() => this.reset(), 3000);
          return;
        }
        let passed = false;
        switch (this.currentChallenge) {
          case 'BLINK': passed = this.blink.update(face); break;
          case 'SMILE': passed = this.smile.update(face); break;
          case 'TURN_LEFT': case 'TURN_RIGHT': passed = this.headTurn?.update(face) ?? false; break;
        }
        if (passed) { this.go('LIVENESS_PASS'); this.emit({ livenessProgress: 1 }); }
        else this.emit({ livenessChallenge: this.currentChallenge, livenesChallengeInstruction: getChallengeInstruction(this.currentChallenge!), livenessProgress: 0.5 });
        break;
      }

      case 'LIVENESS_PASS': {
        this.go('RECOGNIZING');
        const workers = getAllWorkers();
        // For demo: match against first worker's embedding (V2: use real TFLite embedding)
        const result = matchEmbedding(workers[0]?.embedding ?? [], workers);
        if (result.matched) {
          logEvent('AUTH_SUCCESS', { workerId: result.workerId, confidence: result.confidence });
          this.go('AUTHENTICATED');
          this.emit({ recognition: result, statusMessage: `Welcome, ${result.workerName}` });
          setTimeout(() => this.reset(), 5000);
        } else {
          logEvent('UNKNOWN_USER');
          this.go('UNKNOWN_USER');
          this.emit({ recognition: result });
        }
        break;
      }
    }
  }

  reset() {
    this.state = 'NO_FACE';
    this.frameCount = 0;
    this.stableFrames = 0;
    this.currentChallenge = undefined;
    this.blink.reset(); this.smile.reset(); this.headTurn = undefined;
    this.emit();
  }
}

export const authPipeline = new AuthPipeline();