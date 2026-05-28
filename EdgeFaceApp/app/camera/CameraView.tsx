import React, { useEffect, useState } from 'react';

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

import FaceBox from '../ui/FaceBox';

import { useFaceDetection } from '../detection/useFaceDetection';

import { useFaceQuality } from '../quality/useFaceQuality';

import { useLiveness } from '../liveness/useLiveness';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A',
  },

  fallback: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
  },

  text: {
    color: '#FFFFFF',
    marginTop: 12,
    fontSize: 16,
  },

  qualityPanel: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    backgroundColor: '#000000AA',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },

  qualityText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },

  scoreText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 4,
    textAlign: 'center',
  },

  readyBanner: {
    position: 'absolute',
    top: 90,
    alignSelf: 'center',
    backgroundColor: '#00FF88',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },

  readyText: {
    color: '#001B12',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 1,
  },

  livenessPanel: {
    position: 'absolute',
    top: 190,
    alignSelf: 'center',
    backgroundColor: '#1E293BEE',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#38BDF8',
  },

  livenessTitle: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
    textAlign: 'center',
  },

  livenessText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 6,
    fontWeight: '600',
    textAlign: 'center',
  },

  progressBarBackground: {
    width: 220,
    height: 10,
    backgroundColor: '#0F172A',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 14,
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 999,
  },

  verifiedText: {
    color: '#00FF88',
    fontWeight: '800',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default function CameraView(): React.JSX.Element {
  const device = useCameraDevice('front');

  const [hasPermission, setHasPermission] =
    useState(false);

  const { faces } = useFaceDetection();

  const quality = useFaceQuality(
    faces.length > 0 ? faces[0] : null,
  );

  const { liveness } = useLiveness();

  useEffect(() => {
    async function getPermission() {
      const permission =
        await Camera.requestCameraPermission();

      setHasPermission(
        permission === 'granted',
      );
    }

    getPermission();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>
          Camera permission denied
        </Text>
      </View>
    );
  }

  const isSimulatorFallback =
    device == null;

  const boxColor =
    quality?.score && quality.score >= 90
      ? '#00FF88'
      : quality?.score && quality.score >= 60
      ? '#FFD60A'
      : '#FF453A';

  const isReady =
    quality &&
    quality.score >= 90 &&
    quality.isCentered &&
    !quality.isTooLarge &&
    !quality.isTooSmall;

  return (
    <View style={styles.container}>
      {!isSimulatorFallback && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device!}
          isActive={true}
        />
      )}

      {isSimulatorFallback && (
        <View style={styles.fallback}>
          <ActivityIndicator
            size="large"
            color="#00FF88"
          />

          <Text style={styles.text}>
            Simulator Camera Mode
          </Text>
        </View>
      )}

      {faces.map((face, index) => (
        <FaceBox
          key={index}
          color={boxColor}
          x={face.bounds.x}
          y={face.bounds.y}
          width={face.bounds.width}
          height={face.bounds.height}
        />
      ))}

      {quality && (
        <View style={styles.qualityPanel}>
          <Text style={styles.qualityText}>
            {quality.message}
          </Text>

          <Text
            style={[
              styles.scoreText,
              { color: boxColor },
            ]}
          >
            Score: {quality.score}
          </Text>
        </View>
      )}

      {isReady && (
        <View style={styles.readyBanner}>
          <Text style={styles.readyText}>
            READY FOR AUTHENTICATION
          </Text>
        </View>
      )}

      {liveness && (
        <View style={styles.livenessPanel}>
          <Text style={styles.livenessTitle}>
            LIVENESS CHECK
          </Text>

          <Text style={styles.livenessText}>
            {liveness.instruction}
          </Text>

          <View
            style={
              styles.progressBarBackground
            }
          >
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${liveness.progress}%`,
                },
              ]}
            />
          </View>

          {liveness.verified && (
            <Text style={styles.verifiedText}>
              ✓ VERIFIED
            </Text>
          )}
        </View>
      )}
    </View>
  );
}