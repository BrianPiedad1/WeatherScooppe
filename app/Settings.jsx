import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";

export default function Settings() {
  const router = useRouter();

  const [darkTheme, setDarkTheme] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");

  const handleLogout = () => {
    Alert.alert("👋 Logged Out", "You have been logged out successfully.");
    router.replace("/"); 
  };

  const handleHelp = () => {
    Alert.alert(
      "📖 Help & Support",
      "For help, contact us at support@weatherscooppe.com"
    );
  };

  return (
    <>
      {/* ✅ Hide Expo Router's default header */}
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Back */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Home</Text>
        </TouchableOpacity>

        <Text style={styles.title}>⚙️ Settings</Text>

        <View style={styles.card}>
          {/* Profile */}
          <TouchableOpacity
            style={styles.option}
            onPress={() => router.push("/Profile")}
          >
            <Text style={styles.optionText}>👤 Profile</Text>
          </TouchableOpacity>

          {/* Change Theme */}
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>🎨 Change Theme</Text>
            <Switch value={darkTheme} onValueChange={setDarkTheme} />
          </View>

          {/* Notifications */}
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>🔔 Notifications</Text>
            <Switch value={notifications} onValueChange={setNotifications} />
          </View>

          {/* Language */}
          <TouchableOpacity
            style={styles.option}
            onPress={() =>
              Alert.alert("🌐 Language", "Choose Language", [
                { text: "English", onPress: () => setLanguage("English") },
                { text: "Filipino", onPress: () => setLanguage("Filipino") },
                { text: "Spanish", onPress: () => setLanguage("Spanish") },
                { text: "Cancel", style: "cancel" },
              ])
            }
          >
            <Text style={styles.optionText}>🌐 Language ({language})</Text>
          </TouchableOpacity>

          {/* Help & Support */}
          <TouchableOpacity style={styles.option} onPress={handleHelp}>
            <Text style={styles.optionText}>❓ Help & Support</Text>
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>🚪 Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#EAF6FF",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backBtn: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: "#050505ff",
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#00509E",
    textAlign: "center",
    width: "100%",
  },
  card: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  option: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  optionText: { fontSize: 16, color: "#333" },
  logoutBtn: {
    marginTop: 20,
    backgroundColor: "#E63946",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
