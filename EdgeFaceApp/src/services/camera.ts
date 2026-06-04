import { Camera } from 'react-native-vision-camera';

export interface CameraFrame {
  image: string;
  timestamp: number;
  width: number;
  height: number;
}

export async function requestCameraPermission(): Promise<boolean> {
  const status = await Camera.requestCameraPermission();
  return status === 'granted';
}

export async function getCameraPermissionStatus(): Promise<string> {
  return await Camera.getCameraPermissionStatus();
}