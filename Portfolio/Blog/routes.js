import * as dao from "./dao.js";
import verifyJWT from "../../util/verifyJWT.js";

export default function BlogRoutes(app) {
  const findAllBlogs = async (req, res) => {
    try {
      const blogs = await dao.findAllBlogs();
      res.json(blogs);
    } catch (error) {
      res.status(500).send("Error retrieving blogs");
    }
  };

  const findBlogById = async (req, res) => {
    try {
      const id = req.params.id;
      const blog = await dao.findBlogById(id);
      if (!blog) {
        return res.status(404).send("Blog not found");
      }
      res.json(blog);
    } catch (error) {
      res.status(500).send("Error retrieving blog");
    }
  };

  const findPublishedBlogs = async (req, res) => {
    try {
      const blogs = await dao.findPublishedBlogs();
      res.json(blogs);
    } catch (error) {
      res.status(500).send("Error retrieving published blogs");
    }
  };

  const createBlog = async (req, res) => {
    try {
      const blog = req.body;
      const newBlog = await dao.createBlog(blog);
      res.status(201).json(newBlog);
    } catch (error) {
      res.status(500).send("Error creating blog");
    }
  };

  const updateBlog = async (req, res) => {
    try {
      const username = req.user.username;
      const id = req.params.id;
      const blog = req.body;
      const updatedBlog = await dao.updateBlog(id, blog);
      if (!updatedBlog) {
        return res.status(404).send("Blog not found");
      }
      res.send("Blog updated");
    } catch (error) {
      res.status(500).send("Error updating blog");
    }
  };

  app.get("/api/blogs", verifyJWT, findAllBlogs);
  app.get("/api/blogs/:id", findBlogById);
  app.post("/api/blogs", verifyJWT, createBlog);
  app.put("/api/blogs/:id", verifyJWT, updateBlog);
  app.get("/api/publishedblogs", findPublishedBlogs);
}
