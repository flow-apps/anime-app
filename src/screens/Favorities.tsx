import Loading from "@/components/Loading";
import { usePersistedState } from "@/hooks/usePersistedState";
import { TopAnimeItem } from "@/types/top";
import { router, useFocusEffect } from "expo-router";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Image, Paragraph, styled, Text, useTheme, View } from "tamagui";

const Container = styled(View, {
  backgroundColor: "$bg",
  flex: 1,
  paddingTop: 20,
});

const FavoritiesScreen: React.FC = () => {
  const [favorites, _, updated, reloadState] = usePersistedState<
    TopAnimeItem[]
  >("favorites", []);

  const { bg } = useTheme();

  useFocusEffect(() => {
    reloadState();
  });

  const handleOpenAnime = (id: string | number) => {
    router.navigate({
      pathname: "/anime/[id]",
      params: { id },
    });
  };

  if (!updated) return <Loading />;

  return (
    <Container>
      <FlatList
        data={favorites}
        keyExtractor={({ mal_id }) => mal_id.toString()}
        numColumns={2}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          backgroundColor: bg.val,
          flex: 1,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleOpenAnime(item.mal_id)}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
              marginHorizontal: 10,
            }}
          >
            <Image
              width={150}
              height={250}
              marginBottom={10}
              borderRadius={32}
              objectFit="cover"
              src={item.images.jpg.image_url}
            />
            <Text
              fontFamily="$body"
              fontWeight="$3"
              textAlign="center"
              color={"$textColor"}
              maxWidth={100}
              numberOfLines={2}
              height={40}
            >
              {item.title_english || item.title}
            </Text>
            <View>
              <Paragraph
                textAlign="center"
                fontFamily="$body"
                fontWeight="$1"
                color={"$grey"}
              >
                {item.year &&
                  item.duration &&
                  `${item.year} • ${item.episodes || 0} episódios`}
              </Paragraph>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View
            alignItems="center"
            flex={1}
            justifyContent="center"
            padding={12}
          >
            <Text
              color={"$textColor"}
              fontFamily={"$body"}
              fontWeight={"$2"}
              fontSize={18}
              textAlign="center"
            >
              Marque animes como favoritos para serem exibidos aqui
            </Text>
          </View>
        }
      />
    </Container>
  );
};

export default FavoritiesScreen;
