import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Terms() {
  const router = useRouter();
  const [scrolledToEnd, setScrolledToEnd] = useState(false);

  // ✅ If content is short, unlock Agree automatically
  useEffect(() => {
    setTimeout(() => {
      setScrolledToEnd(true);
    }, 500);
  }, []);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    if (isBottom) setScrolledToEnd(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📜 Terms & Conditions</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Text style={styles.text}>
          Welcome to WeatherScooppe! By creating an account, you agree to the
          following Terms & Conditions:
        </Text>

        <Text style={styles.text}>
          1. You will use this app responsibly and not misuse the service.{"\n"}
          2. We do not guarantee 100% accurate weather information.{"\n"}
          3. Your account is your responsibility — keep your login safe.{"\n"}
          4. We may update these terms from time to time.{"\n"}
          5. By continuing, you agree to follow these rules.{"\n"}
        </Text>

        <Text style={styles.text}>
          Thank you for using WeatherScooppe 🌦 — enjoy checking your weather!
        </Text>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.footerBtn, { backgroundColor: "#999" }]}
          onPress={() => router.push("/Signup")}
        >
          <Text style={styles.footerText}>Disagree</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.footerBtn,
            !scrolledToEnd && { backgroundColor: "#ccc" },
          ]}
          disabled={!scrolledToEnd}
          onPress={() =>
            router.push({ pathname: "/Signup", params: { agreed: "true" } })
          }
        >
          <Text style={styles.footerText}>I Agree</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAF6FF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#00A6FB",
    elevation: 5,
  },
  backText: { fontSize: 22, color: "#fff", fontWeight: "bold" },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  scroll: { flex: 1 },
  content: { padding: 20 },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerBtn: {
    flex: 1,
    padding: 15,
    alignItems: "center",
  },
  footerText: { color: "#0a0909ff", fontSize: 16, fontWeight: "bold" },
});