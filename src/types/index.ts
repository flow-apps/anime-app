import { TopAnimeItem } from "./top";

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
}

export interface ImageSet {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface AnimeImages {
  jpg: ImageSet;
  webp: ImageSet;
}

export interface AnimeEntry {
  mal_id: number;
  url: string;
  images: AnimeImages;
  title: string;
}

export interface RecommendationUser {
  url: string;
  username: string;
}

export interface RecommendationItem {
  mal_id: string;
  entry: AnimeEntry[];
  content: string;
  date: string;
  user: RecommendationUser;
}

export interface RecommendationResponse {
  pagination: Pagination;
  data: RecommendationItem[];
}

export interface IAnimeNotification {
  anime: TopAnimeItem;
  identifier: string;
}

export * from "./genre";
export * from "./news";

