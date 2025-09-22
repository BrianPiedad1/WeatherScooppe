import React, { useState } from "react";
import { View, StyleSheet, Alert, Button, ImageBackground } from "react-native"; 
import { useRouter } from "expo-router"; // navigation

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

  // 👇 Logout handler
  const handleLogout = () => {
        // after logout, go back to index
    router.replace("/"); 
  };

  return (
    <ImageBackground
      source={{ uri: "https://wallpaperaccess.com/full/1540049.jpg" }} // example background
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <CitySearch onSearch={fetchWeather} />
        <WeatherResult weather={weather} loading={loading} />
        <View style={styles.logoutBtn}>
          <Button title="Logout" color="red" onPress={handleLogout} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.3)", // semi-transparent overlay for readability
  },
  logoutBtn: {
    marginTop: 20,
    alignSelf: "center",
  },
});
