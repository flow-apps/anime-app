import { usePersistedState } from "@/hooks/usePersistedState";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";
import { config } from "../../tamagui.config";

export default function StackLayout() {
  const [theme, setTheme, updated] = usePersistedState<"light" | "dark">(
    "theme",
    useColorScheme(),
  );

  if (!updated) return null;

  return (
    <TamaguiProvider config={config} defaultTheme={theme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme === "light" ? "#fff" : "#0a121d",
          },
          headerTitleStyle: {
            color: theme === "light" ? "#000" : "#fff",
            fontFamily: "Fredoka_400Regular",
          },
          headerTintColor: theme === "light" ? "#000" : "#fff",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="anime/[id]"
          options={{
            headerTransparent: true,
            headerBackground: () => (
              <LinearGradient
                style={{ flex: 1 }}
                colors={[`#0a121d`, "#0a121d09"]}
              />
            ),
            headerStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
      </Stack>
    </TamaguiProvider>
  );
}
