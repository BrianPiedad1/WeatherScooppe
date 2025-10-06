import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function WeatherResult({ weather, loading }) {
  const { language, translations } = useLanguage();
  const t = translations[language];
  const { darkTheme } = useTheme();

  if (loading) {
    return <ActivityIndicator size="large" color="#00A6FB" style={{ marginTop: 20 }} />;
  }

  if (!weather) return null;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: darkTheme ? "rgba(30,30,30,0.8)" : "rgba(255,255,255,0.8)" },
      ]}
    >
      <Text style={[styles.city, { color: darkTheme ? "#fff" : "#333" }]}>
        {weather.name}, {weather.sys.country}
      </Text>
      <Text style={[styles.temp, { color: darkTheme ? "#fff" : "#333" }]}>
        {t.temperature || "Temperature"}: {Math.round(weather.main.temp)}°C
      </Text>
      <Text style={[styles.detail, { color: darkTheme ? "#fff" : "#333" }]}>
        {t.feelsLike || "Feels Like"}: {Math.round(weather.main.feels_like)}°C
      </Text>
      <Text style={[styles.detail, { color: darkTheme ? "#fff" : "#333" }]}>
        {t.humidity || "Humidity"}: {weather.main.humidity}%
      </Text>
      <Text style={[styles.detail, { color: darkTheme ? "#fff" : "#333" }]}>
        {t.conditions || "Conditions"}: {weather.weather[0].description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 40,
    padding: 50,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  city: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  temp: { fontSize: 20, fontWeight: "600", marginBottom: 5 },
  detail: { fontSize: 16, marginBottom: 3 },
});
