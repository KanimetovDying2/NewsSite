import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/pages/HomePage";
import AddPostPage from "./components/pages/AddPostPage";
import NewsDetailPage from "./components/pages/NewsDetailPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="add" element={<AddPostPage />} />
        <Route path="news/:id" element={<NewsDetailPage />} />
      </Route>
    </Routes>
  );
};

export default App;
