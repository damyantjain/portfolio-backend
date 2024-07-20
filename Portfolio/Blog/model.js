import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("Blog", schema);
export default model;