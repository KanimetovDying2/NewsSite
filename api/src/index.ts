import express from "express";
import cors from "cors";
import { newsRoutes } from "./routes/news.js";
import { commentRoutes } from "./routes/comments.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/news", newsRoutes);
app.use("/comments", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
