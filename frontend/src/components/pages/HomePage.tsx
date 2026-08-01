import { useState, useEffect } from "react";
import { api } from "../../api/axiosApi";
import { useStore } from "../../store/useStore";
import NewsItem from "./NewsItem";
import Spinner from "../spinner/Spinner";

const HomePage = () => {
  const { newsList, setNewsList, removeNews } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get("/news")
      .then((res) => {
        setNewsList(res.data);
      })
      .finally(() => setIsLoading(false)); 
  }, [setNewsList]);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/news/${id}`);
      removeNews(id);
    } catch (error) {
      console.error("Error delete:", error);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">News</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {newsList.map((news) => (
          <NewsItem
            key={news.id}
            news={news}
            onDelete={() => handleDelete(news.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
