import { CameraPosition } from 'react-native-vision-camera';

export const CAMERA_CONFIG = {
  position: 'front' as CameraPosition,
  fps: 30,
  torch: 'off' as const,
  enableZoomGesture: false,
  faceDetection: {
    performanceMode: 'fast' as const,
    landmarkMode: 'all' as const,
    classificationMode: 'all' as const,
    minFaceSize: 0.15,
    trackingEnabled: true,
  },
};