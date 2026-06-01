import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthState } from '../../types/auth';

interface Props { authState: AuthState; message: string; workerName?: string; }

const BG: Partial<Record<AuthState, string>> = {
  AUTHENTICATED: '#00FF88',
  REJECTED: '#FF3B30',
  LIVENESS_CHALLENGE: '#FFD60A',
  UNKNOWN_USER: '#FF9500',
};

export const StatusBanner: React.FC<Props> = ({ authState, message, workerName }) => {
  const bg = BG[authState] ?? 'rgba(0,0,0,0.65)';
  const textColor = (authState === 'AUTHENTICATED' || authState === 'LIVENESS_CHALLENGE' || authState === 'UNKNOWN_USER') ? '#000' : '#FFF';
  return (
    <View style={[styles.banner, { backgroundColor: bg }]}>
      <Text style={[styles.msg, { color: textColor }]}>{message}</Text>
      {workerName && <Text style={[styles.name, { color: textColor }]}>{workerName}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  banner: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12, alignItems: 'center', minWidth: 220 },
  msg: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
  name: { fontSize: 20, fontWeight: '700', marginTop: 4 },
});