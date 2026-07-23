import React from "react";

import HorizontalAnimeScroll from "../HorizontalScrollImages";
import Categories from "./components/Categories";
import {
  Container,
  ExplorerContainer,
  ExplorerList,
  ExplorerTitle,
  NewsButton,
  NewsButtonText,
  NewsContainer,
  NewsDescription,
  NewsImage,
  NewsInfosWrapper,
  NewsTitle,
  NewsWrapper,
  SearchContainer,
  SearchInput,
} from "./styles";

const ExplorerPage: React.FC = () => {
  return (
    <Container>
      <SearchContainer>
        <SearchInput placeholder="Pesquisar anime..." />
      </SearchContainer>
      <ExplorerList
        data={[]}
        renderItem={() => <></>}
        ListEmptyComponent={() => (
          <ExplorerContainer nestedScrollEnabled>
            <Categories onCategoryPress={() => {}} />
            <ExplorerTitle>Notícias</ExplorerTitle>
            <NewsContainer
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled
              horizontal
            >
              <NewsWrapper>
                <NewsImage src="https://infinitasvidas.wordpress.com/wp-content/uploads/2024/11/diarios-de-uma-apotecaria-5.png?w=640" />
                <NewsInfosWrapper>
                  <NewsTitle numberOfLines={2}>Lorem Ipsum</NewsTitle>
                  <NewsDescription numberOfLines={5}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Sint libero deserunt ipsa excepturi ad aperiam odio quam
                    ducimus, sit blanditiis laboriosam soluta harum illo fuga?
                    Nobis, deleniti cum. Omnis, nesciunt.
                  </NewsDescription>
                </NewsInfosWrapper>
                <NewsButton>
                  <NewsButtonText>Ver notícia completa</NewsButtonText>
                </NewsButton>
              </NewsWrapper>
              <NewsWrapper>
                <NewsImage src="https://infinitasvidas.wordpress.com/wp-content/uploads/2024/11/diarios-de-uma-apotecaria-5.png?w=640" />
                <NewsInfosWrapper>
                  <NewsTitle numberOfLines={2}>Lorem Ipsum</NewsTitle>
                  <NewsDescription numberOfLines={5}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Sint libero deserunt ipsa excepturi ad aperiam odio quam
                    ducimus, sit blanditiis laboriosam soluta harum illo fuga?
                    Nobis, deleniti cum. Omnis, nesciunt.
                  </NewsDescription>
                </NewsInfosWrapper>
                <NewsButton>
                  <NewsButtonText>Ver notícia completa</NewsButtonText>
                </NewsButton>
              </NewsWrapper>
            </NewsContainer>
            <HorizontalAnimeScroll title="Temporada atual" animes={[]} />
            <HorizontalAnimeScroll title="Futuros Lançamentos" animes={[]} />
          </ExplorerContainer>
        )}
      />
    </Container>
  );
};

export default ExplorerPage;
