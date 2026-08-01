import type { NewsPreview } from "../../store/types";
import { Link } from "react-router-dom";

interface NewsItemProps {
  news: NewsPreview;
  onDelete: () => void;
}

const NewsItem = ({ news, onDelete }: NewsItemProps) => {
  return (
    <div className="border p-4 rounded shadow-sm">
      <h3 className="font-bold text-lg">{news.title}</h3>
      <p className="text-sm text-gray-500">
        {new Date(news.created_at).toLocaleDateString()}
      </p>

      <div className="mt-4 flex gap-4">
        <Link to={`/news/${news.id}`} className="text-blue-600">
          Read more
        </Link>
        <button onClick={onDelete} className="text-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};

export default NewsItem;
