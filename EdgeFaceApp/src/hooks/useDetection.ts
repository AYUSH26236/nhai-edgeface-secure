import { useCallback } from 'react';
import { DetectedFace } from '../types/face';
import { parseFaces, getLargestFace } from '../services/detectionService';

export function useDetection() {
  const processRawFaces = useCallback((rawFaces: any[]): {
    faces: DetectedFace[];
    primaryFace: DetectedFace | null;
    faceCount: number;
  } => {
    const faces = parseFaces(rawFaces);
    return { faces, primaryFace: getLargestFace(faces), faceCount: faces.length };
  }, []);

  return { processRawFaces };
}