// app/testNotification.js
import { Platform, Alert } from "react-native";
import * as Notifications from "expo-notifications";

// 🔔 Send a test notification
export async function sendTestNotification() {
  try {
    if (Platform.OS === "web") {
      // 💻 Web fallback
      console.log("🔔 Web test notification simulated.");
      alert("🌤️ WeatherScooppe Test\n\nYour notifications are working! 🔔");
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🌤️ WeatherScooppe Test",
        body: "Your alerts are working! 🔔",
        sound: "default",
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: null, // immediate
    });

    console.log("✅ Test notification sent successfully!");
  } catch (error) {
    console.log("❌ Error sending test notification:", error);
    Alert.alert("Error", "Unable to send test notification.");
  }
}
