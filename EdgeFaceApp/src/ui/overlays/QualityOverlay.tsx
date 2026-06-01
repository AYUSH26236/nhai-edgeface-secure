import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { QualityResult } from '../../types/quality';

export const QualityOverlay: React.FC<{ quality: QualityResult }> = ({ quality }) => {
  if (quality.passed || !quality.failReasons.length) return null;
  return (
    <View style={styles.hint}>
      <Text style={styles.text}>{quality.failReasons[0]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  hint: {
    position: 'absolute', top: '55%', alignSelf: 'center',
    backgroundColor: 'rgba(255,149,0,0.9)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8,
  },
  text: { color: '#000', fontWeight: '700', fontSize: 14 },
});