import { DetectedFace, FaceBounds, FaceLandmarks } from '../types/face';

export function parseFaces(rawFaces: any[]): DetectedFace[] {
  if (!rawFaces || rawFaces.length === 0) return [];
  return rawFaces.map((raw): DetectedFace => {
    const bounds: FaceBounds = {
      x: raw.bounds?.x ?? raw.boundingBox?.left ?? 0,
      y: raw.bounds?.y ?? raw.boundingBox?.top ?? 0,
      width: raw.bounds?.width ?? (raw.boundingBox?.right - raw.boundingBox?.left) ?? 0,
      height: raw.bounds?.height ?? (raw.boundingBox?.bottom - raw.boundingBox?.top) ?? 0,
    };
    const landmarks: FaceLandmarks = {
      leftEyeOpenProbability: raw.leftEyeOpenProbability,
      rightEyeOpenProbability: raw.rightEyeOpenProbability,
      smilingProbability: raw.smilingProbability,
      headEulerAngleX: raw.headEulerAngleX,
      headEulerAngleY: raw.headEulerAngleY,
      headEulerAngleZ: raw.headEulerAngleZ,
    };
    return { bounds, landmarks, trackingId: raw.trackingId };
  });
}

export function getLargestFace(faces: DetectedFace[]): DetectedFace | null {
  if (faces.length === 0) return null;
  return faces.reduce((a, b) =>
    a.bounds.width * a.bounds.height > b.bounds.width * b.bounds.height ? a : b
  );
}