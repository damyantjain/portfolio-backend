import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import mongoose from 'mongoose';
import session from 'express-session';
import BlogRoutes from './Portfolio/Blog/routes.js';
import swagger from './swagger.js';
import AuthenticationRoutes from './Portfolio/Authentication/routes.js';
import cors from 'cors';

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); 

app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true,
}));

const sessionOptions = {
  secret: 'some secret',
  saveUninitialized: false,
  resave: false,
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

if (process.env.NODE_ENV !== 'development') {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: 'none',
    secure: true,
  };
}

app.use(session(sessionOptions));

swagger(app);

BlogRoutes(app);
AuthenticationRoutes(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
