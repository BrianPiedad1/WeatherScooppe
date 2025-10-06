import React from "react";
import { View, Text, TouchableOpacity, Linking, Platform, StyleSheet, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { Stack } from "expo-router";

export default function HelpWebview() {
  const url = "https://weatherscooppe.com/help"; // change if needed

  // If running on Web, show fallback
  if (Platform.OS === "web") {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>WebView is not supported on Web.</Text>
        <TouchableOpacity onPress={() => Linking.openURL(url)} style={styles.fallbackButton}>
          <Text style={styles.fallbackButtonText}>Open Help Website</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // On Android/iOS → show WebView
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Help Website",
          headerBackTitle: "Back",
        }}
      />
      <WebView
        source={{ uri: url }}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator size="large" color="#00A6FB" style={styles.loader} />
        )}
        style={{ flex: 1 }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  fallbackText: { fontSize: 16, marginBottom: 20 },
  fallbackButton: {
    backgroundColor: "#00A6FB",
    padding: 12,
    borderRadius: 8,
  },
  fallbackButtonText: { color: "#fff", fontWeight: "bold" },
  loader: { flex: 1, justifyContent: "center" },
});
