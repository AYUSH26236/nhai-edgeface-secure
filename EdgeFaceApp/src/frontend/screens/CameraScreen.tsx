import React, {
  useEffect,
  useState,
  useRef,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  Camera,
  useCameraDevice,
} from 'react-native-vision-camera';

export default function CameraScreen() {

  const device =
    useCameraDevice('front');

  const [hasPermission, setHasPermission] =
    useState(false);

  const [faceCount, setFaceCount] =
    useState(0);

  const options = useRef({
    performanceMode: 'fast',
    landmarkMode: 'all',
    contourMode: 'all',
    classificationMode: 'all',
  }).current;

  useEffect(() => {

    async function requestPermission() {

      const permission =
        await Camera.requestCameraPermission();

      setHasPermission(
        permission === 'granted',
      );
    }

    requestPermission();

  }, []);

  function handleFacesDetected(
    faces: any[],
  ) {

    setFaceCount(
      faces.length,
    );

    console.log(
      'Faces:',
      faces.length,
    );
  }

  if (!hasPermission) {

    return (
      <View style={styles.center}>
        <Text>
          Camera Permission Needed
        </Text>
      </View>
    );
  }

  if (!device) {

    return (
      <View style={styles.center}>
        <Text>
          No Camera Found
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        faceDetectionCallback={
          handleFacesDetected
        }
        faceDetectionOptions={
          options
        }
      />

      <View style={styles.banner}>
        <Text style={styles.text}>
          Faces Detected: {faceCount}
        </Text>
      </View>

    </View>
  );
}

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
    },

    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    banner: {
      position: 'absolute',
      top: 60,
      alignSelf: 'center',
      backgroundColor: '#000000AA',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 12,
    },

    text: {
      color: '#00FF88',
      fontSize: 18,
      fontWeight: '700',
    },
  });