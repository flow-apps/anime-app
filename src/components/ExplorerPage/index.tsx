import React from "react";

import Categories from "./components/Categories";
import {
  Container,
  ExplorerContainer,
  ExplorerList,
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
            <Categories />
          </ExplorerContainer>
        )}
      />
    </Container>
  );
};

export default ExplorerPage;
