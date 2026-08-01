import Constants from "expo-constants";

import { api } from "@/services/api";
import { IAnimeNotification } from "@/types";
import { TopAnimeItem } from "@/types/top";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import { Platform } from "react-native";

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

interface INotificationData {
  title: string;
  body: string;
  data: any;
  trigger: Notifications.NotificationTriggerInput;
}

async function schedulePushNotification(notificationData: INotificationData) {
  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: notificationData.title,
      body: notificationData.body,
      data: notificationData.data,
    },
    trigger: notificationData.trigger,
  });

  return identifier;
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("anime_update", {
      name: "Atualizações de Animes",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }

  try {
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      throw new Error("Project ID not found");
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;
    console.log(token);
  } catch (e) {
    token = `${e}`;
  }

  return token;
}

async function handleReceivedNotification(
  notification: Notifications.Notification,
) {
  const animeId = notification.request.content.data?.animeId as number;

  if (!animeId) return;

  try {
    const { data: animeResponse } = await api.get<{ data: TopAnimeItem }>(
      `/anime/${animeId}/full`,
    );
    const anime = animeResponse.data;

    const storedNotifications = await AsyncStorage.getItem(
      "anime_notifications",
    );
    const notifications: IAnimeNotification[] = storedNotifications
      ? JSON.parse(storedNotifications)
      : [];

    if (anime?.airing) {
      const { trigger } = notification.request;
      if (
        trigger &&
        typeof trigger === "object" &&
        "type" in trigger &&
        trigger.type === "date"
      ) {
        const dateTrigger = trigger as Notifications.DateTriggerInput;
        const nextTriggerDate = dayjs(dateTrigger.date).add(1, "week").toDate();

        const newIdentifier = await schedulePushNotification({
          title: `Novo episódio de '${anime.title_english || anime.title}'`,
          body: "Um novo episódio está disponível! Toque para assistir.",
          trigger: {
            date: nextTriggerDate,
            type: Notifications.SchedulableTriggerInputTypes.DATE,
          },
          data: {
            animeId: anime.mal_id,
          },
        });

        const notificationIndex = notifications.findIndex(
          (n) => n.anime.mal_id === animeId,
        );
        if (notificationIndex > -1) {
          notifications[notificationIndex].identifier = newIdentifier;
          await AsyncStorage.setItem(
            "anime_notifications",
            JSON.stringify(notifications),
          );
        }
      }
    } else if (storedNotifications) {
      const updatedNotifications = notifications.filter(
        (n) => n.anime.mal_id !== animeId,
      );
      await AsyncStorage.setItem(
        "anime_notifications",
        JSON.stringify(updatedNotifications),
      );
    }
  } catch (error) {
    console.error(
      "Failed to process received notification in background:",
      error,
    );
  }
}

TaskManager.defineTask(
  BACKGROUND_NOTIFICATION_TASK,
  async ({ data, error }) => {
    if (error) {
      console.error("TaskManager error:", error);
      return;
    }
    if (data) {
      const notification = (
        data as {
          notification: Notifications.Notification;
        }
      ).notification;
      await handleReceivedNotification(notification);
    }
  },
);

export async function registerBackgroundNotificationTask() {
  await Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
}

export function setupForegroundNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
      await handleReceivedNotification(notification);

      return {
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      };
    },
  });
}

export { registerForPushNotificationsAsync, schedulePushNotification };
