import { api } from "../../api/axiosApi";
import { useStore } from "../../store/useStore";
import type { Comment } from "../../store/types";

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  const { setComments } = useStore();

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/comments/${id}`);

      setComments(comments.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="p-4 border rounded flex justify-between items-center"
        >
          <div>
            <p className="font-bold">{comment.author}</p>
            <p>{comment.text}</p>
          </div>
          <button
            onClick={() => handleDelete(comment.id)}
            className="text-red-500 text-sm hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
