import { Stack, Link, useRouter, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();

  // ✅ Update state when coming back from Terms.jsx
  useEffect(() => {
    if (params.agreed === "true") {
      setAgree(true);
    }
  }, [params]);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("⚠️ Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("⚠️ Error", "Passwords do not match");
      return;
    }

    if (!agree) {
      Alert.alert("⚠️ Agreement Required", "You must agree to the Terms & Conditions");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("🎉 Success", "Account created!");
      router.replace("/Home");
    } catch (error) {
      Alert.alert("Signup Failed", error.message);
    }
  };

  return (
    <>
      {/* ✅ Hide default header */}
      <Stack.Screen options={{ headerShown: false }} />

      <ImageBackground
        source={{ uri: "https://wallpaperaccess.com/full/1540049.jpg" }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.logo}>🌦️ WeatherScooppe</Text>

          <View style={styles.card}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Already have an account?{" "}
              <Link href="/Login" style={styles.link}>
                Log In
              </Link>
            </Text>

            {/* Email */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#777"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            {/* Password with Show/Hide */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                placeholder="Password"
                placeholderTextColor="#777"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={{ fontSize: 16 }}>
                  {showPassword ? "🙈" : "👁️"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Confirm Password with Show/Hide */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                placeholder="Confirm Password"
                placeholderTextColor="#777"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Text style={{ fontSize: 16 }}>
                  {showConfirmPassword ? "🙈" : "👁️"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Agree to Terms */}
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setAgree(!agree)}
            >
              <View style={[styles.checkbox, agree && styles.checkboxChecked]} />
              <Text style={styles.checkboxText}>
                I agree to the{" "}
                <Text style={styles.link} onPress={() => router.push("/Terms")}>
                  Terms & Conditions
                </Text>
              </Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[styles.button, !agree && { backgroundColor: "#ccc" }]}
              onPress={handleSignup}
              disabled={!agree}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "rgba(205, 247, 22, 0.95)",
    padding: 25,
    width: "90%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#00509E", marginBottom: 5 },
  subtitle: { color: "#555", marginBottom: 20 },
  input: {
    backgroundColor: "#F1F5F9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
    paddingRight: 10,
  },
  eyeButton: { padding: 5 },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#00A6FB",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#00A6FB",
  },
  checkboxText: {
    fontSize: 14,
    color: "#333",
    flexShrink: 1,
  },
  button: {
    backgroundColor: "#00A6FB",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  link: { color: "#00A6FB", fontWeight: "bold" },
});
