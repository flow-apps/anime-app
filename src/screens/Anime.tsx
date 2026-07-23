import AnimeDetails from "@/components/AnimeDetails";
import Loading from "@/components/Loading";
import { usePersistedState } from "@/hooks/usePersistedState";
import { useTranslateText } from "@/hooks/useTranslateText";
import { api } from "@/services/api";
import { TopAnimeItem } from "@/types/top";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";

interface IAnimeProps {
  id: string | number;
}

interface IAnimeResponse {
  data: TopAnimeItem;
}

const AnimeScreen: React.FC<IAnimeProps> = ({ id }) => {
  const [anime, setAnime] = useState<TopAnimeItem>();
  const [loading, setLoading] = useState(true);
  const [translate, setTranslate, updated] = usePersistedState<boolean>(
    "translate_text",
    false,
  );
  const { translateText } = useTranslateText();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { data, status } = await api.get<IAnimeResponse>(
        `/anime/${id}/full`,
      );

      if (status === 200) {
        const animeData = data.data;

        if (translate) {
          animeData.genres = await Promise.all(
            animeData.genres.map(async (genre) => ({
              ...genre,
              name: await translateText(genre.name),
            })),
          );
          animeData.synopsis = await translateText(animeData.synopsis);
        }

        setAnime(animeData);
      }
      setLoading(false);
    })();
  }, [updated]);

  useEffect(() => {
    navigation.setOptions({ title: anime?.title_english });
  }, [anime]);

  if (loading) return <Loading />;

  return <AnimeDetails anime={anime!} />;
};

export default AnimeScreen;
