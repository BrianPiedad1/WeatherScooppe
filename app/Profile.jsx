  import { Stack } from "expo-router";
  import React, { useState, useEffect } from "react";
  import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    ActivityIndicator,
  } from "react-native";
  import { useRouter } from "expo-router";
  import { auth, db, storage } from "../firebaseConfig";
  import { updateProfile, updateEmail } from "firebase/auth";
  import { doc, getDoc, setDoc } from "firebase/firestore";
  import * as ImagePicker from "expo-image-picker";
  import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
  import { Ionicons } from "@expo/vector-icons";
  import Toast from "react-native-toast-message";
  import { useTheme } from "./context/ThemeContext";
  import { useLanguage } from "./context/LanguageContext";

  export default function Profile() {
    const router = useRouter();
    const user = auth.currentUser;

    const { darkTheme } = useTheme();
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState(null);
    const [bio, setBio] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [saving, setSaving] = useState(false);

    // 🧠 Load user info
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
            }
          } catch (error) {
            console.log("Firestore fetch error:", error.message);
          }
        }
      };
      fetchUserData();
    }, [user]);

    // 🖼 Pick image
    const pickImage = async () => {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
        if (!result.canceled) {
          setPhoto(result.assets[0].uri);
        }
      } catch (error) {
        console.log("Image pick error:", error);
        Toast.show({
          type: "error",
          text1: "Error picking image",
        });
      }
    };

    // ☁️ Upload photo to Firebase Storage
    const uploadPhotoAsync = async (uri) => {
      if (!uri) return null;

      try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `profilePhotos/${user.uid}.jpg`);
        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      } catch (error) {
        console.log("Upload error:", error);
        Toast.show({ type: "error", text1: "Upload failed" });
        return null;
      }
    };

    // 💾 Save all profile changes
    const handleSave = async () => {
      if (!user) {
        Toast.show({ type: "error", text1: "No user logged in" });
        return;
      }

      setSaving(true);

      try {
        let photoURL = user.photoURL;

        // Upload image if a new one was selected
        if (photo && !photo.startsWith("https://")) {
          photoURL = await uploadPhotoAsync(photo);
        }

        // Update Firebase Auth
        await updateProfile(user, { displayName: name, photoURL });
        if (email && email !== user.email) {
          await updateEmail(user, email);
        }

        // Save to Firestore
        await setDoc(
          doc(db, "users", user.uid),
          { name, email, bio, phone, birthday, gender, photoURL },
          { merge: true }
        );

        Toast.show({
          type: "success",
          text1: "Profile updated successfully 🎉",
        });

        setSaving(false);
        router.push("/Home");
      } catch (error) {
        console.log("Save error:", error);
        Toast.show({
          type: "error",
          text1: "Save failed",
          text2: error.message,
        });
        setSaving(false);
      }
    };

    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View
          style={[
            styles.container,
            { backgroundColor: darkTheme ? "#121212" : "#EAF6FF" },
          ]}
        >
          <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
            {/* 🔙 Back button */}
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Ionicons
                name="arrow-back-outline"
                size={26}
                color={darkTheme ? "#fff" : "#05080aff"}
              />
            </TouchableOpacity>

            <View
              style={[
                styles.card,
                { backgroundColor: darkTheme ? "#1E1E1E" : "#4282a0ff"},
              ]}
            >
              {/* 🖼 Profile Picture */}
              <View style={styles.avatarContainer}>
                <Image
                  source={{
                    uri:
                      photo ||
                      "https://cdn-icons-png.flaticon.com/512/847/847969.png",
                  }}
                  style={styles.avatar}
                />
                <TouchableOpacity
                  style={styles.cameraButton}
                  onPress={pickImage}
                >
                  <Ionicons name="camera-outline" size={20} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* 👤 Inputs */}
              <View style={{ width: "100%" }}>
                <Text style={[styles.label, { color: darkTheme ? "#fff" : "#00509E" }]}>Full Name</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: darkTheme ? "#2C2C2C" : "#F9F9F9", color: darkTheme ? "#fff" : "#000" }]}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                />

                <Text style={[styles.label, { color: darkTheme ? "#fff" : "#00509E" }]}>Email</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: darkTheme ? "#2C2C2C" : "#F9F9F9", color: darkTheme ? "#fff" : "#000" }]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter email"
                />

                <Text style={[styles.label, { color: darkTheme ? "#fff" : "#00509E" }]}>Bio</Text>
                <TextInput
                  style={[styles.input, { height: 80, textAlignVertical: "top", backgroundColor: darkTheme ? "#2C2C2C" : "#F9F9F9", color: darkTheme ? "#fff" : "#000" }]}
                  value={bio}
                  onChangeText={setBio}
                  multiline
                  placeholder="Write something about yourself"
                />

                <Text style={[styles.label, { color: darkTheme ? "#fff" : "#00509E" }]}>Phone</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: darkTheme ? "#2C2C2C" : "#F9F9F9", color: darkTheme ? "#fff" : "#000" }]}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Phone number"
                />

                <Text style={[styles.label, { color: darkTheme ? "#fff" : "#00509E" }]}>Birthday</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: darkTheme ? "#2C2C2C" : "#F9F9F9", color: darkTheme ? "#fff" : "#000" }]}
                  value={birthday}
                  onChangeText={setBirthday}
                  placeholder="YYYY-MM-DD"
                />

                <Text style={[styles.label, { color: darkTheme ? "#fff" : "#00509E" }]}>Gender</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: darkTheme ? "#2C2C2C" : "#F9F9F9", color: darkTheme ? "#fff" : "#000" }]}
                  value={gender}
                  onChangeText={setGender}
                  placeholder="Enter gender"
                />

                {/* 💾 Save Button */}
                <TouchableOpacity
                  style={[styles.saveBtn, styles.fullInput]}
                  onPress={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.saveText}>💾 Save Changes</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
        <Toast />
      </>
    );
  }

  const styles = StyleSheet.create({
    container: { flex: 1 },
    backBtn: { margin: 15, alignSelf: "flex-start" },
    card: {
      margin: 20,
      padding: 20,
      borderRadius: 15,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
      alignItems: "center",
    },
    avatarContainer: { position: "relative", marginBottom: 10 },
    avatar: {
      width: 110,
      height: 110,
      borderRadius: 55,
      backgroundColor: "#00509E",
    },
    cameraButton: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: "#050607ff",
      borderRadius: 20,
      width: 38,
      height: 38,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: "#fff",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      padding: 12,
      marginBottom: 15,
      fontSize: 16,
      width: "100%",
    },
    label: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
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
