import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import BlogRoutes from "./Portfolio/Blog/routes.js";


const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(express.urlencoded({ extended: true }));
const sessionOptions = {
  secret: "some secret",
  saveUninitialized: false,
  resave: false,
};
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

app.use(session(sessionOptions));
app.use(express.json());
BlogRoutes(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});