import { Container } from "@/components/Container";
import HomeSlider from "@/components/HomeSlider";
import HorizontalAnimeScroll from "@/components/HorizontalScrollImages";
import Loading from "@/components/Loading";
import { RootState } from "@/redux/store";
import { api } from "@/services/api";
import { AnimeEntry, RecommendationResponse } from "@/types";
import { TopAnimeItem, TopResponse } from "@/types/top";
import { shuffle } from "@/utils";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const HomeScreen: React.FC = () => {
  const [animesRec, setAnimesRec] = useState<AnimeEntry[]>([]);
  const [topAnimes, setTopAnimes] = useState<TopAnimeItem[]>([]);
  const [sliderData, setSliderData] = useState<AnimeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState({ top: false, rec: false });

  const [topAnimesPage, setTopAnimesPage] = useState(1);
  const [recAnimesPage, setRecAnimesPage] = useState(1);

  const [hasMore, setHasMore] = useState({ top: true, rec: true });
  const { adult_content } = useSelector((state: RootState) => state.configs);

  const fetchInitialData = useCallback(async () => {
    try {
      const [recResponse, topResponse] = await Promise.all([
        api.get<RecommendationResponse>("/recommendations/anime"),
        api.get<TopResponse>("/top/anime"),
      ]);

      if (recResponse.status === 200) {
        const animeEntries: AnimeEntry[] = recResponse.data.data.flatMap(
          (a: any) => a.entry,
        );
        setAnimesRec(shuffle(animeEntries));
        setHasMore((prev) => ({
          ...prev,
          rec: recResponse.data.pagination.has_next_page,
        }));
      }

      if (topResponse.status === 200) {
        setTopAnimes(topResponse.data.data);
        setHasMore((prev) => ({
          ...prev,
          top: topResponse.data.pagination.has_next_page,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch initial data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    const data = animesRec?.slice(0, 15);
    setSliderData(data);
  }, [animesRec]);

  const loadMoreTopAnimes = useCallback(async () => {
    if (loadingMore.top || !hasMore.top) return;

    setLoadingMore((prev) => ({ ...prev, top: true }));
    const nextPage = topAnimesPage + 1;
    const { data, status } = await api.get<TopResponse>(`/top/anime`, {
      params: {
        page: nextPage,
        sfw: !adult_content,
      },
    });
    if (status === 200) {
      setTopAnimes((prev) => [...prev, ...data.data]);
      setTopAnimesPage(nextPage);
      setHasMore((prev) => ({ ...prev, top: data.pagination.has_next_page }));
    }
    setLoadingMore((prev) => ({ ...prev, top: false }));
  }, [loadingMore.top, hasMore.top, topAnimesPage]);

  const loadMoreRecAnimes = useCallback(async () => {
    if (loadingMore.rec || !hasMore.rec) return;

    setLoadingMore((prev) => ({ ...prev, rec: true }));
    const nextPage = recAnimesPage + 1;
    const { data, status } = await api.get<RecommendationResponse>(
      `/recommendations/anime`,
      {
        params: {
          page: nextPage,
          sfw: !adult_content,
        },
      },
    );
    if (status === 200) {
      const newEntries = data.data.flatMap((a) => a.entry);
      setAnimesRec((prev) => [...prev, ...newEntries]);
      setRecAnimesPage(nextPage);
      setHasMore((prev) => ({ ...prev, rec: data.pagination.has_next_page }));
    }
    setLoadingMore((prev) => ({ ...prev, rec: false }));
  }, [loadingMore.rec, hasMore.rec, recAnimesPage]);

  const renderFooter = (loading: boolean): ReactNode => {
    if (!loading) return <></>;

    return (
      <LottieView
        source={require("@/assets/animations/loading.json")}
        style={{ width: 100, height: 100, alignSelf: "center" }}
        autoPlay
        loop
        testID="loading-animation"
      />
    );
  };

  if (loading) return <Loading />;

  return (
    <Container padding={15}>
      <HomeSlider
        onPress={(index: number) => {
          router.navigate({
            pathname: "/anime/[id]",
            params: { id: sliderData[index].mal_id },
          });
        }}
        data={sliderData.map((a) => ({
          label: a.title,
          uri: a.images.jpg.large_image_url,
        }))}
      />
      <HorizontalAnimeScroll
        title="Popular"
        onPress={(id: number) => {
          router.navigate({
            pathname: "/anime/[id]",
            params: { id },
          });
        }}
        onEndReached={loadMoreTopAnimes}
        ListFooterComponent={renderFooter(loadingMore.top)}
        animes={topAnimes.map((a) => {
          return {
            name: a.title_english || a.title,
            image_url: a.images.jpg.image_url,
            duration: a.episodes,
            release_date: a.year,
            mal_id: a.mal_id,
          };
        })}
      />
      <HorizontalAnimeScroll
        title="Recomendados"
        onPress={(id: number) => {
          router.navigate({
            pathname: "/anime/[id]",
            params: { id },
          });
        }}
        onEndReached={loadMoreRecAnimes}
        ListFooterComponent={renderFooter(loadingMore.rec)}
        animes={animesRec.map((a) => {
          return {
            name: a.title,
            image_url: a.images.jpg.image_url,
            mal_id: a.mal_id,
          };
        })}
      />
    </Container>
  );
};

export default HomeScreen;
