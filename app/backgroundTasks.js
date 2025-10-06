// app/backgroundTasks.js
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkSevereWeather } from "./notifications";

const TASK_NAME = "WEATHER_ALERT_BACKGROUND_TASK";

// 🎯 Define the background task
TaskManager.defineTask(TASK_NAME, async () => {
  try {
    console.log("⏰ Running background weather check...");

    const stored = await AsyncStorage.getItem("favoriteCities");
    if (!stored) return BackgroundFetch.Result.NoData;

    const favorites = JSON.parse(stored);
    for (const city of favorites) {
      await checkSevereWeather(city);
    }

    return BackgroundFetch.Result.NewData;
  } catch (error) {
    console.log("❌ Background task error:", error);
    return BackgroundFetch.Result.Failed;
  }
});

// ⚙️ Register background fetch
export async function registerBackgroundTask() {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(TASK_NAME);
    if (!isRegistered) {
      await BackgroundFetch.registerTaskAsync(TASK_NAME, {
        minimumInterval: 3 * 60 * 60, // every 3 hours
        stopOnTerminate: false,
        startOnBoot: true,
      });
      console.log("✅ Background weather check registered");
    }
  } catch (error) {
    console.log("⚠️ Background task registration failed:", error);
  }
}
