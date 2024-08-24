import mongoose from "mongoose";

const analyticsSchema = mongoose.Schema({
    home: Number,
    blog: Number
});

export default analyticsSchema;