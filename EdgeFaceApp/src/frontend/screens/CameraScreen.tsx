import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert, Linking, StyleSheet,
  Text, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Camera, useCameraDevice, useCameraFormat,
  useCameraPermission, useFrameProcessor,
} from 'react-native-vision-camera';
import { useFaceDetector } from 'react-native-vision-camera-face-detector';
import { Worklets } from 'react-native-worklets-core';

import { CAMERA_CONFIG } from '../../config/cameraConfig';
import { parseFaces } from '../../services/detectionService';
import { usePipeline } from '../../hooks/usePipeline';
import { FaceBox } from '../../ui/overlays/FaceBox';
import { GuideFrame } from '../../ui/overlays/GuideFrame';
import { QualityOverlay } from '../../ui/overlays/QualityOverlay';
import { StatusBanner } from '../../ui/status/StatusBanner';
import { UnknownUserModal } from '../../ui/modals/UnknownUserModal';
import { UnknownUserAction } from '../../types/unknown';
import { DetectedFace } from '../../types/face';
import { logEvent } from '../../services/auditService';

export default function CameraScreen() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice(CAMERA_CONFIG.position);
  const format = useCameraFormat(device, [
    { fps: 30 },
    { videoResolution: { width: 720, height: 1280 } },
  ]);
  const { pipelineState, processFrame, reset } = usePipeline();
  const [faces, setFaces] = useState<DetectedFace[]>([]);
  const [unknownVisible, setUnknownVisible] = useState(false);
  const [frameDims, setFrameDims] = useState({ width: 1080, height: 1920 });

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission]);

  useEffect(() => {
    setUnknownVisible(pipelineState.authState === 'UNKNOWN_USER');
  }, [pipelineState.authState]);

  const { detectFaces } = useFaceDetector({
    performanceMode: 'fast',
    landmarkMode: 'all',
    classificationMode: 'all',
    trackingEnabled: true,
    minFaceSize: CAMERA_CONFIG.faceDetection.minFaceSize,
  });

  const handleFacesJS = Worklets.createRunOnJS((rawFaces: any[]) => {
    const parsed = parseFaces(rawFaces);
    setFaces(parsed);
    processFrame(parsed);
  });

  const handleFrameDims = Worklets.createRunOnJS((w: number, h: number) => {
    setFrameDims(prev => (prev.width === w && prev.height === h ? prev : { width: w, height: h }));
  });

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const detected = detectFaces(frame);
    handleFacesJS(detected);
    handleFrameDims(frame.width, frame.height);
  }, [handleFacesJS, handleFrameDims]);

  const handleUnknownAction = useCallback((action: UnknownUserAction) => {
    setUnknownVisible(false);
    if (action === 'ENROLL_TEMP') {
      logEvent('ENROLLMENT_START', { metadata: { type: 'TEMP' } });
      Alert.alert('Enrollment', 'Temporary enrollment started. Pending supervisor approval.');
    } else if (action === 'VISITOR_MODE') {
      logEvent('ENROLLMENT_START', { metadata: { type: 'VISITOR' } });
      Alert.alert('Visitor Mode', 'Visitor access granted.');
    } else {
      logEvent('AUTH_FAIL', { metadata: { reason: 'DENIED' } });
    }
    setTimeout(reset, 2000);
  }, [reset]);

  if (!hasPermission) return (
    <View style={s.centered}>
      <Text style={s.permText}>Camera permission required</Text>
      <TouchableOpacity style={s.btn} onPress={requestPermission}>
        <Text style={s.btnText}>Grant Permission</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[s.btn, { marginTop: 8 }]} onPress={() => Linking.openSettings()}>
        <Text style={s.btnText}>Open Settings</Text>
      </TouchableOpacity>
    </View>
  );

  if (!device) return (
    <View style={s.centered}>
      <Text style={s.permText}>No camera found</Text>
    </View>
  );

  const { authState, statusMessage, quality, livenessChallenge,
    livenesChallengeInstruction, livenessProgress, recognition, faceCount } = pipelineState;

  return (
    <SafeAreaView style={s.root}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive
        format={format}
        frameProcessor={frameProcessor}
      />

      <GuideFrame authState={authState} />
      <FaceBox
        faces={faces}
        authState={authState}
        frameWidth={frameDims.width}
        frameHeight={frameDims.height}
      />
      {quality && <QualityOverlay quality={quality} />}

      <View style={s.topHud}>
        <View style={s.badge}>
          <Text style={s.badgeText}>NHAI EdgeFace</Text>
        </View>
        {faceCount > 0 && (
          <View style={s.faceTag}>
            <Text style={s.faceTagText}>{faceCount} face{faceCount > 1 ? 's' : ''}</Text>
          </View>
        )}
      </View>

      {authState === 'LIVENESS_CHALLENGE' && livenessChallenge && (
        <View style={s.livenessBox}>
          <Text style={s.livenessEmoji}>
            {livenessChallenge === 'BLINK' ? '👁️'
              : livenessChallenge === 'SMILE' ? '😊'
              : livenessChallenge === 'TURN_LEFT' ? '⬅️' : '➡️'}
          </Text>
          <Text style={s.livenessText}>{livenesChallengeInstruction}</Text>
          <View style={s.progressBar}>
            <View style={[s.progressFill, { width: `${livenessProgress * 100}%` }]} />
          </View>
        </View>
      )}

      <View style={s.bottomHud}>
        <StatusBanner
          authState={authState}
          message={statusMessage}
          workerName={recognition?.matched ? recognition.workerName : undefined}
        />
        {(authState === 'AUTHENTICATED' || authState === 'REJECTED') && (
          <TouchableOpacity style={s.resetBtn} onPress={reset}>
            <Text style={s.resetText}>Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>

      <UnknownUserModal visible={unknownVisible} onAction={handleUnknownAction} />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  centered: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', padding: 24 },
  permText: { color: '#FFF', fontSize: 18, marginBottom: 16, textAlign: 'center' },
  btn: { backgroundColor: '#0A84FF', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 },
  btnText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  topHud: { position: 'absolute', top: 16, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
  badge: { backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  badgeText: { color: '#FFF', fontWeight: '700', fontSize: 13 },
  faceTag: { backgroundColor: 'rgba(10,132,255,0.8)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  faceTagText: { color: '#FFF', fontWeight: '600', fontSize: 12 },
  livenessBox: { position: 'absolute', bottom: 160, left: 0, right: 0, alignItems: 'center' },
  livenessEmoji: { fontSize: 40, marginBottom: 6 },
  livenessText: { color: '#FFD60A', fontSize: 18, fontWeight: '700', marginBottom: 10 },
  progressBar: { width: 160, height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#FFD60A', borderRadius: 3 },
  bottomHud: { position: 'absolute', bottom: 40, left: 0, right: 0, alignItems: 'center', gap: 12 },
  resetBtn: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  resetText: { color: '#FFF', fontWeight: '600', fontSize: 15 },
});