import { Router } from "express";
import { pool } from "../db.js";
import { upload } from "../middleware/upload.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export const newsRoutes = Router();

newsRoutes.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id, title, image_url, created_at FROM news",
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении новостей" });
  }
});

newsRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM news WHERE id = ?",
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "News not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error with getting news" });
  }
});

newsRoutes.post("/", upload.single("image"), async (req, res) => {
  const { title, content } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required!" });
  }

  try {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO news (title, content, image_url) VALUES (?, ?, ?)",
      [title, content, image_url],
    );
    res.status(201).json({ message: "News was created", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Error with creating new" });
  }
});

newsRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM comments WHERE news_id = ?", [id]);

    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM news WHERE id = ?",
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "News was not found" });
    }

    res.json({ message: "News and its comments were deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error with deleting news" });
  }
});
