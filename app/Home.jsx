import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CitySearch from "./components/CitySearch";
import WeatherResult from "./components/WeatherResult";
import { useTheme } from "./context/ThemeContext";
import { useLanguage } from "./context/LanguageContext";
import { checkSevereWeather, setupNotifications } from "./notifications";
import { registerBackgroundTask } from "./backgroundTasks";
import { sendTestNotification } from "./testNotification"; // ✅ separated cleanly

export default function Home() {
  const router = useRouter();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const API_KEY = "85f2aa5933a583d68ef3d389b1d04051";

  const { darkTheme } = useTheme();
  const { language, translations } = useLanguage();
  const t = translations[language];

  // 🧠 Load favorites from storage
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem("favoriteCities");
        if (stored) setFavorites(JSON.parse(stored));
      } catch (error) {
        console.log("Error loading favorites:", error);
      }
    };
    loadFavorites();
  }, []);

  // 🔔 Initialize Notifications + Background Alerts
  useEffect(() => {
    setupNotifications();
    registerBackgroundTask();
  }, []);

  // 💾 Save favorites
  const saveFavorites = async (updated) => {
    setFavorites(updated);
    await AsyncStorage.setItem("favoriteCities", JSON.stringify(updated));
  };

  // 🌦️ Fetch weather
  const fetchWeather = async (city) => {
    if (!city) {
      Alert.alert("⚠️", t.enterCity || "Enter City name");
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
        await checkSevereWeather(city);

        const condition = data.weather[0].main.toLowerCase();
        const severe = ["thunderstorm", "tornado", "squall", "extreme"];
        const alertCond = ["rain", "snow", "wind", "drizzle"];

        if (severe.some((w) => condition.includes(w))) {
          Alert.alert(
            "⛈️ Severe Weather Alert",
            `A severe ${condition} is happening in ${city}. Stay safe!`
          );
        } else if (alertCond.some((w) => condition.includes(w))) {
          Alert.alert(
            "🌧️ Weather Alert",
            `Expect ${condition} in ${city} today. Don’t forget your umbrella ☔`
          );
        }
      } else {
        Alert.alert("❌", t.cityNotFound || "City not found");
        setWeather(null);
      }
    } catch (error) {
      Alert.alert("❌", error.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // ⭐ Add Favorite
  const addFavorite = async () => {
    if (!weather) return Alert.alert("ℹ️", "Search a city first!");
    const city = weather.name;
    if (favorites.includes(city)) {
      Alert.alert("⭐", `${city} is already in your favorites`);
      return;
    }
    const updated = [...favorites, city];
    await saveFavorites(updated);
    Alert.alert("✅", `${city} added to favorites`);
  };

  // ❌ Remove Favorite
  const removeFavorite = async (city) => {
    const updated = favorites.filter((c) => c !== city);
    await saveFavorites(updated);
  };

  // 🖼️ Background Image
  const getBackgroundImage = () => {
    if (!weather) return "https://wallpaperaccess.com/full/1540049.jpg";
    const icon = weather.weather[0].icon;
    if (icon.includes("01"))
      return icon.includes("d")
        ? "https://i.ibb.co/ZL6zRkb/clear-day.jpg"
        : "https://i.ibb.co/vqYh0t1/clear-night.jpg";
    else if (["02", "03", "04"].some((k) => icon.includes(k)))
      return "https://i.ibb.co/5GzYv8K/cloudy.jpg";
    else if (icon.includes("09") || icon.includes("10"))
      return "https://i.ibb.co/7R0ZP9C/rain.jpg";
    else if (icon.includes("11"))
      return "https://i.ibb.co/3fGktZd/thunderstorm.jpg";
    else if (icon.includes("13"))
      return "https://i.ibb.co/FsZ0P8x/snow.jpg";
    else if (icon.includes("50"))
      return "https://i.ibb.co/j6f0xhp/mist.jpg";
    return "https://wallpaperaccess.com/full/1540049.jpg";
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={{ uri: getBackgroundImage() }}
        style={styles.background}
        resizeMode="cover"
      >
        <View
          style={[
            styles.overlay,
            { backgroundColor: darkTheme ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.3)" },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: "#fff" }]}>🌦️ WeatherScooppe</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => router.push("/Favorites")}>
                <Text style={[styles.settingsText, { color: "#fff", marginRight: 20 }]}>
                  ⭐
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/Settings")}>
                <Text style={[styles.settingsText, { color: "#fff" }]}>⚙️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Search */}
          <CitySearch onSearch={fetchWeather} />

          {/* Add Favorite */}
          {weather && (
            <TouchableOpacity style={styles.favoriteBtn} onPress={addFavorite}>
              <Text style={styles.favoriteText}>⭐ Add {weather.name} to Favorites</Text>
            </TouchableOpacity>
          )}

          {/* Favorites List */}
          {favorites.length > 0 && (
            <View style={styles.favContainer}>
              <Text style={styles.favTitle}>⭐ Favorite Cities</Text>
              <FlatList
                data={favorites}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <View style={styles.favItem}>
                    <TouchableOpacity onPress={() => fetchWeather(item)}>
                      <Text style={styles.favCity}>{item}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeFavorite(item)}>
                      <Text style={styles.removeBtn}>❌</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}

          {/* Weather Display */}
          <WeatherResult weather={weather} loading={loading} />

          {/* Test Notification Button */}
          <TouchableOpacity style={styles.testBtn} onPress={sendTestNotification}>
            <Text style={styles.testText}>Test Notification</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, padding: 40 },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  title: { fontSize: 35, fontWeight: "bold" },
  settingsText: { fontSize: 30, fontWeight: "bold" },
  favoriteBtn: {
    backgroundColor: "#00A6FB",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  favoriteText: { color: "#fff", fontWeight: "bold" },
  favContainer: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  favTitle: { fontWeight: "bold", fontSize: 18, marginBottom: 10 },
  favItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  favCity: { fontSize: 16 },
  removeBtn: { fontSize: 18, color: "#B00020" },
  testBtn: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  testText: { fontWeight: "bold", color: "#333" },
});
