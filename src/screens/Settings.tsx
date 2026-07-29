import { Container } from "@/components/Container";
import SwitchInput from "@/components/SwitchInput";
import { setConfig } from "@/redux/slices/configsSlice";
import { RootState } from "@/redux/store";
import React from "react";
import { Linking, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SizableText } from "tamagui";

const SettingsScreen: React.FC = () => {
  const { theme_name, adult_content, translate_text } = useSelector(
    (state: RootState) => state.configs,
  );
  const dispatch = useDispatch();
  const handlePrivacy = async () => {
    const canOpen = await Linking.canOpenURL(
      process.env.EXPO_PUBLIC_PRIVACY_URL!,
    );

    if (canOpen) {
      await Linking.openURL(process.env.EXPO_PUBLIC_PRIVACY_URL!);
    }
  };

  return (
    <Container style={{ padding: 10, paddingHorizontal: 25 }}>
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
      <TouchableOpacity onPress={handlePrivacy}>
        <SizableText
          color={"$textColor"}
          fontFamily="$body"
          fontWeight="$2"
          fontSize={16}
          marginVertical={10}
        >
          Políticas de Privacidade
        </SizableText>
      </TouchableOpacity>
    </Container>
  );
};

export default SettingsScreen;
