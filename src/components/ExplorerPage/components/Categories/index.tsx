import React, { useMemo } from "react";

import { LinearGradient } from "expo-linear-gradient";
import { Category, CategoryContainer, CategoryText, Container } from "./styles";

const getRandomHexColor = (): string => {
  const randomChannel = () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");

  return `#${randomChannel()}${randomChannel()}${randomChannel()}`;
};

const Categories: React.FC = () => {
  const gradientColors = useMemo(
    () => [getRandomHexColor(), getRandomHexColor()] as const,
    [],
  );

  return (
    <Container>
      <CategoryContainer>
        <Category>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={gradientColors}
            style={{
              flex: 1,
              borderRadius: 15,
              padding: 10,
            }}
          >
            <CategoryText>Ação</CategoryText>
          </LinearGradient>
        </Category>
      </CategoryContainer>
    </Container>
  );
};

export default Categories;
