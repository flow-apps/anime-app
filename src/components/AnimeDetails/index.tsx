import { TopAnimeItem } from "@/types/top";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { Text, useTheme } from "tamagui";
import {
  AnimeBanner,
  AnimeBannerContainer,
  AnimeDetailsContainer,
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

  const { bg } = useTheme();

  const handleTextLayout = (event: any) => {
    setCanExpand(event.nativeEvent.lines.length > 3);
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
          <AnimeInfos>{`${anime.year}  |  ${anime.genres.map((a) => a.name).join(", ")}`}</AnimeInfos>
        </AnimeInfosWrapper>
        <AnimeInfos style={{ marginTop: 5 }}>
          <FontAwesomeFreeSolid name="star" size={12} color={"#ffd000"} />{" "}
          {anime.score}
        </AnimeInfos>
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
      </AnimeInfosContainer>
    </AnimeDetailsContainer>
  );
};

export default AnimeDetails;
