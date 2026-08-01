import { useState } from "react";
import { api } from "../../api/axiosApi";
import { useStore } from "../../store/useStore";

const CommentForm = ({ newsId }: { newsId: number }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const { setComments, comments } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);

    try {
      const res = await api.post("/comments", {
        news_id: newsId,
        text,
        author: author.trim() || "Anonymous",
      });

      setComments([...comments, res.data]);
      setText("");
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to send comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Your Name (optional)"
        disabled={isSubmitting}
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Write a comment..."
        disabled={isSubmitting}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default CommentForm;
