import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // ✅ for back arrow
import { useTheme } from "./context/ThemeContext";
import { useLanguage } from "./context/LanguageContext";

export default function Help() {
  const router = useRouter();
  const { darkTheme } = useTheme();
  const { language, translations } = useLanguage();
  const t = translations[language];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: darkTheme ? "#121212" : "#EAF6FF" },
        ]}
      >
        {/* ✅ Back Arrow Only */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons
            name="arrow-back-outline"
            size={26}
            color={darkTheme ? "#fff" : "#00509E"}
          />
        </TouchableOpacity>

        {/* Title */}
        <Text style={[styles.title, { color: darkTheme ? "#fff" : "#00509E" }]}>
          {t.help}
        </Text>

        {/* FAQ Section */}
        <View
          style={[
            styles.card,
            { backgroundColor: darkTheme ? "#1E1E1E" : "#fff" },
          ]}
        >
          <Text
            style={[styles.sectionTitle, { color: darkTheme ? "#fff" : "#333" }]}
          >
            ❓ FAQs
          </Text>
          <Text style={[styles.faqText, { color: darkTheme ? "#ddd" : "#555" }]}>
            • How do I change the language? → Go to Settings → Language.{"\n\n"}
            • How do I switch to Dark Mode? → Go to Settings → Toggle Dark Theme.{"\n\n"}
            • Why is my city not found? → Double-check spelling or try another city nearby.{"\n\n"}
            • How do I reset my password? → Go to Profile → Change Password.
          </Text>
        </View>

        {/* Contact Options */}
        <View
          style={[
            styles.card,
            { backgroundColor: darkTheme ? "#1E1E1E" : "#fff" },
          ]}
        >
          <Text
            style={[styles.sectionTitle, { color: darkTheme ? "#fff" : "#333" }]}
          >
            📩 Contact Us
          </Text>

          {/* Email Support */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL("mailto:support@weatherscooppe.com")}
          >
            <Text style={styles.buttonText}>Email Support</Text>
          </TouchableOpacity>

          {/* Visit Help Website */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/HelpWebview")}
          >
            <Text style={styles.buttonText}>Visit Help Website</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View
          style={[
            styles.card,
            { backgroundColor: darkTheme ? "#1E1E1E" : "#fff" },
          ]}
        >
          <Text
            style={[styles.sectionTitle, { color: darkTheme ? "#fff" : "#333" }]}
          >
            ℹ️ App Info
          </Text>
          <Text style={[styles.faqText, { color: darkTheme ? "#ddd" : "#555" }]}>
            WeatherScooppe v1.0.0 {"\n"} © 2025 WeatherScooppe Inc.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  backBtn: {
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  card: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: { fontSize: 20, fontWeight: "600", marginBottom: 10 },
  faqText: { fontSize: 16, lineHeight: 22 },
  button: {
    backgroundColor: "#00A6FB",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
