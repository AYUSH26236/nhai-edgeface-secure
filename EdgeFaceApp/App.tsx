import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CameraView from './app/camera/CameraView';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <CameraView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
});