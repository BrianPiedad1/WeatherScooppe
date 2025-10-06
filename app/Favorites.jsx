import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Image, // ✅ Added to fix the “Failed to construct Image” error
} from "react-native";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "./context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function Favorites() {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { darkTheme } = useTheme();

  const API_KEY = "85f2aa5933a583d68ef3d389b1d04051";

  // 🌤️ Load favorites and fetch weather
  useEffect(() => {
    loadFavorites();

    // ⏱️ Auto-refresh every 15 minutes
    const interval = setInterval(() => {
      console.log("🔄 Auto-refreshing favorite cities...");
      loadFavorites();
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // 🔁 Load saved favorites
  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem("favoriteCities");
      if (stored) {
        const parsed = JSON.parse(stored);
        setFavorites(parsed);
        await fetchWeatherForFavorites(parsed);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.log("Error loading favorites:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // 🌦️ Fetch weather for each favorite city
  const fetchWeatherForFavorites = async (cities) => {
    const results = {};
    for (const city of cities) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        if (data.cod === 200) {
          results[city] = {
            temp: Math.round(data.main.temp),
            icon: data.weather[0].icon,
            condition: data.weather[0].main,
          };
        } else {
          results[city] = { error: true };
        }
      } catch {
        results[city] = { error: true };
      }
    }
    setWeatherData(results);
  };

  // ❌ Remove a favorite city
  const removeFavorite = async (city) => {
    const updated = favorites.filter((c) => c !== city);
    await AsyncStorage.setItem("favoriteCities", JSON.stringify(updated));
    setFavorites(updated);
    const updatedWeather = { ...weatherData };
    delete updatedWeather[city];
    setWeatherData(updatedWeather);
  };

  // 🧭 Navigate to full weather screen
  const goToCity = (city) => {
    router.push({ pathname: "/Home", params: { city } });
  };

  // 🌤️ Weather icon URL
  const getIconUrl = (icon) =>
    `https://openweathermap.org/img/wn/${icon || "01d"}@2x.png`;

  // 🔄 Manual pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadFavorites();
  }, []);

  // ⏳ Loading screen
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#00A6FB" />
      </View>
    );
  }

  // 🧩 Main UI
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={[
          styles.container,
          { backgroundColor: darkTheme ? "#121212" : "#EAF6FF" },
        ]}
      >
        {/* 🔙 Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color={darkTheme ? "#fff" : "#00509E"}
          />
          <Text
            style={[styles.backText, { color: darkTheme ? "#fff" : "#00509E" }]}
          >
            Back
          </Text>
        </TouchableOpacity>

        {/* ⭐ Title */}
        <Text
          style={[styles.title, { color: darkTheme ? "#fff" : "#00509E" }]}
        >
          ⭐ Favorite Cities
        </Text>

        {/* 🌆 City List */}
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#00A6FB"
              />
            }
            renderItem={({ item }) => {
              const cityData = weatherData[item];
              return (
                <View
                  style={[
                    styles.card,
                    { backgroundColor: darkTheme ? "#1E1E1E" : "#fff" },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.cityRow}
                    onPress={() => goToCity(item)}
                  >
                    <Text
                      style={[
                        styles.cityName,
                        { color: darkTheme ? "#fff" : "#00509E" },
                      ]}
                    >
                      🌆 {item}
                    </Text>

                    {cityData ? (
                      cityData.error ? (
                        <Text
                          style={[
                            styles.tempText,
                            { color: darkTheme ? "#ccc" : "#666" },
                          ]}
                        >
                          ⚠️ Error
                        </Text>
                      ) : (
                        <View style={styles.weatherInfo}>
                          <Text
                            style={[
                              styles.tempText,
                              { color: darkTheme ? "#fff" : "#333" },
                            ]}
                          >
                            {cityData.temp}°C {cityData.condition}
                          </Text>
                          <Image
                            source={{ uri: getIconUrl(cityData.icon) }}
                            style={{ width: 40, height: 40 }}
                          />
                        </View>
                      )
                    ) : (
                      <ActivityIndicator size="small" color="#00A6FB" />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => removeFavorite(item)}>
                    <Text style={styles.removeText}>❌</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        ) : (
          <Text
            style={[
              styles.emptyText,
              { color: darkTheme ? "#aaa" : "#333" },
            ]}
          >
            You have no favorite cities yet.
          </Text>
        )}
      </View>
    </>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  backText: { fontSize: 18, fontWeight: "bold", marginLeft: 6 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cityRow: { flexDirection: "row", alignItems: "center" },
  cityName: { fontSize: 18, fontWeight: "600", marginRight: 10 },
  tempText: { fontSize: 16, marginRight: 5 },
  weatherInfo: { flexDirection: "row", alignItems: "center" },
  removeText: { fontSize: 18, color: "#B00020" },
  emptyText: { fontSize: 16, textAlign: "center", marginTop: 50 },
});
