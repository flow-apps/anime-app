import Feather from "@react-native-vector-icons/feather";
import React, { useEffect } from "react";
import { Text, useTheme, View, YStack } from "tamagui";

interface CustomToastProps {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "error" | "info";
  duration?: number; // in milliseconds, defaults to 4000
  visible: boolean;
  onDismiss: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({
  id,
  title,
  description,
  type = "info",
  duration = 4000,
  visible,
  onDismiss,
}) => {
  const theme = useTheme();

  useEffect(() => {
    let timer: any;
    if (visible) {
      timer = setTimeout(() => {
        onDismiss();
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [visible, duration, onDismiss]);

  if (!visible) return null;

  let backgroundColor;
  let iconName;
  const iconColor = theme.white.val; // Icons are white for contrast

  switch (type) {
    case "success":
      backgroundColor = theme.shape.val;
      iconName = "check-circle";
      break;
    case "error":
      backgroundColor = theme.red.val;
      iconName = "x-circle";
      break;
    case "info":
    default:
      backgroundColor = theme.grey.val;
      iconName = "info";
      break;
  }

  return (
    <View
      key={id}
      backgroundColor={backgroundColor}
      borderRadius="$4"
      padding="$3"
      alignItems="flex-start"
      position="absolute"
      bottom={20}
      left={20}
      right={20}
      zIndex={9999}
    >
      <YStack>
        <Text color="$white" fontFamily="$body" fontWeight="$3" fontSize="$2">
          <Feather name={iconName as any} size={16} color={iconColor} /> {title}
        </Text>
        {description && (
          <Text
            color="$white"
            fontFamily="$body"
            fontWeight={"$2"}
            fontSize="$1"
          >
            {description}
          </Text>
        )}
      </YStack>
    </View>
  );
};

export default CustomToast;
