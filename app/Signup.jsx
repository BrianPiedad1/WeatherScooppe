import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link, useRouter } from "expo-router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      Alert.alert("🎉 Success", "Your account has been created!");
      // ✅ Automatically redirects to same page as login
      router.replace("/Home");  
    } catch (error) {
      Alert.alert("Signup Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftPanel}>
        <ImageBackground
          source={{
            uri: "https://wallpaperaccess.com/full/503224.jpg",
          }}
          style={styles.image}
        >
          <Text style={styles.logo}>🌦️ WeatherScooppe</Text>
          <Text style={styles.caption}>
            Weather Active,{"\n"}📅 Date/time (item.dt_txt)

🌡️ Temperature

🌥️ Description

🌬️ Feels like
          </Text>
        </ImageBackground>
      </View>

      <ScrollView contentContainerStyle={styles.rightPanel}>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>
          Already have an account?{" "}
          <Link href="/Login" style={styles.loginLink}>
            Log In
          </Link>
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#777"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", backgroundColor: "#EAF6FF" },

  leftPanel: { flex: 1, backgroundColor: "#000" },
  image: { flex: 1, justifyContent: "flex-end", padding: 20 },
  logo: {
    color: "#040704ff",
    fontSize: 34,
    fontWeight: "bold",
    position: "absolute",
    top: 50,
    left: 20,
  },
  caption: {
    color: "#040704ff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 40,
  },

  rightPanel: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 30,
    justifyContent: "center",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  title: { fontSize: 26, fontWeight: "bold", color: "#00509E", marginBottom: 8 },
  subtitle: { color: "#666", marginBottom: 20 },
  loginLink: { color: "#00A6FB", fontWeight: "bold" },

  input: {
    backgroundColor: "#F1F5F9",
    color: "#000",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  signupBtn: {
    backgroundColor: "#00A6FB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  signupText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});