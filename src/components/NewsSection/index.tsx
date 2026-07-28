import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, ListRenderItem, Image as RNImage } from "react-native";

import { useTranslateText } from "@/hooks/useTranslateText";
import { RootState } from "@/redux/store";
import { api } from "@/services/api";
import { NewsItem, NewsResponse } from "@/types";
import { openUrl } from "@/utils";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import { View } from "tamagui";
import Loading from "../Loading";
import {
  NewsButton,
  NewsButtonText,
  NewsDescription,
  NewsImage,
  NewsInfosWrapper,
  NewsTitle,
  NewsWrapper,
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

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = React.memo(({ item }) => {
  const handlePress = useCallback(() => {
    openUrl(item.forum_url);
  }, [item.forum_url]);

  return (
    <NewsWrapper>
      <NewsCardImage source={item.images.jpg.image_url} />
      <NewsInfosWrapper>
        <NewsTitle numberOfLines={3}>{item.title}</NewsTitle>
        <NewsDescription numberOfLines={6}>{item.excerpt}</NewsDescription>
      </NewsInfosWrapper>
      <NewsButton onPress={handlePress}>
        <NewsButtonText>Ver notícia completa</NewsButtonText>
      </NewsButton>
    </NewsWrapper>
  );
});

interface NewsSectionProps {
  animeId?: number;
}

const NewsSection: React.FC<NewsSectionProps> = React.memo(({ animeId }) => {
  const { translateText } = useTranslateText();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { translate_text, adult_content } = useSelector(
    (state: RootState) => state.configs,
  );

  const fetchNews = useCallback(
    async (pageNum: number) => {
      const isFirstPage = pageNum === 1;
      if (isFirstPage) setLoading(true);
      else setLoadingMore(true);

      try {
        const url = animeId ? `/anime/${animeId}/news` : `/news`;
        const { data: responseData } = await api.get<NewsResponse>(url, {
          params: {
            page: pageNum,
            limit: 5,
            sfw: !adult_content,
          },
        });
        const { data, pagination } = responseData;
        let newsData = data;

        if (translate_text) {
          newsData = await Promise.all(
            newsData.map(async (n) => {
              const [title, excerpt] = await Promise.all([
                translateText(n.title).catch(() => n.title),
                translateText(n.excerpt).catch(() => n.excerpt),
              ]);

              return { ...n, title, excerpt };
            }),
          );
        }
        setNews((prev) => (isFirstPage ? newsData : [...prev, ...newsData]));
        setHasMore(pagination.has_next_page);
        setPage(pageNum);
      } finally {
        if (isFirstPage) setLoading(false);
        else setLoadingMore(false);
      }
    },
    [translate_text, translateText, animeId],
  );

  useEffect(() => {
    fetchNews(1);
  }, [fetchNews]);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchNews(page + 1);
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
          source={require("../../../assets/animations/loading.json")}
          style={{ width: 100, height: 100 }}
          autoPlay
          loop
        />
      </View>
    );
  }, [loadingMore]);

  const renderItem: ListRenderItem<NewsItem> = useCallback(({ item }) => {
    return <NewsCard item={item} />;
  }, []);

  if (loading) return <Loading />;

  return (
    <FlatList
      data={news}
      keyExtractor={(item) => item.mal_id.toString()}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      horizontal
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
});

export default NewsSection;
