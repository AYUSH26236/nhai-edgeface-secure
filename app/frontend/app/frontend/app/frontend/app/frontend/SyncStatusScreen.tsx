import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  getPendingSyncItems,
  markAllAsSynced,
  purgeSyncedItems
} from "../storage/sync_queue/SyncQueue";

export default function SyncStatusScreen() {
  const [pendingCount, setPendingCount] = useState(getPendingSyncItems().length);
  const [lastMessage, setLastMessage] = useState("No sync attempted yet.");

  const refresh = () => {
    setPendingCount(getPendingSyncItems().length);
  };

  const simulateSync = () => {
    markAllAsSynced();
    const purged = purgeSyncedItems();
    setPendingCount(getPendingSyncItems().length);
    setLastMessage(`Mock sync complete. Purged ${purged} synced item(s).`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sync Status</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Pending items</Text>
        <Text style={styles.count}>{pendingCount}</Text>
        <Text style={styles.message}>{lastMessage}</Text>
      </View>

      <TouchableOpacity style={styles.secondaryButton} onPress={refresh}>
        <Text style={styles.secondaryButtonText}>Refresh Queue</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primaryButton} onPress={simulateSync}>
        <Text style={styles.buttonText}>Simulate Upload & Purge</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: "#0B1120"
  },
  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 22
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 18,
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
    fontSize: 42,
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
    alignItems: "center"
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700"
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
  }
});