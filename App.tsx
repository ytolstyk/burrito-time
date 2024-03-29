import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Router } from "./src/components/Router";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons, Entypo } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    SpaceMono: require("./assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
    ...Ionicons.font,
    ...Entypo.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <Router />;
}
