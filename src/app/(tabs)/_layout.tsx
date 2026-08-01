import { RootState } from "@/redux/store";
import Feather from "@react-native-vector-icons/feather";
import { router, Tabs } from "expo-router";
import { useSelector } from "react-redux";
import { useTheme } from "tamagui";

import * as Notifications from "expo-notifications";
import { useEffect } from "react";

function useNotificationObserver() {
  useEffect(() => {
    function redirect(notification: Notifications.Notification) {
      const animeId = notification.request.content.data?.animeId;
      if (animeId) {
        router.push(`/anime/${animeId}`);
      }
    }

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        redirect(response.notification);
      },
    );

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (response) {
        redirect(response.notification);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);
}

export default function TabLayout() {
  const { theme_name } = useSelector((state: RootState) => state.configs);

  const { shape, textColor } = useTheme();
  useNotificationObserver();

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
