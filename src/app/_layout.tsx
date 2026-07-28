import { MainStack } from "@/components/MainStack";
import { ThemeProvider } from "@/components/ThemeProvider";
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function StackLayout() {
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
