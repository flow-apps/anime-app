import ImageSlider from "@coder-shubh/react-native-image-slider";
import { View, styled } from "tamagui";

export const Container = styled(View, {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: -15,
});

export const Slider = styled(ImageSlider, {});
