import AnimeDetails from "@/components/AnimeDetails";
import Loading from "@/components/Loading";
import { useTranslateText } from "@/hooks/useTranslateText";
import { RootState } from "@/redux/store";
import { api } from "@/services/api";
import { TopAnimeItem } from "@/types/top";
import Feather from "@react-native-vector-icons/feather";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

interface IAnimeProps {
  id: string | number;
}

interface IAnimeResponse {
  data: TopAnimeItem;
}

const AnimeScreen: React.FC<IAnimeProps> = ({ id }) => {
  const [anime, setAnime] = useState<TopAnimeItem>();
  const [loading, setLoading] = useState(true);
  const { translate_text } = useSelector((state: RootState) => state.configs);

  const { translateText } = useTranslateText();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { data, status } = await api.get<IAnimeResponse>(
        `/anime/${id}/full`,
      );

      if (status === 200) {
        const animeData = data.data;

        if (translate_text) {
          animeData.genres = await Promise.all(
            animeData.genres.map(async (genre) => ({
              ...genre,
              name: await translateText(genre.name),
            })),
          );
          if (animeData.synopsis) {
            animeData.synopsis =
              (await translateText(animeData.synopsis)) +
              "\n\n[Traduzido automaticamente pelo Google]";
          }
        }

        setAnime(animeData);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: anime?.title_english,
      headerRight: () => (
        <TouchableOpacity>
          <Feather name="share-2" size={22} color={"#fff"} />
        </TouchableOpacity>
      ),
    });
  }, [anime]);

  if (loading) return <Loading />;

  return <AnimeDetails anime={anime!} />;
};

export default AnimeScreen;
