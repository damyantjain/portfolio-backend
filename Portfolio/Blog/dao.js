import model from "./model.js";

export const findAllBlogs = () => model.find({}, 'title description date');
export const findBlogById = (id) => model.findById(id);
