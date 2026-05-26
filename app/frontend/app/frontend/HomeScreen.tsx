import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type HomeScreenProps = {
  onStartDetection?: () => void;
  onOpenVisitor?: () => void;
  onOpenSync?: () => void;
};

export default function HomeScreen({
  onStartDetection,
  onOpenVisitor,
  onOpenSync
}: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NHAI EdgeFace Secure</Text>
      <Text style={styles.subtitle}>Offline authentication MVP for DataLake 3.0</Text>

      <TouchableOpacity style={styles.primaryButton} onPress={onStartDetection}>
        <Text style={styles.buttonText}>Start Face Detection</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={onOpenVisitor}>
        <Text style={styles.secondaryButtonText}>Visitor Entry</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={onOpenSync}>
        <Text style={styles.secondaryButtonText}>Sync Pending Logs</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Person B module: frontend, visitor logs, and sync queue scaffold.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: "#0B1120",
    justifyContent: "center"
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 8
  },
  subtitle: {
    color: "#CBD5E1",
    fontSize: 15,
    marginBottom: 28
  },
  primaryButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16
  },
  secondaryButton: {
    backgroundColor: "#1E293B",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155"
  },
  secondaryButtonText: {
    color: "#E5E7EB",
    fontWeight: "600"
  },
  note: {
    color: "#94A3B8",
    marginTop: 22,
    textAlign: "center",
    lineHeight: 20
  }
});