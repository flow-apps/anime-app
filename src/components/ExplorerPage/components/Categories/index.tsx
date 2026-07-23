import React from "react";

import { LinearGradient } from "expo-linear-gradient";
import { Category, CategoryContainer, CategoryText, Container } from "./styles";

interface ICategory {
  label: string;
}

interface ICategoriesProps {
  categories: ICategory[];
  onCategoryPress: (index: number) => any;
}

const getRandomHexColor = (): string => {
  const randomChannel = () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");

  return `#${randomChannel()}${randomChannel()}${randomChannel()}`;
};

const gradientColors = (): [string, string] => [
  getRandomHexColor(),
  getRandomHexColor(),
];

const Categories: React.FC<ICategoriesProps> = ({
  categories,
  onCategoryPress,
}) => {
  return (
    <Container>
      <CategoryContainer>
        {categories.map((c, i) => (
          <Category onPress={() => onCategoryPress(i)} key={i}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={gradientColors()}
              style={{
                flex: 1,
                borderRadius: 15,
                padding: 10,
              }}
            >
              <CategoryText numberOfLines={2}>{c.label}</CategoryText>
            </LinearGradient>
          </Category>
        ))}
      </CategoryContainer>
    </Container>
  );
};

export default Categories;
