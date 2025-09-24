import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";

export default function WeatherResult({ weather, loading }) {
  if (loading) {
    return <ActivityIndicator size="large" color="#00A6FB" />;
  }

  if (!weather) {
    return null;
  }

  // OpenWeather icon URL
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

  return (
    <View style={styles.container}>
      {/* Weather Icon */}
      <Image source={{ uri: iconUrl }} style={styles.icon} />

      {/* Weather Info */}
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
      <Text style={styles.description}>
        {weather.weather[0].description.charAt(0).toUpperCase() +
          weather.weather[0].description.slice(1)}
      </Text>
      <Text style={styles.details}>💨 {weather.wind.speed} m/s</Text>
      <Text style={styles.details}>💧 {weather.main.humidity}% Humidity</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 20,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  city: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00509E",
  },
  temp: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 10,
    textTransform: "capitalize",
  },
  details: {
    fontSize: 16,
    color: "#555",
  },
});