export interface FaceBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FaceLandmarks {
  leftEyeOpenProbability?: number;
  rightEyeOpenProbability?: number;
  smilingProbability?: number;
  headEulerAngleX?: number; // pitch
  headEulerAngleY?: number; // yaw
  headEulerAngleZ?: number; // roll
}

export interface DetectedFace {
  bounds: FaceBounds;
  landmarks: FaceLandmarks;
  trackingId?: number;
}