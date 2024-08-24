import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("Analytics", schema);
export default model;