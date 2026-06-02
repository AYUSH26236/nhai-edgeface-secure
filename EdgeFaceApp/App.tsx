import React from 'react';
import { StatusBar } from 'react-native';
import CameraScreen from './src/frontend/screens/CameraScreen';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <CameraScreen />
    </>
  );
}