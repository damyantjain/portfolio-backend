import * as dao from "./dao.js";

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blogs
 *     responses:
 *       200:
 *         description: A list of blogs
 */
export default function BlogRoutes(app) {
  const findAllBlogs = async (req, res) => {
    const blogs = await dao.findAllBlogs();
    res.json(blogs);
  };

  /**
   * @swagger
   * /api/blogs/{id}:
   *   get:
   *     summary: Get a blog by ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *     responses:
   *       200:
   *         description: A single blog
   */
  const findBlogById = async (req, res) => {
    try {
      const id = req.params.id;
      const blog = await dao.findBlogById(id);
      res.json(blog);
    } catch (error) {
      res.status(404).send("Blog not found");
    }
  };

  app.get("/api/blogs", findAllBlogs);
  app.get("/api/blogs/:id", findBlogById);
}
