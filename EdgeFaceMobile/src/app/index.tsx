import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type VisitorLog = {
  id: string;
  name: string;
  vehicleNumber: string;
  purpose: string;
  timestamp: string;
  status: "QUEUED_FOR_SYNC";
};

type Screen = "home" | "visitor" | "sync" | "auth";

export default function HomeScreen() {
  const [screen, setScreen] = useState<Screen>("home");
  const [visitorName, setVisitorName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [purpose, setPurpose] = useState("");
  const [pendingLogs, setPendingLogs] = useState(0);
  const [visitorLogs, setVisitorLogs] = useState<VisitorLog[]>([]);
  const [authSteps, setAuthSteps] = useState<string[]>([]);

  const saveVisitor = () => {
    if (!visitorName.trim()) {
      Alert.alert("Missing name", "Please enter visitor name.");
      return;
    }

    const log: VisitorLog = {
      id: `visitor_${Date.now()}`,
      name: visitorName,
      vehicleNumber: vehicleNumber || "N/A",
      purpose: purpose || "Not specified",
      timestamp: new Date().toISOString(),
      status: "QUEUED_FOR_SYNC"
    };

    setPendingLogs((count) => count + 1);
    setVisitorLogs((logs) => [log, ...logs]);

    setVisitorName("");
    setVehicleNumber("");
    setPurpose("");

    Alert.alert("Saved", "Visitor log added to pending sync queue.");
  };

  const syncLogs = () => {
    setPendingLogs(0);
    Alert.alert("Sync complete", "All pending logs uploaded and purged locally.");
  };

  const runMockAuthentication = () => {
    setAuthSteps([
      "Face Detected ✅",
      "Quality Check Passed ✅",
      "Liveness Check Passed ✅",
      "Identity Matched ✅",
      "Attendance Marked ✅"
    ]);
  };

  if (screen === "auth") {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Face Authentication</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Mock EdgeFace Pipeline</Text>
          <Text style={styles.infoText}>
            This simulates the AI pipeline. Real BlazeFace detection, quality
            checks, liveness, and recognition modules will be connected later.
          </Text>
        </View>

        <Pressable style={styles.primaryButton} onPress={runMockAuthentication}>
          <Text style={styles.primaryButtonText}>Capture Face</Text>
        </Pressable>

        <View style={styles.logList}>
          {authSteps.length === 0 ? (
            <Text style={styles.infoText}>Waiting for face capture...</Text>
          ) : (
            authSteps.map((step, index) => (
              <View key={index} style={styles.logItem}>
                <Text style={styles.logName}>{step}</Text>
              </View>
            ))
          )}
        </View>

        <Pressable style={styles.secondaryButton} onPress={() => setScreen("home")}>
          <Text style={styles.secondaryButtonText}>Back to Home</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (screen === "visitor") {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Visitor Entry</Text>

        <TextInput
          style={styles.input}
          placeholder="Visitor name"
          placeholderTextColor="#94A3B8"
          value={visitorName}
          onChangeText={setVisitorName}
        />

        <TextInput
          style={styles.input}
          placeholder="Vehicle Number"
          placeholderTextColor="#94A3B8"
          value={vehicleNumber}
          onChangeText={setVehicleNumber}
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

        <Pressable style={styles.secondaryButton} onPress={() => setScreen("home")}>
          <Text style={styles.secondaryButtonText}>Back to Home</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (screen === "sync") {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Sync Status</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Pending Logs</Text>
          <Text style={styles.count}>{pendingLogs}</Text>
          <Text style={styles.infoText}>
            These logs are stored locally and will be uploaded when internet is
            available.
          </Text>

          <View style={styles.logList}>
            <Text style={styles.infoTitle}>Recent Visitor Logs</Text>

            {visitorLogs.length === 0 ? (
              <Text style={styles.infoText}>No visitor logs yet.</Text>
            ) : (
              visitorLogs.map((visitor) => (
                <View key={visitor.id} style={styles.logItem}>
                  <Text style={styles.logName}>{visitor.name}</Text>
                  <Text style={styles.logText}>
                    Vehicle: {visitor.vehicleNumber}
                  </Text>
                  <Text style={styles.logText}>
                    Purpose: {visitor.purpose}
                  </Text>
                  <Text style={styles.logText}>
                    Time: {new Date(visitor.timestamp).toLocaleTimeString()}
                  </Text>
                </View>
              ))
            )}
          </View>
        </View>

        <Pressable style={styles.primaryButton} onPress={syncLogs}>
          <Text style={styles.primaryButtonText}>Simulate Upload & Purge</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={() => setScreen("home")}>
          <Text style={styles.secondaryButtonText}>Back to Home</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>NHAI EdgeFace Secure</Text>
        <Text style={styles.subtitle}>
          Offline authentication MVP for DataLake 3.0
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Current MVP</Text>
          <Text style={styles.infoText}>
            Frontend flow for face authentication, visitor entry, and offline
            sync. Real AI recognition and liveness will be connected later.
          </Text>
        </View>

        <Pressable style={styles.primaryButton} onPress={() => setScreen("auth")}>
          <Text style={styles.primaryButtonText}>Face Authentication</Text>
        </Pressable>

        <Pressable style={styles.primaryButton} onPress={() => setScreen("visitor")}>
          <Text style={styles.primaryButtonText}>Visitor Entry</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={() => setScreen("sync")}>
          <Text style={styles.secondaryButtonText}>Sync Pending Logs</Text>
        </Pressable>

        <Text style={styles.footer}>
          Person B module: frontend, visitor flow, auth mock, and sync UI.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1120",
    justifyContent: "center",
    padding: 22
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: "#334155"
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
    marginBottom: 22
  },
  infoBox: {
    backgroundColor: "#020617",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#1E293B"
  },
  infoTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8
  },
  infoText: {
    color: "#CBD5E1",
    lineHeight: 20
  },
  count: {
    color: "#38BDF8",
    fontSize: 46,
    fontWeight: "900",
    marginVertical: 10
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
    marginBottom: 12
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700"
  },
  secondaryButton: {
    backgroundColor: "#1E293B",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 12
  },
  secondaryButtonText: {
    color: "#E5E7EB",
    fontSize: 15,
    fontWeight: "600"
  },
  footer: {
    color: "#94A3B8",
    marginTop: 18,
    textAlign: "center"
  },
  logList: {
    marginTop: 16
  },
  logItem: {
    backgroundColor: "#1E293B",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#334155"
  },
  logName: {
    color: "#FFFFFF",
    fontWeight: "700",
    marginBottom: 4
  },
  logText: {
    color: "#CBD5E1",
    fontSize: 13,
    marginBottom: 2
  }
});