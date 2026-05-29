import { useState } from "react";
import { Link } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VisitorScreen() {
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");

  const saveVisitor = () => {
    if (!name.trim()) {
      Alert.alert("Missing name", "Please enter visitor name.");
      return;
    }

    const visitorLog = {
      id: `visitor_${Date.now()}`,
      name,
      purpose: purpose || "Not specified",
      timestamp: new Date().toISOString(),
      status: "QUEUED_FOR_SYNC"
    };

    console.log("Visitor log:", visitorLog);
    Alert.alert("Saved", "Visitor log queued for sync.");

    setName("");
    setPurpose("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Visitor Entry</Text>

      <TextInput
        style={styles.input}
        placeholder="Visitor name"
        placeholderTextColor="#94A3B8"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Purpose of visit"
        placeholderTextColor="#94A3B8"
        value={purpose}
        onChangeText={setPurpose}
      />

      <Pressable style={styles.primaryButton} onPress={saveVisitor}>
        <Text style={styles.primaryButtonText}>Save Visitor Log</Text>
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
  input: {
    backgroundColor: "#1E293B",
    color: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#334155"
  },
  primaryButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
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