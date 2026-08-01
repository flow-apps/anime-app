import React from "react";
import { AlertDialog, Button, Text, useTheme, XStack, YStack } from "tamagui";

interface CustomAlertButton {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
}

interface CustomAlertProps {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  message: string;
  buttons: CustomAlertButton[];
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  onDismiss,
  title,
  message,
  buttons,
}) => {
  const theme = useTheme();

  return (
    <AlertDialog open={visible} onOpenChange={onDismiss}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          opacity={0.7}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          backgroundColor={"#000000"}
        />
        <AlertDialog.Content
          key="content"
          enterStyle={{ opacity: 0, scale: 0.9 }}
          exitStyle={{ opacity: 0, scale: 0.9 }}
          x={0}
          scale={1}
          backgroundColor="$bg"
          padding="25"
          borderRadius={15}
          margin={15}
        >
          <YStack gap="$3" alignItems="center">
            <AlertDialog.Title
              fontFamily={"$heading"}
              fontWeight="$3"
              color="$textColor"
            >
              {title}
            </AlertDialog.Title>
            <AlertDialog.Description
              fontFamily={"$body"}
              fontWeight="$2"
              textAlign="center"
              color="$textColor"
            >
              {message}
            </AlertDialog.Description>
            <XStack gap="$3" marginTop="$4">
              {buttons.map((button, index) => {
                const buttonBgColor =
                  button.style === "destructive"
                    ? theme.red.val
                    : button.style === "cancel"
                      ? theme.grey.val
                      : theme.red.val;
                const buttonTextColor = theme.white.val;

                return (
                  <AlertDialog.Action asChild key={index}>
                    <Button
                      onPress={button.onPress}
                      backgroundColor={buttonBgColor}
                      color={buttonTextColor}
                      flex={1}
                      borderRadius={15}
                    >
                      <Text
                        color={buttonTextColor}
                        fontFamily={"$body"}
                        fontWeight="$2"
                      >
                        {button.text}
                      </Text>
                    </Button>
                  </AlertDialog.Action>
                );
              })}
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
};

export default CustomAlert;
