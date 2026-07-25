import { Anime } from "@/types/anime";
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
export const ExplorerList = styled(FlatList<Anime>, {
  flexWrap: "wrap",
});
export const ExplorerContainer = styled(View, {});
export const SearchContainer = styled(View, {
  flexDirection: "row",
});
export const SearchInput = styled(Input, {
  border: "none",
  backgroundColor: "$shape",
  fontFamily: "$body",
  fontWeight: "$2",
  fontSize: "$2",
  padding: 10,
  color: "$textColor",
  flex: 1,
  borderTopLeftRadius: 12,
  borderBottomLeftRadius: 12,
});

export const SearchButton = styled(TouchableOpacity, {
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "$red",
  paddingHorizontal: 20,
  borderTopRightRadius: 12,
  borderBottomRightRadius: 12,
});

export const ExplorerTitle = styled(H1, {
  fontFamily: "$heading",
  fontSize: 26,
  fontWeight: "$4",
  color: "$textColor",
});

export const SearchItemsContainer = styled(View, {});
