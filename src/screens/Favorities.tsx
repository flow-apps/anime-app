import Loading from "@/components/Loading";
import { usePersistedState } from "@/hooks/usePersistedState";
import { TopAnimeItem } from "@/types/top";
import { router, useFocusEffect } from "expo-router";
import { MotiView } from "moti";
import React, { useCallback, useMemo } from "react";
import { FlatList, ListRenderItem, TouchableOpacity } from "react-native";
import { Image, Paragraph, Text, View } from "tamagui";

const EmptyList = React.memo(() => (
  <View alignItems="center" flex={1} justifyContent="center" padding={12}>
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
));

interface FavoriteAnimeCardProps {
  item: TopAnimeItem;
  onPress: (id: number) => void;
}

const FavoriteAnimeCard: React.FC<FavoriteAnimeCardProps> = React.memo(
  ({ item, onPress }) => {
    const handlePress = useCallback(() => {
      onPress(item.mal_id);
    }, [onPress, item.mal_id]);

    return (
      <MotiView
        from={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "timing",
          duration: 350,
        }}
      >
        <TouchableOpacity
          onPress={handlePress}
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
      </MotiView>
    );
  },
);

const FavoritiesScreen: React.FC = () => {
  const [favorites, _, updated, reloadState] = usePersistedState<
    TopAnimeItem[]
  >("favorites", []);

  useFocusEffect(
    useCallback(() => {
      reloadState();
    }, [reloadState]),
  );

  const handleOpenAnime = useCallback((id: string | number) => {
    router.navigate({
      pathname: "/anime/[id]",
      params: { id },
    });
  }, []);

  const sortedFavorites = useMemo(
    () =>
      [...favorites].sort((a, b) =>
        (a.title_english || a.title).localeCompare(b.title_english || b.title),
      ),
    [favorites],
  );

  const renderItem: ListRenderItem<TopAnimeItem> = useCallback(
    ({ item }) => {
      return <FavoriteAnimeCard item={item} onPress={handleOpenAnime} />;
    },
    [handleOpenAnime],
  );

  if (!updated) return <Loading />;

  return (
    <View flex={1} backgroundColor="$bg" alignItems="center">
      <FlatList
        data={sortedFavorites}
        keyExtractor={({ mal_id }) => mal_id.toString()}
        numColumns={2}
        contentContainerStyle={{
          justifyContent: favorites.length > 0 ? "center" : "flex-start",
          width: "100%",
          flexGrow: 1,
          paddingTop: 20,
        }}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyList />}
        windowSize={10}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
      />
    </View>
  );
};

export default FavoritiesScreen;
