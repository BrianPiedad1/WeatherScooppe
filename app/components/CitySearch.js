import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function CitySearch({ onSearch }) {
  const [city, setCity] = useState("");
  const { language, translations } = useLanguage();
  const t = translations[language];
  const { darkTheme } = useTheme();

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: darkTheme ? "#2C2C2C" : "#fff", color: darkTheme ? "#fff" : "#000" },
        ]}
        placeholder={t.enterCity}
        placeholderTextColor={darkTheme ? "#aaa" : "#777"}
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.button} onPress={() => onSearch(city)}>
        <Text style={styles.buttonText}>{t.search || "Search"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginBottom: 20 },
  input: {
    flex: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
  },
  button: {
    backgroundColor: "#00A6FB",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
