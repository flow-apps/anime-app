import { Container } from "@/components/Container";
import SwitchInput from "@/components/SwitchInput";
import { usePersistedState } from "@/hooks/usePersistedState";
import React from "react";
import { useColorScheme } from "react-native";
import Toast from "react-native-simple-toast";

const SettingsScreen: React.FC = () => {
  const [themeName, setThemeName] = usePersistedState<"dark" | "light">(
    "theme",
    useColorScheme(),
  );
  const [translate, setTranslate] = usePersistedState<boolean>(
    "translate_text",
    true,
  );

  return (
    <Container style={{ padding: 10 }}>
      <SwitchInput
        label="Modo Escuro"
        currentValue={themeName === "dark"}
        onSwitch={(isDark: boolean) => {
          setThemeName(isDark ? "dark" : "light");
          Toast.show("Reinicie o app para aplicar", Toast.SHORT);
        }}
      />
      <SwitchInput
        label="Traduzir textos (experimental)"
        currentValue={translate}
        onSwitch={(translate: boolean) => {
          setTranslate(translate);
        }}
      />
    </Container>
  );
};

export default SettingsScreen;
