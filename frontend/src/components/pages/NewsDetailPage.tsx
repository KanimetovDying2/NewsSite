import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/axiosApi";
import { useStore } from "../../store/useStore";
import CommentSection from "../comments/CommentSection";
import Spinner from "../spinner/Spinner";

const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { currentNews, setCurrentNews } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  const [imgSrc, setImgSrc] = useState("/uknownpost.jpg");

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    api
      .get(`/news/${id}`)
      .then((res) => {
        setCurrentNews(res.data);

        setImgSrc(
          res.data.image_url
            ? `http://localhost:3000${res.data.image_url}`
            : "/uknownpost.jpg",
        );
      })
      .finally(() => setIsLoading(false));
  }, [id, setCurrentNews]);

  if (isLoading) return <Spinner />;
  if (!currentNews) return <div>News not found</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{currentNews.title}</h1>
      <p className="text-sm text-gray-500">
        {new Date(currentNews.created_at).toLocaleDateString()}
      </p>

      <img
        src={imgSrc}
        alt={currentNews.title}
        className="w-full h-64 object-cover rounded"
        onError={() => setImgSrc("/uknownpost.jpg")}
      />

      <div className="prose max-w-none">{currentNews.content}</div>

      {id && <CommentSection newsId={Number(id)} />}
    </div>
  );
};

export default NewsDetailPage;
