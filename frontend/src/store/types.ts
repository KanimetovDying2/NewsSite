export interface NewsPreview {
  id: number;
  title: string;
  image_url: string | null;
  created_at: string;
}

export interface NewsFull extends NewsPreview {
  content: string;
}

export interface Comment {
  id: number;
  news_id: number;
  author: string;
  text: string;
  created_at: string;
}
