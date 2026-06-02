import { useState } from 'react';
import { DetectedFace } from '../types/face';
import { QualityResult } from '../types/quality';
import { assessQuality } from '../services/qualityService';

const DEFAULT: QualityResult = {
  passed: false,
  blurScore: 0,
  lightingScore: 0,
  poseScore: 0,
  failReasons: [],
};

export function useQuality() {
  const [quality, setQuality] = useState<QualityResult>(DEFAULT);

  function evaluate(face: DetectedFace, frameWidth?: number, frameHeight?: number): QualityResult {
    const result = assessQuality(face, frameWidth, frameHeight);
    setQuality(result);
    return result;
  }

  function reset() { setQuality(DEFAULT); }

  return { quality, evaluate, reset };
}