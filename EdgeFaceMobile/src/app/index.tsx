import { Link } from "expo-router";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
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
            Frontend flow for face detection, visitor entry, and sync status.
            AI recognition and liveness will be connected later.
          </Text>
        </View>

        <Link href="/visitor" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Visitor Entry</Text>
          </Pressable>
        </Link>

        <Link href="/sync" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Sync Pending Logs</Text>
          </Pressable>
        </Link>

        <Text style={styles.footer}>
          Person B module: frontend, visitor flow, and sync UI.
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
    borderColor: "#334155"
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
  }
});