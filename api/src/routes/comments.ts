import { Router } from "express";
import { pool } from "../db.js";

export const commentRoutes = Router();

commentRoutes.get("/", async (req, res) => {
  const { news_id } = req.query;

  try {
    if (news_id) {
      const [rows] = await pool.query(
        "SELECT * FROM comments WHERE news_id = ?",
        [news_id],
      );
      res.json(rows);
    } else {
      const [rows] = await pool.query("SELECT * FROM comments");
      res.json(rows);
    }
  } catch (error) {
    res.status(500).json({ error: "Error with getting comments" });
  }
});

commentRoutes.post("/", async (req, res) => {
  const { news_id, author, text } = req.body;

  if (!news_id || !text) {
    return res.status(400).json({ error: "News ID and text are required!" });
  }

  const commentAuthor = author || "Anonymous";

  try {
    const [news]: any = await pool.query("SELECT id FROM news WHERE id = ?", [
      news_id,
    ]);

    if (news.length === 0) {
      return res.status(404).json({ error: "News not found" });
    }
    const [result] = await pool.query(
      "INSERT INTO comments (news_id, author, text) VALUES (?, ?, ?)",
      [news_id, commentAuthor, text],
    );

    res.status(201).json({
      message: "Comment created",
      id: (result as any).insertId,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating comment" });
  }
});

commentRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result]: any = await pool.query(
      "DELETE FROM comments WHERE id = ?",
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting comment" });
  }
});
