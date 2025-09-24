import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { auth, db } from "../firebaseConfig";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";

export default function Profile() {
  const router = useRouter();
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);

  // Extra fields
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Show / Hide toggles
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // 🌐 Language (default English)
  const [language, setLanguage] = useState("English");

  // Load user info
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setName(user.displayName || "");
        setEmail(user.email || "");
        setPhoto(user.photoURL || null);

        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setBio(data.bio || "");
            setPhone(data.phone || "");
            setBirthday(data.birthday || "");
            setGender(data.gender || "");
            setLanguage(data.language || "English");
          }
        } catch (error) {
          console.log("Firestore fetch error:", error.message);
        }
      }
    };

    fetchUserData();
  }, [user]);

  // Pick image from gallery
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (err) {
      console.log("Image pick error:", err);
      Alert.alert("❌ Error", "Could not pick image");
    }
  };

  // Save profile
  const handleSave = async () => {
    try {
      if (!user) return;

      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      if (email !== user.email) {
        await updateEmail(user, email);
      }

      await setDoc(
        doc(db, "users", user.uid),
        { bio, phone, birthday, gender, language },
        { merge: true }
      );

      Alert.alert("✅ Saved", "Your profile has been updated!");
    } catch (error) {
      console.log("Save error:", error);
      Alert.alert("❌ Error", error.message);
    }
  };

  // Change password
  const handleChangePassword = async () => {
    if (!user) return;
    if (!newPassword || !confirmPassword) {
      Alert.alert("⚠️ Error", "Please fill both password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("⚠️ Error", "Passwords do not match");
      return;
    }
    try {
      await updatePassword(user, newPassword);
      Alert.alert("✅ Success", "Password updated!");
      setNewPassword("");
      setConfirmPassword("");
      setShowNewPass(false);
      setShowConfirmPass(false);
    } catch (error) {
      console.log("Password change error:", error);
      Alert.alert("❌ Error", error.message);
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    Alert.alert("⚠️ Confirm", "Are you sure you want to delete your account?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteUser(user);
            Alert.alert("✅ Account deleted");
            router.replace("/Signup");
          } catch (error) {
            console.log("Delete user error:", error);
            Alert.alert("❌ Error", error.message);
          }
        },
      },
    ]);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {/* ✅ Back icon only (no full header) */}
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            {/* Profile Picture */}
            <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>+</Text>
                </View>
              )}
            </TouchableOpacity>
            <Text style={styles.smallText}>Tap to change photo</Text>

            {/* Name */}
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Full Name"
            />

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Email"
            />

            {/* Bio */}
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: "top" }]}
              value={bio}
              onChangeText={setBio}
              placeholder="Bio"
              multiline
            />

            {/* Phone */}
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="Phone"
            />

            {/* Birthday */}
            <Text style={styles.label}>Birthday</Text>
            <TextInput
              style={styles.input}
              value={birthday}
              onChangeText={setBirthday}
              placeholder="YYYY-MM-DD"
            />

            {/* Gender */}
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              value={gender}
              onChangeText={setGender}
              placeholder="Gender"
            />

            {/* Save button */}
            <TouchableOpacity
              style={[styles.saveBtn, styles.fullInput]}
              onPress={handleSave}
            >
              <Text style={styles.saveText}>💾 Save Changes</Text>
            </TouchableOpacity>

            {/* Change Password */}
            <Text style={[styles.label, { marginTop: 20 }]}>New Password</Text>
            <View style={[styles.passwordWrapper, styles.fullInput]}>
              <TextInput
                style={styles.passwordInput}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPass}
                placeholder="New Password"
              />
              <TouchableOpacity
                onPress={() => setShowNewPass((s) => !s)}
                style={styles.eyeBtn}
              >
                <Text style={styles.eye}>{showNewPass ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirm Password</Text>
            <View style={[styles.passwordWrapper, styles.fullInput]}>
              <TextInput
                style={styles.passwordInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPass}
                placeholder="Confirm Password"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPass((s) => !s)}
                style={styles.eyeBtn}
              >
                <Text style={styles.eye}>
                  {showConfirmPass ? "🙈" : "👁️"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.saveBtn, styles.fullInput]}
              onPress={handleChangePassword}
            >
              <Text style={styles.saveText}>🔑 Change Password</Text>
            </TouchableOpacity>

            {/* Delete Account */}
            <TouchableOpacity
              style={[
                styles.saveBtn,
                styles.fullInput,
                { backgroundColor: "#B00020" },
              ]}
              onPress={handleDeleteAccount}
            >
              <Text style={styles.saveText}>🗑 Delete Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAF6FF" },
  backBtn: { margin: 15, alignSelf: "flex-start" },
  backText: { fontSize: 22, color: "#00509E", fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },
  avatarWrapper: { marginBottom: 10 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 32, color: "#555" },
  smallText: { fontSize: 12, color: "#777", marginBottom: 20 },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#00509E",
    alignSelf: "flex-start",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
    width: "100%",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 8,
    marginBottom: 15,
    backgroundColor: "#F9F9F9",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 6,
    fontSize: 16,
  },
  eyeBtn: { padding: 8 },
  eye: { fontSize: 18 },
  saveBtn: {
    backgroundColor: "#00A6FB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  fullInput: { width: "100%" },
});
