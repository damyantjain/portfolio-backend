import * as dao from "./dao.js";

export default function BlogRoutes(app) {
  const findAllBlogs = async (req, res) => {
    const blogs = await dao.findAllBlogs();
    res.json(blogs);
  };

  app.get("/api/blogs", findAllBlogs);
}
