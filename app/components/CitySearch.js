import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

export default function CitySearch({ onSearch }) {
  const [city, setCity] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name..."
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={() => onSearch(city)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});
