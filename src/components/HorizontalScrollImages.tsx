import { MotiView } from "moti";
import React, { useCallback } from "react";
import { FlatList, ListRenderItem, TouchableOpacity } from "react-native";
import { Image, Paragraph, SizableText, Text } from "tamagui";

interface IAnimesData {
  mal_id: number;
  image_url: string;
  name: string;
  release_date?: string | number | null;
  duration?: number | null;
}

interface IHorizontalAnimeScrollProps {
  title: string;
  animes: IAnimesData[];
  onPress: (mal_id: number) => any;
  onEndReached?: () => void;
  ListFooterComponent?: any;
}

interface IAnimeCardProps {
  anime: IAnimesData;
  onPress: (mal_id: number) => void;
}

const AnimeCard: React.FC<IAnimeCardProps> = React.memo(
  ({ anime, onPress }) => {
    const handlePress = useCallback(() => {
      onPress(anime.mal_id);
    }, [onPress, anime.mal_id]);

    return (
      <TouchableOpacity
        onPress={handlePress}
        style={{
          marginRight: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          width={150}
          height={250}
          marginBottom={10}
          borderRadius={32}
          objectFit="cover"
          src={anime.image_url}
          alt={anime.name}
        />
        <Text
          fontFamily="$body"
          fontWeight="$3"
          textAlign="center"
          color={"$textColor"}
          maxWidth={150}
          numberOfLines={2}
          height={40}
        >
          {anime.name}
        </Text>
        <Paragraph
          textAlign="center"
          fontFamily="$body"
          fontWeight="$1"
          color={"$grey"}
        >
          {anime.release_date &&
            `${anime.release_date} • ${anime.duration || 0} episódios`}
        </Paragraph>
      </TouchableOpacity>
    );
  },
);

const HorizontalAnimeScroll: React.FC<IHorizontalAnimeScrollProps> = ({
  animes,
  title,
  onPress,
  onEndReached,
  ListFooterComponent,
}) => {
  const renderItem: ListRenderItem<IAnimesData> = useCallback(
    ({ item: anime }) => {
      return <AnimeCard anime={anime} onPress={onPress} />;
    },
    [onPress],
  );

  return (
    <>
      <SizableText
        fontSize={26}
        fontFamily="$heading"
        fontWeight="$4"
        color={"$textColor"}
        marginVertical={15}
        paddingHorizontal={10}
      >
        {title}
      </SizableText>
      <MotiView
        from={{ opacity: 0, translateX: -50 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{
          type: "spring",
          duration: 350,
        }}
      >
        <FlatList
          data={animes}
          keyExtractor={(item) => `${item.mal_id.toString()}-${Math.random()}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          ListFooterComponent={ListFooterComponent}
          renderItem={renderItem}
          windowSize={5}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
        />
      </MotiView>
    </>
  );
};

export default HorizontalAnimeScroll;
