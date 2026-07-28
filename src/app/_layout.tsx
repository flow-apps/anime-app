import { MainStack } from "@/components/MainStack";
import { ThemeProvider } from "@/components/ThemeProvider";
import { persistor, store } from "@/redux/store";
import * as Device from "expo-device";
import * as Updates from "expo-updates";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function StackLayout() {
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

    updateApp();
  }, []);
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
