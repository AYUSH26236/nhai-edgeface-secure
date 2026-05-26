import { useState } from "react";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SyncScreen() {
  const [pendingCount, setPendingCount] = useState(3);
  const [message, setMessage] = useState("Mock queue has pending local logs.");

  const simulateSync = () => {
    setPendingCount(0);
    setMessage("Mock sync complete. Logs uploaded and purged locally.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sync Status</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Pending logs</Text>
        <Text style={styles.count}>{pendingCount}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={simulateSync}>
        <Text style={styles.primaryButtonText}>Simulate Upload & Purge</Text>
      </Pressable>

      <Link href="/" asChild>
        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Back to Home</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1120",
    padding: 22
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 24
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 18
  },
  label: {
    color: "#CBD5E1",
    fontSize: 15
  },
  count: {
    color: "#38BDF8",
    fontSize: 44,
    fontWeight: "900",
    marginVertical: 8
  },
  message: {
    color: "#94A3B8",
    lineHeight: 20
  },
  primaryButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700"
  },
  secondaryButton: {
    backgroundColor: "#1E293B",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155"
  },
  secondaryButtonText: {
    color: "#E5E7EB",
    fontWeight: "600"
  }
});