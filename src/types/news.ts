export interface NewsPaginationItems {
  count: number;
  total: number;
  per_page: number;
}

export interface NewsPagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: NewsPaginationItems;
}

export interface NewsImageSet {
  image_url: string;
}

export interface NewsImages {
  jpg: NewsImageSet;
}

export interface NewsItem {
  mal_id: number;
  url: string;
  title: string;
  date: string;
  author_username: string;
  author_url: string;
  forum_url: string;
  images: NewsImages;
  comments: number;
  excerpt: string;
}

export interface NewsResponse {
  pagination: NewsPagination;
  data: NewsItem[];
}
