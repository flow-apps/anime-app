import { RootState } from "@/redux/store";
import { Fredoka_400Regular } from "@expo-google-fonts/fredoka";
import Feather from "@react-native-vector-icons/feather";
import { Tabs } from "expo-router";
import { useSelector } from "react-redux";
import { useTheme } from "tamagui";

export default function TabLayout() {
  const { theme_name } = useSelector((state: RootState) => state.configs);

  const { shape, textColor } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#e63945",
        tabBarInactiveTintColor: textColor.val,
        headerStyle: {
          backgroundColor: theme_name === "light" ? "#fff" : "#0a121d",
        },
        headerTitleStyle: {
          color: theme_name === "light" ? "#000" : "#fff",
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
          title: "Bem-vindo",
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
