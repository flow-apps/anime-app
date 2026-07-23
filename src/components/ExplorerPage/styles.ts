import { FlatList } from "react-native";
import { Input, ScrollView, styled, View } from "tamagui";

export const Container = styled(View, {
  flex: 1,
  backgroundColor: "$bg",
  padding: 15,
});
export const ExplorerList = styled(FlatList, {});
export const ExplorerContainer = styled(ScrollView, {});
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
