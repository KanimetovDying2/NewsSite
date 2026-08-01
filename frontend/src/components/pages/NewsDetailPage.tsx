import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/axiosApi";
import { useStore } from "../../store/useStore";
import CommentSection from "../comments/CommentSection";

const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { currentNews, setCurrentNews } = useStore();

  useEffect(() => {
    if (!id) return;

    api.get(`/news/${id}`).then((res) => {
      setCurrentNews(res.data);
    });
  }, [id, setCurrentNews]);

  if (!currentNews) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{currentNews.title}</h1>
      <p className="text-sm text-gray-500">
        {new Date(currentNews.created_at).toLocaleDateString()}
      </p>
      {currentNews.image_url && (
        <img
          src={`http://localhost:3000${currentNews.image_url}`}
          alt={currentNews.title}
          className="w-full h-auto rounded"
        />
      )}
      <div className="prose max-w-none">{currentNews.content}</div>

      {id && <CommentSection newsId={Number(id)} />}
    </div>
  );
};

export default NewsDetailPage;
