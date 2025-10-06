import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";


export default function RootLayout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="Home" options={{ headerShown: false }} />
          <Stack.Screen name="Login" options={{ headerShown: false }} />
          <Stack.Screen name="Signup" options={{ headerShown: false }} />
          <Stack.Screen name="Profile" options={{ headerShown: false }} />
          <Stack.Screen name="Settings" options={{ headerShown: false }} />
          <Stack.Screen name="Terms" options={{ headerShown: false }} />
          <Stack.Screen name="Favorites" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </LanguageProvider>
    </ThemeProvider>
  );
}
