import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {
  Camera,
  useCameraDevice,
} from 'react-native-vision-camera';

export default function CameraScreen() {

  const device =
    useCameraDevice('front');

  const [hasPermission,
    setHasPermission] =
    useState(false);

  useEffect(() => {

    async function getPermission() {

      const permission =
        await Camera.requestCameraPermission();

      setHasPermission(
        permission ===
        'granted',
      );
    }

    getPermission();

  }, []);

  if (!hasPermission) {

    return (

      <View
        style={styles.center}
      >

        <Text
          style={styles.loading}
        >
          Camera permission denied
        </Text>

      </View>
    );
  }

  if (device == null) {

    return (

      <View
        style={styles.center}
      >

        <ActivityIndicator
          size="large"
          color="#00ff99"
        />

        <Text
          style={styles.loading}
        >
          Loading Camera...
        </Text>

      </View>
    );
  }

  return (

    <View
      style={styles.container}
    >

      <Camera
        style={
          StyleSheet.absoluteFill
        }

        device={device}

        isActive={true}
      />

      <View
        style={styles.overlay}
      >

        <Text
          style={styles.text}
        >
          EDGEFACE LIVE
        </Text>

      </View>

    </View>
  );
}

const styles =
  StyleSheet.create({

    container: {

      flex: 1,

      backgroundColor:
        '#000',
    },

    center: {

      flex: 1,

      justifyContent:
        'center',

      alignItems:
        'center',

      backgroundColor:
        '#020b1a',
    },

    loading: {

      marginTop: 20,

      color: '#ffffff',

      fontSize: 18,
    },

    overlay: {

      position:
        'absolute',

      top: 60,

      alignSelf:
        'center',

      paddingHorizontal: 20,

      paddingVertical: 12,

      borderRadius: 20,

      backgroundColor:
        'rgba(0,0,0,0.6)',
    },

    text: {

      color: '#00ff99',

      fontSize: 20,

      fontWeight: '700',
    },
  });