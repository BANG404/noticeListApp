import { Slot } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import { NativeBaseProvider } from "native-base";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import "./app.css";

// 保持启动屏幕可见
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // 在应用准备就绪后隐藏启动屏幕
    SplashScreen.hideAsync();
  }, []);

  return (

      <AuthProvider>
        <NativeBaseProvider>
          <Slot />
        </NativeBaseProvider>

      </AuthProvider>

  );
}
