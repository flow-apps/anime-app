import HorizontalAnimeScroll from "@/components/HorizontalScrollImages";
import Loading from "@/components/Loading";
import { usePersistedState } from "@/hooks/usePersistedState";
import { api } from "@/services/api";
import { Anime, AnimeSearchResponse } from "@/types/anime";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "tamagui";

const SeasonNow: React.FC = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [adultContent, _] = usePersistedState<boolean>("adult_content", false);

  const fetchSeasonNow = useCallback(
    async (pageNum: number) => {
      const isFirstPage = pageNum === 1;
      if (isFirstPage) setLoading(true);
      else setLoadingMore(true);
      try {
        const { data } = await api.get<AnimeSearchResponse>(`/seasons/now`, {
          params: {
            page: pageNum,
            limit: 15,
            sfw: !adultContent,
          },
        });
        setAnimes((prev) =>
          isFirstPage ? data.data : [...prev, ...data.data]
        );
        setHasMore(data.pagination.has_next_page);
        setPage(pageNum);
      } catch (error) {
        console.log(error);
      } finally {
        if (isFirstPage) setLoading(false);
        else setLoadingMore(false);
      }
    },
    [adultContent]
  );

  useEffect(() => {
    fetchSeasonNow(1);
  }, [fetchSeasonNow]);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchSeasonNow(page + 1);
    }
  };

  const renderFooter = useMemo(() => {
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
  }, [loadingMore]);

  const animesData = useMemo(() => {
    return animes.map((a) => {
      return {
        name: a.title_english || a.title,
        image_url: a.images.jpg.image_url,
        duration: a.episodes,
        release_date: a.year,
        mal_id: a.mal_id,
      };
    });
  }, [animes]);

  const handlePress = useCallback((id: number) => {
    router.navigate({
      pathname: "/anime/[id]",
      params: { id },
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <HorizontalAnimeScroll
      title="Animes da Temporada"
      onPress={handlePress}
      onEndReached={handleLoadMore}
      ListFooterComponent={renderFooter}
      animes={animesData}
    />
  );
};

export default SeasonNow;
