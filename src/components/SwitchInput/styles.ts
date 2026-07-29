import { Label, styled, View } from "tamagui";

export const Container = styled(View, {
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
});
export const SwitchLabel = styled(Label, {
  color: "$textColor",
  fontFamily: "$body",
  fontWeight: "$2",
  fontSize: 16,
});
