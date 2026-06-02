export const THRESHOLDS = {
  quality: {
    minBlurScore: 0.6,
    minLightingScore: 0.5,
    maxPitchAngle: 20,
    maxYawAngle: 25,
    maxRollAngle: 15,
    minFaceSize: 0.15,
  },
  liveness: {
    blinkEyeOpenThreshold: 0.7,
    blinkEyeClosedThreshold: 0.3,
    smileThreshold: 0.7,
    headTurnYawThreshold: 20,
    challengeTimeoutMs: 8000,
  },
  recognition: {
    matchThreshold: 0.75,
    unknownThreshold: 0.55,
  },
  pipeline: {
    frameSkip: 2,
    stableFramesRequired: 3,
    authTimeoutMs: 30000,
  },
};