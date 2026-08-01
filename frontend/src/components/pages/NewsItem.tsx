import { useState } from "react";
import type { NewsPreview } from "../../store/types";
import { Link } from "react-router-dom";

interface NewsItemProps {
  news: NewsPreview;
  onDelete: () => void;
}

const NewsItem = ({ news, onDelete }: NewsItemProps) => {
  const [imgSrc, setImgSrc] = useState(
    news.image_url
      ? `http://localhost:3000${news.image_url}`
      : "/uknownpost.jpg",
  );

  return (
    <div className="border p-4 rounded shadow-sm flex gap-4">
      <img
        src={imgSrc}
        alt={news.title}
        className="w-24 h-24 object-cover rounded shrink-0"
        onError={() => setImgSrc("/uknownpost.jpg")}
      />

      <div className="flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg">{news.title}</h3>
          <p className="text-sm text-gray-500">
            {new Date(news.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-4 flex gap-4">
          <Link
            to={`/news/${news.id}`}
            className="text-blue-600 hover:underline"
          >
            Read full post
          </Link>
          <button onClick={onDelete} className="text-red-600 hover:underline">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
