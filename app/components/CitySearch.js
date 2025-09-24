import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CitySearch({ onSearch }) {
  const [city, setCity] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="🌍 Enter city name..."
        placeholderTextColor="#666"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.button} onPress={() => onSearch(city)}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#00A6FB",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});