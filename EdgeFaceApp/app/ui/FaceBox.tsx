import React from 'react';

import {
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

export default function FaceBox({
  x,
  y,
  width,
  height,
  color = '#00FF88',
}: Props): React.JSX.Element {
  const dynamicStyle: ViewStyle = {
    left: x,
    top: y,
    width,
    height,
    borderColor: color,
  };

  return (
    <View
      style={[styles.box, dynamicStyle]}
    />
  );
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    borderWidth: 4,
    borderRadius: 16,
  },
});