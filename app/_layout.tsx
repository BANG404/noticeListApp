import { Stack } from "expo-router/stack";
import "./app.css";

export default function Layout() {
  // 定义主题色

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
