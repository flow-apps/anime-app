import { Container } from "@/components/Container";
import HomeSlider from "@/components/HomeSlider";
import HorizontalAnimeScroll from "@/components/HorizontalScrollImages";
import Loading from "@/components/Loading";
import { api } from "@/services/api";
import { AnimeEntry, RecommendationResponse } from "@/types";
import { TopAnimeItem, TopResponse } from "@/types/top";
import { shuffle } from "@/utils";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";

const HomeScreen: React.FC = () => {
  const [animesRec, setAnimesRec] = useState<AnimeEntry[]>([]);
  const [topAnimes, setTopAnimes] = useState<TopAnimeItem[]>([]);
  const [sliderData, setSliderData] = useState<AnimeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, status } = await api.get<RecommendationResponse>(
        "/recommendations/anime?page=1&limit=100",
      );

      if (status === 200) {
        const animeEntries: AnimeEntry[] = data.data.flatMap((a) => a.entry);

        setAnimesRec(shuffle(animeEntries));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data, status } = await api.get<TopResponse>(
        "/top/anime?page=1&limit=50",
      );

      setTopAnimes(data.data);

      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const data = animesRec?.slice(0, 15);

    setSliderData(data);
  }, [animesRec]);

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
