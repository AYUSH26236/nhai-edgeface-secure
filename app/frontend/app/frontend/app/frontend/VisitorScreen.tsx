import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

export default function VisitorScreen() {
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");

  const handleSaveVisitor = () => {
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

    console.log("Visitor log saved:", visitorLog);

    Alert.alert("Visitor saved", "Visitor log added to local queue.");

    setName("");
    setPurpose("");
  };

  return (
    <View style={styles.container}>
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

      <TouchableOpacity style={styles.button} onPress={handleSaveVisitor}>
        <Text style={styles.buttonText}>Save Visitor Log</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        This MVP stores visitor data as a local mock object. Real database and
        sync queue integration will be added after folder cleanup.
      </Text>
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
  input: {
    backgroundColor: "#1E293B",
    color: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#334155"
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700"
  },
  note: {
    color: "#94A3B8",
    marginTop: 18,
    lineHeight: 20
  }
});