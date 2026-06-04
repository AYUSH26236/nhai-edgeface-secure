import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { DetectedFace } from '../../types/face';
import { AuthState } from '../../types/auth';

interface Props {
  faces: DetectedFace[];
  authState: AuthState;
  frameWidth: number;
  frameHeight: number;
}

const COLOR: Partial<Record<AuthState, string>> = {
  AUTHENTICATED: '#00FF88',
  REJECTED: '#FF3B30',
  LIVENESS_CHALLENGE: '#FFD60A',
  RECOGNIZING: '#0A84FF',
};

export const FaceBox: React.FC<Props> = ({ faces, authState, frameWidth, frameHeight }) => {
  const { width: viewWidth, height: viewHeight } = useWindowDimensions();

  // MLKit on Android returns bounds in landscape frame coords.
  // Front camera is portrait, so frame width/height are swapped.
  const scaleX = viewWidth / frameHeight;
  const scaleY = viewHeight / frameWidth;

  return (
    <>
      {faces.map((face, i) => {
        const { x, y, width, height } = face.bounds;
        // Mirror horizontally for front camera
        const left = viewWidth - (x + width) * scaleX;
        const top = y * scaleY;
        const w = width * scaleX;
        const h = height * scaleY;

        return (
          <View
            key={face.trackingId ?? i}
            style={[styles.box, {
              left,
              top,
              width: w,
              height: h,
              borderColor: COLOR[authState] ?? '#FFF',
            }]}
          />
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  box: { position: 'absolute', borderWidth: 2, borderRadius: 4, backgroundColor: 'transparent' },
});