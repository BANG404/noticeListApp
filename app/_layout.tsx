import { Stack } from "expo-router/stack";
import { NativeBaseProvider } from "native-base";

export default function Layout() {
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
