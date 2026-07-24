import React, { useEffect, useState } from "react";
import { FlatList, Image as RNImage, TouchableOpacity } from "react-native";

import { usePersistedState } from "@/hooks/usePersistedState";
import { useTranslateText } from "@/hooks/useTranslateText";
import { api } from "@/services/api";
import { GenreItem, NewsItem, NewsResponse } from "@/types";
import { Anime, AnimeSearchResponse } from "@/types/anime";
import { openUrl } from "@/utils";
import Feather from "@react-native-vector-icons/feather";
import { router } from "expo-router";
import { Image, Paragraph, Text, View } from "tamagui";
import Loading from "../Loading";
import Categories from "./components/Categories";
import {
  Container,
  ExplorerContainer,
  ExplorerList,
  ExplorerTitle,
  NewsButton,
  NewsButtonText,
  NewsDescription,
  NewsImage,
  NewsInfosWrapper,
  NewsTitle,
  NewsWrapper,
  SearchButton,
  SearchContainer,
  SearchInput,
} from "./styles";

const placeholderImage = RNImage.resolveAssetSource(
  require("../../../assets/images/placeholder.jpg"),
).uri;
interface NewsCardImageProps {
  source: string;
}

const NewsCardImage: React.FC<NewsCardImageProps> = React.memo(({ source }) => {
  const [currentSource, setCurrentSource] = useState(source);

  return (
    <NewsImage
      src={currentSource}
      onError={() => setCurrentSource(placeholderImage)}
    />
  );
});

const NewsSection: React.FC = React.memo(() => {
  const { translateText } = useTranslateText();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [translate, _, updated] = usePersistedState<boolean>(
    "translate_text",
    true,
  );

  useEffect(() => {
    (async () => {
      if (!updated) return;
      setLoading(true);

      try {
        const {
          data: { data },
        } = await api.get<NewsResponse>("/news?limit=15");
        let newsData = data;

        if (translate) {
          newsData = await Promise.all(
            newsData.map(async (n) => {
              const [title, excerpt] = await Promise.all([
                translateText(n.title).catch(() => n.title),
                translateText(n.excerpt).catch(() => n.excerpt),
              ]);

              return { ...n, title, excerpt };
            }),
          );
        }

        setNews(newsData);
      } finally {
        setLoading(false);
      }
    })();
  }, [updated, translate, translateText]);

  if (loading) return <Loading />;

  return (
    <>
      <ExplorerTitle>Notícias</ExplorerTitle>
      <FlatList
        data={news}
        keyExtractor={(item) => item.mal_id.toString()}
        renderItem={({ item: n }) => (
          <NewsWrapper>
            <NewsCardImage source={n.images.jpg.image_url} />
            <NewsInfosWrapper>
              <NewsTitle numberOfLines={3}>{n.title}</NewsTitle>
              <NewsDescription numberOfLines={6}>{n.excerpt}</NewsDescription>
            </NewsInfosWrapper>
            <NewsButton onPress={() => openUrl(n.forum_url)}>
              <NewsButtonText>Ver notícia completa</NewsButtonText>
            </NewsButton>
          </NewsWrapper>
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </>
  );
});

const EmptyListComponent = React.memo(
  ({
    searching,
    onCategoryPress,
  }: {
    searching: boolean;
    onCategoryPress: (genre: GenreItem) => void;
  }) =>
    searching ? (
      <Loading />
    ) : (
      <ExplorerContainer>
        <Categories onCategoryPress={onCategoryPress} />
        <NewsSection />
      </ExplorerContainer>
    ),
);

const ExplorerPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Anime[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = async (genre?: string | number, genreName?: string) => {
    setSearching(true);

    let animeData: Anime[];

    if (genre) {
      const {
        data: { data },
      } = await api.get<AnimeSearchResponse>(`/anime?genres=${genre}&limit=50`);

      setSearchInput(genreName!);
      animeData = data;
    } else {
      const {
        data: { data },
      } = await api.get<AnimeSearchResponse>(
        `/anime?q=${searchInput}&limit=20`,
      );

      animeData = data;
    }

    setSearchResults(animeData);
    setSearching(false);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchResults([]);
  };

  const handleOpenAnime = (id: string | number) => {
    router.navigate({
      pathname: "/anime/[id]",
      params: { id },
    });
  };

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          value={searchInput}
          onChangeText={setSearchInput}
          placeholder="Pesquisar anime..."
          disabled={!!searchResults.length}
        />
        {!!searchResults.length && (
          <SearchButton onPress={handleClearSearch}>
            <Feather name="x" color={"#fff"} size={16} />
          </SearchButton>
        )}
        {searchInput.length > 0 && !searchResults.length && (
          <SearchButton onPress={() => handleSearch()}>
            <Feather name="search" color={"#fff"} size={16} />
          </SearchButton>
        )}
      </SearchContainer>
      <ExplorerList
        data={searchResults}
        keyExtractor={({ mal_id }) => mal_id.toString()}
        numColumns={2}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginVertical: 20,
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
          <EmptyListComponent
            searching={searching}
            onCategoryPress={(genre) => handleSearch(genre.mal_id, genre.name)}
          />
        }
      />
    </Container>
  );
};

export default ExplorerPage;
