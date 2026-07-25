import { TouchableOpacity } from "react-native";
import {
  Image,
  Paragraph,
  styled,
  Text,
  View,
} from "tamagui";


export const NewsWrapper = styled(View, {
  padding: 15,
  width: 300,
  marginRight: 15,
});
export const NewsImage = styled(Image, {
  borderRadius: 15,
  width: "100%",
  height: 400,
  objectFit: "cover",
});
export const NewsInfosWrapper = styled(View, {
  height: 180,
});
export const NewsTitle = styled(Text, {
  fontFamily: "$heading",
  fontSize: 16,
  fontWeight: "$3",
  color: "$textColor",
  marginVertical: 15,
});
export const NewsDescription = styled(Paragraph, {
  fontFamily: "$body",
  fontWeight: "$2",
  color: "$textColor",
});

export const NewsButton = styled(TouchableOpacity, {
  backgroundColor: "$red",
  alignItems: "center",
  padding: 10,
  marginVertical: 15,
  borderRadius: 12,
});
export const NewsButtonText = styled(Text, {
  color: "#fff",
  fontFamily: "$body",
  fontWeight: "$2",
});
