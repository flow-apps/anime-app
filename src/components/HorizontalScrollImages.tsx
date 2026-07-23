import React from "react";
import { TouchableOpacity } from "react-native";
import { Image, Paragraph, ScrollView, SizableText, Text, View } from "tamagui";

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
}

const HorizontalAnimeScroll: React.FC<IHorizontalAnimeScrollProps> = ({
  animes,
  title,
  onPress,
}) => {
  return (
    <ScrollView nestedScrollEnabled>
      <SizableText
        fontSize={26}
        fontFamily="$heading"
        fontWeight="$4"
        color={"$textColor"}
        marginVertical={15}
      >
        {title}
      </SizableText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {animes.map((anime, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => onPress(anime.mal_id)}
            style={{
              marginRight: 25,
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
            <View>
              <Paragraph
                textAlign="center"
                fontFamily="$body"
                fontWeight="$1"
                color={"$grey"}
              >
                {anime.release_date &&
                  anime.duration &&
                  `${anime.release_date} • ${anime.duration} episódios`}
              </Paragraph>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default HorizontalAnimeScroll;
