import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("User", schema);
export default model;