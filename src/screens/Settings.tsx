import { Container } from "@/components/Container";
import CustomAlert from "@/components/CustomAlert";
import CustomToast from "@/components/CustomToast";
import SwitchInput from "@/components/SwitchInput";
import { setConfig } from "@/redux/slices/configsSlice";
import { RootState } from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import React, { useCallback, useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SizableText } from "tamagui";

interface ToastState {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "error" | "info";
  duration?: number;
}

const SettingsScreen: React.FC = () => {
  const [
    isClearNotificationsAlertVisible,
    setIsClearNotificationsAlertVisible,
  ] = useState(false);
  const { theme_name, adult_content, translate_text } = useSelector(
    (state: RootState) => state.configs,
  );
  const dispatch = useDispatch();
  const [currentToast, setCurrentToast] = useState<ToastState | null>(null);

  const showCustomToast = useCallback((toastProps: Omit<ToastState, "id">) => {
    setCurrentToast({ ...toastProps, id: Date.now().toString() });
  }, []);

  const handlePrivacy = async () => {
    const canOpen = await Linking.canOpenURL(
      process.env.EXPO_PUBLIC_PRIVACY_URL!,
    );

    if (canOpen) {
      await Linking.openURL(process.env.EXPO_PUBLIC_PRIVACY_URL!);
    }
  };

  const handleClearNotifications = async () => {
    setIsClearNotificationsAlertVisible(true);
  };

  const confirmClearNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await AsyncStorage.removeItem("anime_notifications");
    showCustomToast({
      title: "Sucesso",
      description: "Todas as notificações agendadas foram limpas!",
      type: "success",
    });
    setIsClearNotificationsAlertVisible(false);
  };

  // ... (restante do seu componente)
  return (
    <View style={{ flex: 1 }}>
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
        <TouchableOpacity onPress={handleClearNotifications}>
          <SizableText
            color={"$red"}
            fontFamily="$body"
            fontWeight="$2"
            fontSize={16}
            marginVertical={10}
          >
            Limpar todas as notificações
          </SizableText>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePrivacy}>
          <SizableText
            color={"$textColor"}
            fontFamily="$body"
            fontWeight="$2"
            fontSize={16}
            marginVertical={10}
          >
            Política de Privacidade
          </SizableText>
        </TouchableOpacity>

        <CustomAlert
          visible={isClearNotificationsAlertVisible}
          onDismiss={() => setIsClearNotificationsAlertVisible(false)}
          title="Limpar Notificações"
          message="Tem certeza que deseja limpar todas as notificações? Você não receberá mais nenhuma notificação de novos episódios de animes que selecionou"
          buttons={[
            {
              text: "Cancelar",
              style: "cancel",
              onPress: () => setIsClearNotificationsAlertVisible(false),
            },
            {
              text: "Limpar",
              style: "destructive",
              onPress: confirmClearNotifications,
            },
          ]}
        />
        {/* Renderiza o CustomToast para cada toast ativo */}
      </Container>
      {currentToast && (
        <CustomToast
          id={currentToast.id}
          title={currentToast.title}
          description={currentToast.description}
          type={currentToast.type}
          duration={currentToast.duration}
          visible={true}
          onDismiss={() => setCurrentToast(null)}
        />
      )}
    </View>
  );
};

export default SettingsScreen;
