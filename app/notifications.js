// app/notifications.js
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform, Alert } from "react-native";

// ⚙️ Configure how notifications behave
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// 🧩 Setup notifications (called once in Home.jsx)
export async function setupNotifications() {
  try {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#00A6FB",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert("⚠️ Permission not granted for notifications.");
        return;
      }
    } else {
      console.log("⚠️ Notifications only supported on physical devices.");
    }
  } catch (error) {
    console.log("Notification setup error:", error);
  }
}

// 🌩️ Check city weather and send notifications if severe
export async function checkSevereWeather(city) {
  try {
    const API_KEY = "85f2aa5933a583d68ef3d389b1d04051";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod === 200) {
      const condition = data.weather[0].main.toLowerCase();
      const severe = ["thunderstorm", "tornado", "squall", "extreme"];
      const alertCond = ["rain", "snow", "wind", "drizzle"];

      if (severe.some((w) => condition.includes(w))) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "⛈️ Severe Weather Alert!",
            body: `A severe ${condition} is happening in ${city}. Stay safe indoors!`,
          },
          trigger: null,
        });
      } else if (alertCond.some((w) => condition.includes(w))) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "🌧️ Weather Alert",
            body: `Expect ${condition} in ${city} today. Don’t forget your umbrella! ☔`,
          },
          trigger: null,
        });
      }
    }
  } catch (error) {
    console.log("Notification check error:", error);
  }
}
