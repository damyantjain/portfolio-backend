import * as dao from "./dao.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { decrypt } from "../../util/encrypt.js";
import verifyJWT from "../../util/verifyJWT.js";


export default function AuthenticationRoutes(app) {
  
  const userLogin = async (req, res) => {
    try {
      const decryptedUsername = decrypt(req.body.username);
      const decryptedPassword = decrypt(req.body.password);
      const user = await dao.findUserByUsername(decryptedUsername);

      if (!user) {
        res.status(401).send("Invalid username or password");
        return;
      }
      const isPasswordValid = await bcrypt.compare(
        decryptedPassword,
        user.password
      );
      if (!isPasswordValid) {
        res.status(401).send("Invalid username or password");
        return;
      }
      const accessToken = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production"? 'Strict' : 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } catch (error) {
      res.status(500).send("Server error");
    }
  };

  const registerUser = async (req, res) => {
    try {
      
      const username = req.user.username;
      const user = await userDao.findUserByUsername(username);
      if(user.role !== "admin") {
        return res.status(403).send("You are not authorized to update blogs");
      }
      const decryptedUsername = decrypt(req.body.username);
      const decryptedPassword = decrypt(req.body.password);
      const existingUser = await dao.findUserByUsername(decryptedUsername);
      if (existingUser) {
        return res.status(400).send("Username already taken");
      }
      const newUser = await dao.createUser(decryptedUsername, decryptedPassword);
      if (!newUser) {
        return res.status(400).send("Bad request");
      }
      res.status(201).send("User created successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  };

  const refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).send("No refresh token provided");
    }
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      const accessToken = jwt.sign(
        { username: decoded.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ accessToken });
    } catch (error) {
      res.status(401).send("Invalid refresh token");
    }
  };

  app.post("/api/login", userLogin);
  app.post("/api/register", verifyJWT, registerUser);
  app.post("/api/refresh-token", refreshToken);
}
