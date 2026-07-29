import { MainStack } from "@/components/MainStack";
import { ThemeProvider } from "@/components/ThemeProvider";
import { persistor, store } from "@/redux/store";
import {
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_700Bold,
  useFonts,
} from "@expo-google-fonts/fredoka";
import * as Device from "expo-device";
import { SplashScreen } from "expo-router";
import * as Updates from "expo-updates";
import FastTranslator from "fast-mlkit-translate-text";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

SplashScreen.preventAutoHideAsync();

export default function StackLayout() {
  const [loaded, error] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_700Bold,
  });

  useEffect(() => {
    async function updateApp() {
      if (!__DEV__ && Device.isDevice) {
        try {
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
          }
        } catch (error) {
          console.error(`Error fetching latest update: ${error}`);
        }
      }
    }

    async function prepare() {
      try {
        await Promise.all([
          updateApp(),
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
          SplashScreen.hideAsync();
        }
      }
    }
    prepare();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <MainStack />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
