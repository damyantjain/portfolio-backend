import mongoose from "mongoose";

const contentBlockSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    content: { type: String, required: true },
    alt: { type: String },
    caption: { type: String },
    width: { type: Number },
    height: { type: Number },
    alignment: { type: String },
    credits: { type: String },
    _id: { type: String, required: true },
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    published: { type: Boolean, default: false },
    contentBlocks: [contentBlockSchema],
    author: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export default blogSchema;
