import { usePersistedState } from "@/hooks/usePersistedState";
import { TopAnimeItem } from "@/types/top";
import Feather from "@react-native-vector-icons/feather";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { useNavigation } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import React, { useEffect, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { Text, useTheme } from "tamagui";
import NewsSection from "../NewsSection";
import {
  AnimeBanner,
  AnimeBannerContainer,
  AnimeDetailsContainer,
  AnimeFavoriteButton,
  AnimeFavoriteButtonContainer,
  AnimeInfos,
  AnimeInfosContainer,
  AnimeInfosWrapper,
  AnimeSynopsisContainer,
  AnimeSynopsisFade,
  AnimeTitle,
} from "./styles";

interface IAnimeDetailsProps {
  anime: TopAnimeItem;
}

const AnimeDetails: React.FC<IAnimeDetailsProps> = ({ anime }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const [favorites, setFavorites] = usePersistedState<TopAnimeItem[]>(
    "favorites",
    [],
  );

  const [runAnimation, setRunAnimation] = useState(false);
  const navigation = useNavigation();

  const isUpcoming = useMemo(() => {
    if (anime.year) return false;
    if (anime.aired.from !== null) return false;

    return true;
  }, [anime]);

  const animeReleaseYear = useMemo(() => {
    if (isUpcoming) return null;

    if (anime.aired.from) {
      const date = new Date(anime.aired.from);

      return date.getFullYear();
    }

    return anime.year;
  }, [isUpcoming, anime]);

  useEffect(() => {
    if (runAnimation) {
      const timeout = setTimeout(() => {
        setRunAnimation(false);
      }, 600);

      return () => clearTimeout(timeout);
    }
  }, [runAnimation]);

  const { bg, red, shape } = useTheme();

  const handleTextLayout = (event: any) => {
    setCanExpand(event.nativeEvent.lines.length > 3);
  };

  const isFavorited = favorites.some((fav) => fav.mal_id === anime.mal_id);

  const handleFavorite = () => {
    if (isFavorited) {
      setFavorites(favorites.filter((fav) => fav.mal_id !== anime.mal_id));
    } else {
      setFavorites([...favorites, anime]);
      setRunAnimation(true);
    }
  };

  return (
    <AnimeDetailsContainer>
      <AnimeBannerContainer colors={[`${bg.val}33`, bg.val]}>
        <AnimeBanner src={anime.images.jpg.large_image_url} />
      </AnimeBannerContainer>
      <AnimeInfosContainer>
        <AnimeTitle numberOfLines={2}>
          {anime.title_english || anime.title}
        </AnimeTitle>
        <AnimeInfosWrapper>
          <AnimeInfos>{`${animeReleaseYear ? animeReleaseYear : "N/A"}  |  ${anime.genres.map((a) => a.name).join(", ")}`}</AnimeInfos>
        </AnimeInfosWrapper>
        {!!anime.score && (
          <AnimeInfos style={{ marginTop: 5 }}>
            <FontAwesomeFreeSolid name="star" size={12} color={"#ffd000"} />{" "}
            {anime.score}
          </AnimeInfos>
        )}
        {!canExpand ? (
          <Text
            onTextLayout={handleTextLayout}
            color={"$textColor"}
            style={{
              position: "absolute",
              opacity: 0,
              left: -10000,
              top: -10000,
              lineHeight: 20,
            }}
          >
            {anime.synopsis}
          </Text>
        ) : null}
        <AnimeFavoriteButtonContainer>
          <AnimeFavoriteButton
            onPress={handleFavorite}
            style={{ backgroundColor: isFavorited ? red.val : shape.val }}
          >
            {isFavorited ? (
              <AnimatePresence>
                <MotiView
                  key="moti-heart"
                  from={{
                    scale: 0.5,
                  }}
                  animate={{
                    scale: runAnimation ? [1.3, 1.0] : 1.0,
                  }}
                  transition={{
                    type: "spring",
                    duration: 150,
                  }}
                  exit={{
                    scale: 0,
                  }}
                >
                  <FontAwesomeFreeSolid name="heart" color={"#fff"} size={20} />
                </MotiView>
              </AnimatePresence>
            ) : (
              <Feather name="heart" color={red.val} size={20} />
            )}
          </AnimeFavoriteButton>
        </AnimeFavoriteButtonContainer>
        <AnimeSynopsisContainer>
          <Text
            numberOfLines={isExpanded ? undefined : 3}
            color={"$textColor"}
            fontFamily="$body"
            fontWeight={"$2"}
            style={{
              lineHeight: 20,
            }}
          >
            {anime.synopsis}
          </Text>
          {canExpand && !isExpanded ? (
            <AnimeSynopsisFade
              colors={["rgba(0,0,0,0)", bg.val]}
              pointerEvents="none"
            />
          ) : null}
        </AnimeSynopsisContainer>
        {canExpand ? (
          <TouchableOpacity
            onPress={() => setIsExpanded((current) => !current)}
          >
            <Text
              style={{ marginTop: 10, fontSize: 14 }}
              color={"$red"}
              fontFamily={"$body"}
              fontWeight={"$2"}
            >
              {isExpanded ? "Ver menos" : "Ver mais"}
            </Text>
          </TouchableOpacity>
        ) : null}

        {anime.trailer.embed_url && (
          <>
            <AnimeTitle style={{ marginTop: 20 }}>Trailer</AnimeTitle>
            <WebView
              style={{
                height: 250,
                marginVertical: 20,
                backgroundColor: bg.val,
              }}
              allowsInlineMediaPlayback
              allowsFullscreenVideo
              mediaPlaybackRequiresUserAction
              source={{
                html: `<iframe frameborder="0" allowfullscreen width="100%" height="100%"
                      src="${anime.trailer.embed_url}" autoplay="0">
                      </iframe>`,
                baseUrl: "https://pedrobraga.vercel.app",
              }}
            />
          </>
        )}

        <AnimeTitle style={{ marginTop: 20 }}>Notícias</AnimeTitle>
        <NewsSection animeId={anime.mal_id} />
      </AnimeInfosContainer>
    </AnimeDetailsContainer>
  );
};

export default AnimeDetails;
