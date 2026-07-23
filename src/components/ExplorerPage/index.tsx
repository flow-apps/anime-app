import React, { useEffect, useState } from "react";
import { FlatList, Image as RNImage } from "react-native";

import { usePersistedState } from "@/hooks/usePersistedState";
import { useTranslateText } from "@/hooks/useTranslateText";
import { api } from "@/services/api";
import { NewsItem, NewsResponse } from "@/types";
import { openUrl } from "@/utils";
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

const ExplorerPage: React.FC = () => {
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
        } = await api.get<NewsResponse>("/news?limit=30");
        let newsData = data;

        if (translate) {
          newsData = await Promise.all(
            newsData.map(async (n) => {
              const [title, excerpt] = await Promise.all([
                translateText(n.title).catch(() => n.title),
                translateText(n.excerpt).catch(() => n.excerpt),
              ]);

              return {
                ...n,
                title,
                excerpt,
              };
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
    <Container>
      <SearchContainer>
        <SearchInput placeholder="Pesquisar anime..." />
      </SearchContainer>
      <ExplorerList
        data={[]}
        renderItem={() => <></>}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <ExplorerContainer>
            <Categories onCategoryPress={() => {}} />
            <ExplorerTitle>Notícias</ExplorerTitle>
            <FlatList
              data={news}
              keyExtractor={(item) => item.mal_id.toString()}
              renderItem={({ item: n }) => (
                <NewsWrapper>
                  <NewsCardImage source={n.images.jpg.image_url} />
                  <NewsInfosWrapper>
                    <NewsTitle numberOfLines={3}>{n.title}</NewsTitle>
                    <NewsDescription numberOfLines={6}>
                      {n.excerpt}
                    </NewsDescription>
                  </NewsInfosWrapper>
                  <NewsButton onPress={() => openUrl(n.forum_url)}>
                    <NewsButtonText>Ver notícia completa</NewsButtonText>
                  </NewsButton>
                </NewsWrapper>
              )}
              showsHorizontalScrollIndicator={false}
              horizontal
            />
            {/* <HorizontalAnimeScroll title="Temporada atual" animes={[]} /> */}
            {/* <HorizontalAnimeScroll title="Futuros Lançamentos" animes={[]} /> */}
          </ExplorerContainer>
        )}
      />
    </Container>
  );
};

export default ExplorerPage;
