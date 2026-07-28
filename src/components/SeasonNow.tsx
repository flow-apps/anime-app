import HorizontalAnimeScroll from "@/components/HorizontalScrollImages";
import Loading from "@/components/Loading";
import { RootState } from "@/redux/store";
import { api } from "@/services/api";
import { Anime, AnimeSearchResponse } from "@/types/anime";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { View } from "tamagui";

const SeasonNow: React.FC = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { adult_content } = useSelector((state: RootState) => state.configs);

  const fetchSeasonNow = useCallback(async (pageNum: number) => {
    const isFirstPage = pageNum === 1;
    if (isFirstPage) setLoading(true);
    else setLoadingMore(true);
    try {
      const { data } = await api.get<AnimeSearchResponse>(`/seasons/now`, {
        params: {
          page: pageNum,
          limit: 15,
          sfw: !adult_content,
        },
      });
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
      const isUpcoming = () => {
        if (a.year) return false;
        if (a.aired.from !== null) return false;

        return true;
      };

      const animeReleaseYear = () => {
        if (isUpcoming()) return null;

        if (a.aired.from) {
          const date = new Date(a.aired.from);

          return date.getFullYear();
        }

        return a.year;
      };

      return {
        name: a.title_english || a.title,
        image_url: a.images.jpg.image_url,
        duration: a.episodes,
        release_date: animeReleaseYear(),
        mal_id: a.mal_id,
        type: a.type,
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
