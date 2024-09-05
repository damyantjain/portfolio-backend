import model from "./model.js";

export const findAllBlogs = () =>
  model.find({}, "title description updatedAt image");
export const findPublishedBlogs = () =>
  model.find({ published: true }, "title description updatedAt image");
export const findBlogById = (id) => model.findById(id);
export const createBlog = (blog) => model.create(blog);
export const updateBlogVisitorCount = async (id) => {
  try {
    const blog = await model.findById(id);
    if (!blog) {
      return false;
    }
    blog.views += 1;
    await blog.save();
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateBlog = async (id, blog) => {
  try {
    return await model.findByIdAndUpdate(id, blog, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};