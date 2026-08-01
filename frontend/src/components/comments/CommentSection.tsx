import { useEffect } from "react";
import { api } from "../../api/axiosApi";
import { useStore } from "../../store/useStore";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

interface CommentSectionProps {
  newsId: number;
}

const CommentSection = ({ newsId }: CommentSectionProps) => {
  const { comments, setComments } = useStore();

  useEffect(() => {
    api.get(`/comments?news_id=${newsId}`).then((res) => {
      setComments(res.data);
    });
  }, [newsId, setComments]);

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      <CommentForm newsId={newsId} />
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentSection;
