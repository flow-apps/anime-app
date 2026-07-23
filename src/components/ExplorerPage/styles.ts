import { FlatList, TouchableOpacity } from "react-native";
import {
  H1,
  Image,
  Input,
  Paragraph,
  ScrollView,
  styled,
  Text,
  View,
} from "tamagui";

export const Container = styled(View, {
  flex: 1,
  backgroundColor: "$bg",
  padding: 15,
});
export const ExplorerList = styled(FlatList, {});
export const ExplorerContainer = styled(View, {});
export const SearchContainer = styled(View, {});
export const SearchInput = styled(Input, {
  border: "none",
  backgroundColor: "$shape",
  fontFamily: "$body",
  fontWeight: "$2",
  fontSize: "$2",
  padding: 10,
  borderRadius: 12,
});

export const ExplorerTitle = styled(H1, {
  fontFamily: "$heading",
  fontSize: 26,
  fontWeight: "$4",
  color: "$textColor",
});

export const NewsContainer = styled(ScrollView, {
  margin: 15,
});
export const NewsWrapper = styled(View, {
  backgroundColor: "$shape",
  borderRadius: 15,
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
