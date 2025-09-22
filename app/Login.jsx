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
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Log in Successful!");
      router.replace("/Home"); 
    } catch (error) {
      alert(error.message);
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
          placeholderTextColor="#0e0b0bff"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>

       <Text style={styles.orText}>
        Don’t you have an account yet?{" "}
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

  input: {
    backgroundColor: "#F1F5F9",
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