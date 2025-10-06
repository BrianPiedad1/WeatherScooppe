import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
  Platform,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useTheme } from "./context/ThemeContext";
import { useLanguage } from "./context/LanguageContext";
import { auth } from "../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

// ✅ Import from app/notifications.js
import {
  registerForPushNotificationsAsync,
  scheduleDailyWeatherNotification,
} from "./notifications";

export default function Settings() {
  const router = useRouter();
  const { darkTheme, toggleTheme } = useTheme();
  const { language, setLanguage, translations } = useLanguage();
  const t = translations[language];
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      Alert.alert("👋", `${t.logout} successful!`);
      router.replace("/Login");
    } catch (error) {
      Alert.alert("❌", error.message);
    }
  };

  // ✅ Help page
  const handleHelp = () => {
    router.push("/Help");
  };

  // ✅ Language selector
  const handleLanguageChange = () => {
    Alert.alert(t.language, "Choose Language", [
      { text: "English", onPress: () => setLanguage("English") },
      { text: "Filipino", onPress: () => setLanguage("Filipino") },
      { text: "Spanish", onPress: () => setLanguage("Spanish") },
      { text: "Japanese", onPress: () => setLanguage("Japanese") },
      { text: t.cancel, style: "cancel" },
    ]);
  };

  // ✅ Notification toggle
  const toggleNotifications = async (value) => {
    setNotificationsEnabled(value);

    // ⚠️ Web fallback
    if (Platform.OS === "web") {
      Alert.alert(
        "⚠️",
        "Notifications are not supported on web. Please run this app on a mobile device (Expo Go or emulator)."
      );
      return;
    }

    if (value) {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        await scheduleDailyWeatherNotification("Cebu");

        await Notifications.scheduleNotificationAsync({
          content: {
            title: "🌦️ WeatherScooppe",
            body: "✅ Notifications enabled! Daily forecast will arrive at 7 AM.",
          },
          trigger: null,
        });
      }
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
      Alert.alert("🔕", "Notifications turned off");
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: darkTheme ? "#121212" : "#4282a0ff" },
        ]}
      >
        {/* ✅ Back Arrow Only */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons
            name="arrow-back-outline"
            size={26}
            color={darkTheme ? "#fff" : "#05080aff"}
          />
        </TouchableOpacity>

        {/* Title */}
        <Text style={[styles.title, { color: darkTheme ? "#fff" : "#05080aff" }]}>
          {t.settings}
        </Text>

        {/* Card */}
        <View
          style={[
            styles.card,
            { backgroundColor: darkTheme ? "#1E1E1E" : "#fff" },
          ]}
        >
          {/* Profile */}
          <TouchableOpacity
            style={[
              styles.option,
              { backgroundColor: darkTheme ? "#2C2C2C" : "#f9f9f9" },
            ]}
            onPress={() => router.push("/Profile")}
          >
            <Ionicons
              name="person-circle-outline"
              size={22}
              color={darkTheme ? "#fff" : "#333"}
            />
            <Text
              style={[styles.optionText, { color: darkTheme ? "#fff" : "#333" }]}
            >
              {t.profile}
            </Text>
          </TouchableOpacity>

          {/* Theme Toggle */}
          <View
            style={[
              styles.optionRow,
              { backgroundColor: darkTheme ? "#2C2C2C" : "#f9f9f9" },
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="moon-outline"
                size={22}
                color={darkTheme ? "#fff" : "#333"}
              />
              <Text
                style={[
                  styles.optionText,
                  { color: darkTheme ? "#fff" : "#333", marginLeft: 8 },
                ]}
              >
                {t.theme}
              </Text>
            </View>
            <Switch value={darkTheme} onValueChange={toggleTheme} />
          </View>

          {/* Notifications */}
          <View
            style={[
              styles.optionRow,
              { backgroundColor: darkTheme ? "#2C2C2C" : "#f9f9f9" },
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color={darkTheme ? "#fff" : "#333"}
              />
              <Text
                style={[
                  styles.optionText,
                  { color: darkTheme ? "#fff" : "#333", marginLeft: 8 },
                ]}
              >
                {t.notifications}
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
            />
          </View>

          {/* Language Picker */}
          <TouchableOpacity
            style={[
              styles.option,
              { backgroundColor: darkTheme ? "#2C2C2C" : "#f9f9f9" },
            ]}
            onPress={handleLanguageChange}
          >
            <Ionicons
              name="language-outline"
              size={22}
              color={darkTheme ? "#fff" : "#333"}
            />
            <Text
              style={[
                styles.optionText,
                { color: darkTheme ? "#fff" : "#333", marginLeft: 8 },
              ]}
            >
              {t.language} ({language})
            </Text>
          </TouchableOpacity>

          {/* Help */}
          <TouchableOpacity
            style={[
              styles.option,
              { backgroundColor: darkTheme ? "#2C2C2C" : "#f9f9f9" },
            ]}
            onPress={handleHelp}
          >
            <Ionicons
              name="help-circle-outline"
              size={22}
              color={darkTheme ? "#fff" : "#333"}
            />
            <Text
              style={[
                styles.optionText,
                { color: darkTheme ? "#fff" : "#333", marginLeft: 8 },
              ]}
            >
              {t.help}
            </Text>
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color="#fff" />
            <Text style={[styles.logoutText, { marginLeft: 8 }]}>{t.logout}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backBtn: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    width: "100%",
  },
  card: {
    width: "90%",
    maxWidth: 400,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  optionText: { fontSize: 16, marginLeft: 8 },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#E63946",
    paddingVertical: 15,
    borderRadius: 12,
  },
  logoutText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
