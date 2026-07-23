import { TouchableOpacity } from "react-native";
import { styled, Text, View } from "tamagui";

export const Container = styled(View, {
  marginVertical: 20,
});
export const CategoryContainer = styled(View, {
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
});

export const Category = styled(TouchableOpacity, {
  width: "45%",
  height: 100,
  marginVertical: 10,
});
export const CategoryText = styled(Text, {
  fontFamily: "$heading",
  fontWeight: "$4",
  color: "#fff",
  fontSize: 20,
});
