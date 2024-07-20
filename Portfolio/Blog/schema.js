import mongoose from "mongoose";
const imageSchema = new mongoose.Schema({
  name: String,
  url: String,
});
const blogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    date: { type: Date, default: Date.now },
    content: String,
    image: [imageSchema],
  },
  { collection: "blogs" }
);

export default blogSchema;
