import React, { useCallback, useMemo, useState } from "react";
import {
  Keyboard,
  ListRenderItem,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { api } from "@/services/api";
import { GenreItem } from "@/types";
import { Anime, AnimeSearchResponse } from "@/types/anime";
import Feather from "@react-native-vector-icons/feather";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { Image, Paragraph, Text, View } from "tamagui";
import Loading from "../Loading";
import NewsSection from "../NewsSection";
import SeasonNow from "../SeasonNow";
import Categories from "./components/Categories";
import {
  Container,
  ExplorerContainer,
  ExplorerList,
  ExplorerTitle,
  SearchButton,
  SearchContainer,
  SearchInput,
} from "./styles";

import { RootState } from "@/redux/store";
import SimpleToast from "react-native-simple-toast";
import { useSelector } from "react-redux";

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
        <ScrollView>
          <ExplorerTitle>Notícias</ExplorerTitle>
          <NewsSection />
          <SeasonNow />
        </ScrollView>
      </ExplorerContainer>
    ),
);

interface ExplorerAnimeCardProps {
  item: Anime;
  onPress: (id: number) => void;
}

const ExplorerAnimeCard: React.FC<ExplorerAnimeCardProps> = React.memo(
  ({ item, onPress }) => {
    const handlePress = useCallback(() => {
      onPress(item.mal_id);
    }, [onPress, item.mal_id]);

    const isUpcoming = useMemo(() => {
      if (item.year) return false;
      if (item.aired.from !== null) return false;

      return true;
    }, [item]);

    const animeReleaseYear = useMemo(() => {
      if (isUpcoming) return null;

      if (item.aired.from) {
        const date = new Date(item.aired.from);

        return date.getFullYear();
      }

      return item.year;
    }, [isUpcoming, item]);

    return (
      <TouchableOpacity
        onPress={handlePress}
        style={{
          alignItems: "center",
          margin: 20,
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
            {animeReleaseYear ? animeReleaseYear : "N/A"}
            {" • "}
            {item.type == "Movie" ? "Filme" : `${item.episodes || 0} episódios`}
          </Paragraph>
        </View>
      </TouchableOpacity>
    );
  },
);

const ExplorerPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Anime[]>([]);
  const [searching, setSearching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentQuery, setCurrentQuery] = useState("");
  const [currentGenre, setCurrentGenre] = useState<
    string | number | undefined
  >();

  const { adult_content } = useSelector((state: RootState) => state.configs);

  const fetchAnimes = useCallback(
    async (pageNum: number, query?: string, genre?: string | number) => {
      const isNewSearch = pageNum === 1;
      if (isNewSearch) setSearching(true);
      else setLoadingMore(true);

      try {
        const { data } = await api.get<AnimeSearchResponse>("/anime", {
          params: {
            page: pageNum,
            limit: 24,
            q: query,
            genres: genre,
            sfw: !adult_content,
          },
        });

        setSearchResults((prev) =>
          isNewSearch ? data.data : [...prev, ...data.data],
        );

        if (data.data.length === 0) {
          SimpleToast.show("Nenhum anime encontrado", SimpleToast.SHORT);
        }

        setHasMore(data.pagination.has_next_page);
      } catch (error) {
        console.error("Failed to fetch animes:", error);
      } finally {
        if (isNewSearch) setSearching(false);
        else setLoadingMore(false);
      }
    },
    [adult_content],
  );

  const handleSearch = useCallback(
    (genre?: string | number, genreName?: string) => {
      Keyboard.dismiss();
      setPage(1);
      setSearchResults([]);
      const query = genre ? undefined : searchInput;
      setCurrentQuery(query || "");
      setCurrentGenre(genre);
      if (genreName) setSearchInput(genreName);
      fetchAnimes(1, query, genre);
    },
    [fetchAnimes, searchInput],
  );

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchResults([]);
    setCurrentQuery("");
    setCurrentGenre(undefined);
    setPage(1);
  };

  const handleOpenAnime = useCallback((id: string | number) => {
    router.navigate({
      pathname: "/anime/[id]",
      params: { id },
    });
  }, []);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore && searchResults.length > 0) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchAnimes(nextPage, currentQuery, currentGenre);
    }
  };

  const renderFooter = useMemo(() => {
    if (!loadingMore) return null;
    return (
      <View paddingVertical={20} alignItems="center" justifyContent="center">
        <LottieView
          source={require("../../../assets/animations/loading.json")}
          style={{ width: 100, height: 100 }}
          autoPlay
          loop
        />
      </View>
    );
  }, [loadingMore]);

  const onCategoryPress = useCallback(
    (genre: GenreItem) => {
      handleSearch(genre.mal_id, genre.name);
    },
    [handleSearch],
  );

  const renderItem: ListRenderItem<Anime> = useCallback(
    ({ item }) => {
      return <ExplorerAnimeCard item={item} onPress={handleOpenAnime} />;
    },
    [handleOpenAnime],
  );

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          value={searchInput}
          onChangeText={setSearchInput}
          placeholder="Pesquisar anime..."
          onSubmitEditing={() => handleSearch()}
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
          width: "100%",
        }}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyListComponent
            searching={searching}
            onCategoryPress={onCategoryPress}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        windowSize={10}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
      />
    </Container>
  );
};

export default ExplorerPage;
