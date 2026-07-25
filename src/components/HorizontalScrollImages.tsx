import React, { ReactNode } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Image, Paragraph, SizableText, Text, View } from "tamagui";

interface IAnimesData {
  mal_id: number;
  image_url: string;
  name: string;
  release_date?: string | number;
  duration?: number;
}

interface IHorizontalAnimeScrollProps {
  title: string;
  animes: IAnimesData[];
  onPress: (mal_id: number) => any;
  onEndReached?: () => void;
  ListFooterComponent?: ReactNode;
}

const HorizontalAnimeScroll: React.FC<IHorizontalAnimeScrollProps> = ({
  animes,
  title,
  onPress,
  onEndReached,
  ListFooterComponent,
}) => {
  return (
    <View>
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
      <FlatList
        data={animes}
        keyExtractor={(item) => `${Math.random()}-${item.mal_id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        ListFooterComponent={ListFooterComponent}
        renderItem={({ item: anime }) => (
          <TouchableOpacity
            onPress={() => onPress(anime.mal_id)}
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
            />
            <Text
              fontFamily="$body"
              fontWeight="$3"
              textAlign="center"
              color={"$textColor"}
              maxWidth={100}
              numberOfLines={2}
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
        )}
      />
    </View>
  );
};

export default HorizontalAnimeScroll;
