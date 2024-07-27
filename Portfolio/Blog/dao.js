import model from "./model.js";

export const findAllBlogs = () => model.find({}, "title description date");
export const findPublishedBlogs = () =>
  model.find({ published: true }, "title description date");
export const findBlogById = (id) => model.findById(id);
export const createBlog = (blog) => model.create(blog);
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
