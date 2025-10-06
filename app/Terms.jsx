import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "./context/ThemeContext";
import { useLanguage } from "./context/LanguageContext";

export default function Terms() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const { darkTheme } = useTheme();
  const { language, translations } = useLanguage();
  const t = translations[language];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={[
          styles.container,
          { backgroundColor: darkTheme ? "#121212" : "#EAF6FF" },
        ]}
      >
        <Text style={[styles.title, { color: darkTheme ? "#fff" : "#00509E" }]}>
          {t.termsTitle}
        </Text>

        <ScrollView style={styles.scrollBox}>
          {/* App Definition */}
          <Text
            style={{
              color: darkTheme ? "#fff" : "#333",
              fontSize: 16,
              marginBottom: 15,
            }}
          >
            🌦️ <Text style={{ fontWeight: "bold" }}>WeatherScooppe</Text> is a
            mobile application that provides real-time weather forecasts,
            temperature updates, and personalized weather information. It is
            designed for students and general users to easily check accurate
            weather data in their city or any place around the world.
          </Text>

          {/* Terms Content (Custom Sentence) */}
          <Text style={{ color: darkTheme ? "#fff" : "#333", fontSize: 16 }}>
            By using WeatherScooppe, you agree to use the app responsibly and
            only for personal, non-commercial purposes. Weather data is provided
            by third-party services and may not always be 100% accurate. We are
            not liable for any decisions made based on the information provided
            in the app. Users must not attempt to misuse, copy, or distribute
            the app without permission. Continued use of the app means you
            accept these Terms and Conditions.
          </Text>
        </ScrollView>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#ccc" }]}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>{t.disagree}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#00A6FB" }]}
            onPress={() => {
              setAgreed(true);
              router.replace({ pathname: "/Signup", params: { agreed: true } });
            }}
          >
            <Text style={[styles.buttonText, { color: "#fff" }]}>
              {t.agree}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  scrollBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: { fontWeight: "bold", fontSize: 16 },
});
