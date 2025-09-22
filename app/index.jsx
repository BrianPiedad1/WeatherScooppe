import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { auth } from "../firebaseConfig";   // ✅ make sure path is correct
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("⚠️ Please enter both email and password");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Login Successful!");
      router.replace("/Home");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("❌ No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        alert("❌ Incorrect password. Try again.");
      } else if (error.code === "auth/invalid-credential") {
        alert("❌ Invalid email or password. Please try again.");
      } else {
        alert(`Firebase Error: ${error.message}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftPanel}>
        <ImageBackground
          source={{
            uri: "https://th.bing.com/th/id/OIP.ifqBBndf-WKRnYD2foyzHAHaEK?w=333&h=187&c=7&r=0&o=7&pid=1.7&rm=3",
          }}
          style={styles.image}
        >
          <Text style={styles.logo}>🌥️WetherScooppe</Text>
          <Text style={styles.caption}>
            WeatherForecast,{"\n"}📅 Date/time (item.dt_txt)

🌡️ Temperature

🌥️ Description

🌬️ Feels like
          </Text>
        </ImageBackground>
      </View>

      <ScrollView contentContainerStyle={styles.rightPanel}>
        <Text style={styles.title}>Log in your Weather</Text>
        <Text style={styles.subtitle}>Welcome back! Please log in</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#777"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>
          Don’t you have an account?{" "}
          <Link href="/Signup" style={styles.signupLink}>
            Sign Up
          </Link>
        </Text>
      </ScrollView>
    </View>
  );
};

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
    backgroundColor: "#e7eb06ff",
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
  subtitle: { color: "#0a0808ff", marginBottom: 20 },

  input: {
    backgroundColor: "#f9f9f1ff",
    color: "#000",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  loginBtn: {
    backgroundColor: "#00A6FB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  orText: { color: "#555", textAlign: "center", marginBottom: 10 },
  signupLink: { color: "#00A6FB", fontWeight: "bold" },
});

export default Login;