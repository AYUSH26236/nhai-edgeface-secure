import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UnknownUserAction } from '../../types/unknown';

interface Props { visible: boolean; onAction: (a: UnknownUserAction) => void; }

export const UnknownUserModal: React.FC<Props> = ({ visible, onAction }) => (
  <Modal transparent animationType="slide" visible={visible}>
    <View style={s.overlay}>
      <View style={s.card}>
        <Text style={s.title}>Unknown User</Text>
        <Text style={s.sub}>Face not found in local database</Text>
        {([
          ['ENROLL_TEMP', 'Enroll as Temporary Worker', s.primary],
          ['VISITOR_MODE', 'Visitor Mode', s.secondary],
          ['DENY', 'Deny Access', s.danger],
        ] as [UnknownUserAction, string, object][]).map(([action, label, style]) => (
          <TouchableOpacity key={action} style={[s.btn, style]} onPress={() => onAction(action)}>
            <Text style={s.btnText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </Modal>
);

const s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'flex-end' },
  card: { backgroundColor: '#1C1C1E', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, gap: 12 },
  title: { color: '#FFF', fontSize: 22, fontWeight: '700' },
  sub: { color: '#8E8E93', fontSize: 14, marginBottom: 8 },
  btn: { paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  primary: { backgroundColor: '#0A84FF' },
  secondary: { backgroundColor: '#2C2C2E' },
  danger: { backgroundColor: '#3A1C1C' },
  btnText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
});