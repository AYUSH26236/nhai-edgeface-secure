import { Camera } from 'react-native-vision-camera';

export async function requestCameraPermission() {
  const permission = await Camera.requestCameraPermission();

  return permission === 'granted';
}