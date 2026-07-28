import { Container } from "@/components/Container";
import SwitchInput from "@/components/SwitchInput";
import { setConfig } from "@/redux/slices/configsSlice";
import { RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const SettingsScreen: React.FC = () => {
  const { theme_name, adult_content, translate_text } = useSelector(
    (state: RootState) => state.configs,
  );
  const dispatch = useDispatch();

  return (
    <Container style={{ padding: 10 }}>
      <SwitchInput
        label="Modo Escuro"
        currentValue={theme_name === "dark"}
        onSwitch={(isDark: boolean) => {
          dispatch(
            setConfig({
              configName: "theme_name",
              value: isDark ? "dark" : "light",
            }),
          );
        }}
      />
      <SwitchInput
        label="Traduzir textos (experimental)"
        currentValue={translate_text}
        onSwitch={(translate: boolean) => {
          dispatch(
            setConfig({ configName: "translate_text", value: translate }),
          );
        }}
      />
      <SwitchInput
        label="Exibir conteúdo adulto"
        currentValue={adult_content}
        onSwitch={(adult: boolean) => {
          dispatch(setConfig({ configName: "adult_content", value: adult }));
        }}
      />
    </Container>
  );
};

export default SettingsScreen;
