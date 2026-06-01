import { DetectedFace } from '../types/face';
import { QualityResult } from '../types/quality';
import { THRESHOLDS } from '../config/thresholds';

function estimateBlur(face: DetectedFace, frameWidth: number, frameHeight: number): number {
  const faceArea = face.bounds.width * face.bounds.height;
  const frameArea = frameWidth * frameHeight;
  const ratio = faceArea / frameArea;
  if (ratio < 0.05) return 0.3;
  if (ratio < 0.10) return 0.55;
  if (ratio > 0.5) return 0.6;
  return Math.min(0.95, 0.6 + ratio * 2);
}

function estimateLighting(face: DetectedFace): number {
  const hasLandmarks =
    face.landmarks.leftEyeOpenProbability !== undefined &&
    face.landmarks.smilingProbability !== undefined;
  return hasLandmarks ? 0.8 : 0.4;
}

function estimatePose(face: DetectedFace): { score: number; fail: boolean } {
  const pitch = Math.abs(face.landmarks.headEulerAngleX ?? 0);
  const yaw = Math.abs(face.landmarks.headEulerAngleY ?? 0);
  const roll = Math.abs(face.landmarks.headEulerAngleZ ?? 0);
  const { maxPitchAngle, maxYawAngle, maxRollAngle } = THRESHOLDS.quality;
  const ok = [pitch < maxPitchAngle, yaw < maxYawAngle, roll < maxRollAngle];
  return { score: ok.filter(Boolean).length / 3, fail: ok.some(v => !v) };
}

export function assessQuality(
  face: DetectedFace,
  frameWidth = 720,
  frameHeight = 1280,
): QualityResult {
  const blurScore = estimateBlur(face, frameWidth, frameHeight);
  const lightingScore = estimateLighting(face);
  const poseResult = estimatePose(face);
  const failReasons: string[] = [];
  if (blurScore < THRESHOLDS.quality.minBlurScore) failReasons.push('Move closer or hold still');
  if (lightingScore < THRESHOLDS.quality.minLightingScore) failReasons.push('Improve lighting');
  if (poseResult.fail) failReasons.push('Look straight at camera');
  return {
    passed: failReasons.length === 0,
    blurScore,
    lightingScore,
    poseScore: poseResult.score,
    failReasons,
  };
}