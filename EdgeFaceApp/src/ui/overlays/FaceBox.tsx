import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DetectedFace } from '../../types/face';
import { AuthState } from '../../types/auth';

interface Props {
  faces: DetectedFace[];
  authState: AuthState;
}

const COLOR: Partial<Record<AuthState, string>> = {
  AUTHENTICATED: '#00FF88',
  REJECTED: '#FF3B30',
  LIVENESS_CHALLENGE: '#FFD60A',
  RECOGNIZING: '#0A84FF',
};

export const FaceBox: React.FC<Props> = ({ faces, authState }) => (
  <>
    {faces.map((face, i) => (
      <View
        key={face.trackingId ?? i}
        style={[styles.box, {
          left: face.bounds.x,
          top: face.bounds.y,
          width: face.bounds.width,
          height: face.bounds.height,
          borderColor: COLOR[authState] ?? '#FFF',
        }]}
      />
    ))}
  </>
);

const styles = StyleSheet.create({
  box: { position: 'absolute', borderWidth: 2, borderRadius: 4, backgroundColor: 'transparent' },
});