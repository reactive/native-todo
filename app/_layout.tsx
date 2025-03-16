import { AsyncBoundary, DataProvider } from "@data-client/react";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  return (
    <DataProvider>
      <AsyncBoundary fallback={<ActivityIndicator />}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerTitle: "Users", statusBarStyle: "dark" }}
          />
          <Stack.Screen name="[userId]" options={{ statusBarStyle: "dark" }} />
        </Stack>
      </AsyncBoundary>
    </DataProvider>
  );
}
