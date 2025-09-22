import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function WeatherResult({ weather, loading }) {
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196f3" />
        <Text>Loading weather...</Text>
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={styles.center}>
        <Text>🔎 Search for a city to see the weather</Text>
      </View>
    );
  }

  return (
    <View style={styles.resultBox}>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temp}>{weather.main?.temp}°C</Text>
      <Text style={styles.desc}>{weather.weather?.[0]?.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    marginTop: 20,
  },
  resultBox: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#bbdefb",
    alignItems: "center",
    marginTop: 20,
  },
  city: {
    fontSize: 24,
    fontWeight: "bold",
  },
  temp: {
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 10,
  },
  desc: {
    fontSize: 18,
    fontStyle: "italic",
  },
});
