export interface FaceBounds {

  x: number;
  y: number;

  width: number;
  height: number;
}

export interface FaceData {

  id: string;

  bounds: FaceBounds;

  rollAngle: number;
  yawAngle: number;

  leftEyeOpenProbability?: number;
  rightEyeOpenProbability?: number;

  smilingProbability?: number;
}