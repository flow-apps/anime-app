import React, { useEffect, useState } from "react";

import Loading from "@/components/Loading";
import { usePersistedState } from "@/hooks/usePersistedState";
import { useTranslateText } from "@/hooks/useTranslateText";
import { api } from "@/services/api";
import { GenreItem, GenreResponse } from "@/types/genre";
import { LinearGradient } from "expo-linear-gradient";
import {
  Category,
  CategoryContainer,
  CategoryText,
  Container,
  ShowMoreButton,
  ShowMoreText,
} from "./styles";

interface ICategoriesProps {
  onCategoryPress: (category: GenreItem) => any;
}

const getRandomHexColor = (): string => {
  const randomChannel = () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");

  return `#${randomChannel()}${randomChannel()}${randomChannel()}`;
};

const gradientColors = (): [string, string] => [
  getRandomHexColor() + "55",
  getRandomHexColor(),
];

const createGenreColorMap = (items: GenreItem[]) =>
  items.reduce<Record<number, [string, string]>>((acc, item) => {
    acc[item.mal_id] = gradientColors();
    return acc;
  }, {});

const Categories: React.FC<ICategoriesProps> = ({ onCategoryPress }) => {
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<GenreItem[]>([]);
  const [genreColors, setGenreColors] = useState<
    Record<number, [string, string]>
  >({});
  const [visibleCount, setVisibleCount] = useState(6);
  const [translate, setTranslate, updated] = usePersistedState<boolean>(
    "translate_text",
    false,
  );
  const { translateText } = useTranslateText();

  useEffect(() => {
    (async () => {
      if (!updated) return;
      const {
        data: { data },
      } = await api.get<GenreResponse>("/genres/anime");

      const genresData = translate
        ? await Promise.all(
            data.map(async (genre) => ({
              ...genre,
              name: await translateText(genre.name),
            })),
          )
        : data;

      setGenres(genresData);
      setGenreColors(createGenreColorMap(genresData));
      setLoading(false);
    })();
  }, [updated, translate, translateText]);

  const visibleGenres = genres.slice(0, visibleCount);
  const hasMoreGenres = visibleCount < genres.length;

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <CategoryContainer>
        {visibleGenres.map((g, i) => (
          <Category onPress={() => onCategoryPress(g)} key={i}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={genreColors[g.mal_id] ?? gradientColors()}
              style={{
                flex: 1,
                borderRadius: 15,
                padding: 10,
              }}
            >
              <CategoryText numberOfLines={2}>{g.name}</CategoryText>
            </LinearGradient>
          </Category>
        ))}
      </CategoryContainer>

      {genres.length > 6 && (
        <ShowMoreButton
          onPress={() =>
            setVisibleCount((count) => (count >= genres.length ? 6 : count + 6))
          }
        >
          <ShowMoreText>
            {visibleCount >= genres.length
              ? "▲ Mostrar menos"
              : "▼ Mostrar mais"}
          </ShowMoreText>
        </ShowMoreButton>
      )}
    </Container>
  );
};

export default Categories;
