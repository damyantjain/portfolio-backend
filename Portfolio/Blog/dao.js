import model from "./model.js";

export const findAllBlogs = () => model.find();
export const findBlogById = (id) => model.findById(id);
