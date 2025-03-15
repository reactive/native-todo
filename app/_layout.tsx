import { AsyncBoundary, DataProvider } from "@data-client/react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <DataProvider><AsyncBoundary><Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Users", statusBarStyle:'dark' }} />
      <Stack.Screen name="[userId]" options={{ statusBarStyle:'dark' }} />
    </Stack></AsyncBoundary></DataProvider>
  );
}
