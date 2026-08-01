import { create } from "zustand";
import type { NewsPreview, NewsFull, Comment } from "./types";

interface NewsStore {
  newsList: NewsPreview[];
  currentNews: NewsFull | null;
  comments: Comment[];
  setNewsList: (newsList: NewsPreview[]) => void;
  setCurrentNews: (news: NewsFull) => void;
  setComments: (comments: Comment[]) => void;
  removeNews: (id: number) => void;
}

export const useStore = create<NewsStore>((set) => ({
  newsList: [],
  currentNews: null,
  comments: [],
  setNewsList: (newsList) => set({ newsList }),
  setCurrentNews: (currentNews) => set({ currentNews }),
  setComments: (comments) => set({ comments }),
  removeNews: (id) =>
    set((state) => ({
      newsList: state.newsList.filter((n) => n.id !== id),
    })),
}));
