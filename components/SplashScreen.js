import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";

export default function SplashScreen({ onFinish }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Prevent the splash screen from auto-hiding
    SplashScreen.preventAutoHideAsync();

    // Set a timeout for the splash screen duration
    const timer = setTimeout(() => {
      setIsLoaded(true);
      onFinish(); // Notify the app to proceed to the main screen
    }, 3000); // Duration of the splash screen in milliseconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../assets/splash.gif")}
        style={{ width: 300, height: 300 }}
        onLoadEnd={() => SplashScreen.hideAsync()}
      />
    </View>
  );
}
