import mongoose from "mongoose";
import bycrypt from "bcrypt";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin", "contributor"], default: "user" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bycrypt.hash(this.password, 12);
  next();
});

export default userSchema;
