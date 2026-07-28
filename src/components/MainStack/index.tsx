import { RootState } from "@/redux/store";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { useSelector } from "react-redux";

export const MainStack = () => {
  const { theme_name } = useSelector((state: RootState) => state.configs);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme_name === "light" ? "#fff" : "#0a121d",
        },
        headerTitleStyle: {
          color: theme_name === "light" ? "#000" : "#fff",
          fontFamily: "Fredoka_400Regular",
        },
        headerTintColor: theme_name === "light" ? "#000" : "#fff",
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
  );
};
