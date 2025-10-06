import { Stack, Link, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useTheme } from "./context/ThemeContext";
import { useLanguage } from "./context/LanguageContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { darkTheme } = useTheme();
  const { language, translations } = useLanguage();
  const t = translations[language];

  const handleLogin = async () => {
    if (!email || !password) {
      alert("⚠️ " + t.fillFields);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ " + t.loginSuccess);
      router.replace("/Home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={{ uri: "https://wallpaperaccess.com/full/1540049.jpg" }}
        style={styles.background}
        resizeMode="cover"
      >
        <View
          style={[
            styles.overlay,
            { backgroundColor: darkTheme ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.4)" },
          ]}
        >
          <Text style={styles.logo}>🌦️ WeatherScooppe</Text>
          <View
            style={[
              styles.card,
              { backgroundColor: darkTheme ? "#333" : "rgba(205, 247, 22, 0.95)" },
            ]}
          >
            <Text style={[styles.title, { color: darkTheme ? "#fff" : "#00509E" }]}>
              {t.welcomeBack}
            </Text>
            <Text style={[styles.subtitle, { color: darkTheme ? "#aaa" : "#555" }]}>
              {t.loginSubtitle}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#777"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                placeholder={t.password}
                placeholderTextColor="#777"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={{ fontSize: 16 }}>{showPassword ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>{t.login}</Text>
            </TouchableOpacity>

            <Text style={styles.switchText}>
              {t.noAccount}{" "}
              <Link href="/Signup" style={styles.link}>
                {t.signUp}
              </Link>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  logo: { fontSize: 32, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  card: { padding: 40, width: "90%", borderRadius: 20, elevation: 6 },
  title: { fontSize: 40, fontWeight: "bold", marginBottom: 5 },
  subtitle: { marginBottom: 20 },
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
  button: {
    backgroundColor: "#00A6FB",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  switchText: { textAlign: "center" },
  link: { color: "#00A6FB", fontWeight: "bold" },
});

export default Login;
