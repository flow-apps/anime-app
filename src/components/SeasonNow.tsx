import HorizontalAnimeScroll from "@/components/HorizontalScrollImages";
import Loading from "@/components/Loading";
import { api } from "@/services/api";
import { Anime, AnimeSearchResponse } from "@/types/anime";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "tamagui";

const SeasonNow: React.FC = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchSeasonNow = useCallback(async (pageNum: number) => {
    const isFirstPage = pageNum === 1;
    if (isFirstPage) setLoading(true);
    else setLoadingMore(true);
    try {
      const { data } = await api.get<AnimeSearchResponse>(
        `/seasons/now?page=${pageNum}&limit=15`,
      );
      setAnimes((prev) => (isFirstPage ? data.data : [...prev, ...data.data]));
      setHasMore(data.pagination.has_next_page);
      setPage(pageNum);
    } catch (error) {
      console.log(error);
    } finally {
      if (isFirstPage) setLoading(false);
      else setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchSeasonNow(1);
  }, [fetchSeasonNow]);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchSeasonNow(page + 1);
    }
  };

  const renderFooter = () => {
    if (!loadingMore) return null;

    return (
      <View
        alignItems="center"
        justifyContent="center"
        marginHorizontal={20}
        width={100}
      >
        <LottieView
          source={require("../../assets/animations/loading.json")}
          style={{ width: 100, height: 100 }}
          autoPlay
          loop
        />
      </View>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <HorizontalAnimeScroll
      title="Animes da Temporada"
      onPress={(id: number) => {
        router.navigate({
          pathname: "/anime/[id]",
          params: { id },
        });
      }}
      onEndReached={handleLoadMore}
      ListFooterComponent={renderFooter()}
      animes={animes.map((a) => {
        return {
          name: a.title_english || a.title,
          image_url: a.images.jpg.image_url,
          duration: a.episodes,
          release_date: a.year,
          mal_id: a.mal_id,
        };
      })}
    />
  );
};

export default SeasonNow;
