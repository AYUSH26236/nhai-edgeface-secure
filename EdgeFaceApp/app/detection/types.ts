export interface FaceBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FaceDetectionResult {
  bounds: FaceBounds;
  confidence: number;
  yaw: number;
  pitch: number;
  roll: number;
}