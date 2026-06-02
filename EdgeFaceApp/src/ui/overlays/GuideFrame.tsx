import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { AuthState } from '../../types/auth';

const { width: SW } = Dimensions.get('window');
const W = SW * 0.65;
const H = W * 1.35;

const COLOR: Partial<Record<AuthState, string>> = {
  AUTHENTICATED: '#00FF88',
  REJECTED: '#FF3B30',
  LIVENESS_CHALLENGE: '#FFD60A',
  RECOGNIZING: '#0A84FF',
  LIVENESS_PASS: '#0A84FF',
};

export const GuideFrame: React.FC<{ authState: AuthState }> = ({ authState }) => (
  <View style={styles.wrap} pointerEvents="none">
    <View style={[styles.oval, { borderColor: COLOR[authState] ?? 'rgba(255,255,255,0.6)' }]} />
  </View>
);

const styles = StyleSheet.create({
  wrap: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  oval: { width: W, height: H, borderRadius: W / 2, borderWidth: 2, backgroundColor: 'transparent' },
});