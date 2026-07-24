export interface AnimeSearchResponse {
  pagination: Pagination;
  data: Anime[];
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: Items;
}

export interface Items {
  count: number;
  total: number;
  per_page: number;
}

export interface Anime {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string | null;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number | null;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string | null;
  background: string | null;
  season: string | null;
  year: number | null;
  broadcast: Broadcast;
  producers: MalUrl[];
  licensors: MalUrl[];
  studios: MalUrl[];
  genres: MalUrl[];
  explicit_genres: MalUrl[];
  themes: MalUrl[];
  demographics: MalUrl[];
}

export interface Images {
  jpg: ImageFormat;
  webp: ImageFormat;
}

export interface ImageFormat {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface Trailer {
  youtube_id: string | null;
  url: string | null;
  embed_url: string | null;
  images: TrailerImages | null;
}

export interface TrailerImages {
  image_url: string | null;
  small_image_url: string | null;
  medium_image_url: string | null;
  large_image_url: string | null;
  maximum_image_url: string | null;
}

export interface Title {
  type: string;
  title: string;
}

export interface Aired {
  from: string | null;
  to: string | null;
  prop: Prop;
  string: string | null;
}

export interface Prop {
  from: From;
  to: To;
}

export interface From {
  day: number | null;
  month: number | null;
  year: number | null;
}

export interface To {
  day: number | null;
  month: number | null;
  year: number | null;
}

export interface Broadcast {
  day: string | null;
  time: string | null;
  timezone: string | null;
  string: string | null;
}

export interface MalUrl {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}
