import { RootState } from "@/redux/store";
import Feather from "@react-native-vector-icons/feather";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useNavigation, useRouter } from "expo-router";
import { ColorValue, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const HeaderLeft = ({ tintColor }: { tintColor?: string | ColorValue }) => {
  const navigation = useNavigation();
  const router = useRouter();

  if (!navigation.canGoBack())
    return (
      <TouchableOpacity
        onPress={() => router.replace("/")}
        style={{ marginRight: 20 }}
      >
        <Feather name="arrow-left" size={24} color={tintColor} />
      </TouchableOpacity>
    );

  return (
    <TouchableOpacity onPress={navigation.goBack} style={{ marginRight: 20 }}>
      <Feather name="arrow-left" size={24} color={tintColor} />
    </TouchableOpacity>
  );
};

export const MainStack = () => {
  const { theme_name } = useSelector((state: RootState) => state.configs);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme_name === "light" ? "#fff" : "#0a121d",
        },
        headerTitleStyle: {
          color: theme_name === "light" ? "#000" : "#fff",
          fontFamily: "Fredoka_400Regular",
        },
        headerTintColor: theme_name === "light" ? "#000" : "#fff",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="anime/[id]"
        options={{
          headerTransparent: true,
          headerBackground: () => (
            <LinearGradient
              style={{ flex: 1 }}
              colors={[`#0a121d`, "#0a121d09"]}
            />
          ),
          headerLeft: ({ tintColor }) => <HeaderLeft tintColor={tintColor} />,
          headerStyle: {
            backgroundColor: "transparent",
          },
        }}
      />
    </Stack>
  );
};
