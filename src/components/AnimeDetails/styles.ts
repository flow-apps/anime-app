import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { H1, Image, Paragraph, styled, View } from "tamagui";
import { Container } from "../Container";

export const AnimeDetailsContainer = styled(Container, {});
export const AnimeBannerContainer = styled(LinearGradient, {});
export const AnimeBanner = styled(Image, {
  width: "100%",
  height: 600,
  objectFit: "cover",
  zIndex: -1,
});
export const AnimeInfosContainer = styled(View, {
  padding: 15,
  paddingHorizontal: 20,
  marginTop: -35,
});
export const AnimeTitle = styled(H1, {
  fontFamily: "$heading",
  fontWeight: 600,
  fontSize: 24,
  color: "$textColor",
  marginBottom: 5,
  height: 60,
});
export const AnimeInfosWrapper = styled(View, {
  flexDirection: "row",
});
export const AnimeInfos = styled(Paragraph, {
  fontFamily: "$body",
  fontWeight: 300,
  fontSize: 12,
  color: "$grey",
});

export const AnimeSynopsisContainer = styled(View, {
  marginTop: 20,
  position: "relative",
});

export const AnimeSynopsisFade = styled(LinearGradient, {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
});

export const AnimeFavoriteButtonContainer = styled(View, {
  flexDirection: "row",
  position: "absolute",
  right: 0,
  top: 60,
  marginHorizontal: 15,
});
export const AnimeFavoriteButton = styled(TouchableOpacity, {
  width: 60,
  height: 60,
  backgroundColor: "$shape",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
});
