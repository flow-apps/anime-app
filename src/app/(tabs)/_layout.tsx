import { usePersistedState } from "@/hooks/usePersistedState";
import {
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_700Bold,
  useFonts,
} from "@expo-google-fonts/fredoka";
import Feather from "@react-native-vector-icons/feather";
import { SplashScreen, Tabs } from "expo-router";
import FastTranslator from "fast-mlkit-translate-text";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { useTheme } from "tamagui";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const [theme, setTheme] = usePersistedState<"light" | "dark">(
    "theme",
    useColorScheme() as "dark" | "light",
  );

  const { bg, shape, textColor } = useTheme();

  const [loaded, error] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        await Promise.all([
          FastTranslator.prepare({
            source: "Japanese",
            target: "Portuguese",
            downloadIfNeeded: true,
          }),
          FastTranslator.prepare({
            source: "Japanese",
            target: "English",
            downloadIfNeeded: true,
          }),
          FastTranslator.prepare({
            source: "English",
            target: "Portuguese",
            downloadIfNeeded: true,
          }),
        ]);
      } catch (e) {
        console.error("Failed to prepare translator", e);
      } finally {
        if (loaded || error) {
          SplashScreen.hide();
        }
      }
    }
    prepare();
  }, [loaded, error]);

  if (!loaded && !error) return null;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#e63945",
        tabBarInactiveTintColor: textColor.val,
        headerStyle: {
          backgroundColor: theme === "light" ? "#fff" : "#0a121d",
        },
        headerTitleStyle: {
          color: theme === "light" ? "#000" : "#fff",
          fontFamily: "Fredoka_400Regular",
        },
        tabBarStyle: {
          backgroundColor: shape.val,
        },
        headerBackButtonDisplayMode: "minimal",
        tabBarShowLabel: false,
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "AnimeApp",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explorer"
        options={{
          title: "Explorar",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="compass" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="heart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Configuração",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="settings" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
