import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import CitySearch from "./components/CitySearch";
import WeatherResult from "./components/WeatherResult";

export default function Home() {
  const router = useRouter();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "85f2aa5933a583d68ef3d389b1d04051";

  const fetchWeather = async (city) => {
    if (!city) {
      Alert.alert("⚠️ Please enter a city name");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        Alert.alert("❌ City not found");
        setWeather(null);
      }
    } catch (error) {
      Alert.alert("❌ Error fetching weather", error.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // 🌄 Choose background image based on weather
  const getBackgroundImage = () => {
    if (!weather) {
      return "https://wallpaperaccess.com/full/1540049.jpg"; // default
    }
    const icon = weather.weather[0].icon; // e.g. "01d", "10n"

    if (icon.includes("01")) {
      return icon.includes("d")
        ? "https://i.ibb.co/ZL6zRkb/clear-day.jpg" // ☀️ clear day
        : "https://i.ibb.co/vqYh0t1/clear-night.jpg"; // 🌙 clear night
    } else if (
      icon.includes("02") ||
      icon.includes("03") ||
      icon.includes("04")
    ) {
      return "https://i.ibb.co/5GzYv8K/cloudy.jpg"; // ☁️ cloudy
    } else if (icon.includes("09") || icon.includes("10")) {
      return "https://i.ibb.co/7R0ZP9C/rain.jpg"; // 🌧 rain
    } else if (icon.includes("11")) {
      return "https://i.ibb.co/3fGktZd/thunderstorm.jpg"; // ⛈ thunderstorm
    } else if (icon.includes("13")) {
      return "https://i.ibb.co/FsZ0P8x/snow.jpg"; // ❄️ snow
    } else if (icon.includes("50")) {
      return "https://i.ibb.co/j6f0xhp/mist.jpg"; // 🌫 mist
    }
    return "https://wallpaperaccess.com/full/1540049.jpg"; // fallback
  };

  return (
    <>
      {/* ✅ Remove Expo Router default header */}
      <Stack.Screen options={{ headerShown: false }} />

      <ImageBackground
        source={{ uri: getBackgroundImage() }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Top bar (custom header) */}
          <View style={styles.header}>
            <Text style={styles.title}>🌦️ WeatherScooppe</Text>
            <TouchableOpacity onPress={() => router.push("/Settings")}>
              <Text style={styles.settingsText}>⚙️</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <CitySearch onSearch={fetchWeather} />
          <WeatherResult weather={weather} loading={loading} />
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  settingsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
