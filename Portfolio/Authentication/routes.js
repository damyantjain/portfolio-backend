import * as dao from "./dao.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { decrypt } from "../../util/encrypt.js";

export default function AuthenticationRoutes(app) {
  /**
   * @swagger
   * /api/login:
   *   post:
   *     summary: Log in a user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Successful login
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *       401:
   *         description: Invalid username or password
   */
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
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } catch (error) {
      res.status(500).send("Server error");
    }
  };

  /**
   * @swagger
   * /api/register:
   *   post:
   *     summary: Register a new user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       201:
   *         description: User created successfully
   *       400:
   *         description: Bad request, possibly due to missing fields or username already taken
   */
  const registerUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      const existingUser = await dao.findUserByUsername(username);
      if (existingUser) {
        return res.status(400).send("Username already taken");
      }
      const user = await dao.createUser(username, password);
      if (!user) {
        return res.status(400).send("Bad request");
      }
      res.status(201).send("User created successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  };

  /**
   * @swagger
   * /api/refresh-token:
   *   post:
   *     summary: Refresh the access token using the refresh token
   *     responses:
   *       200:
   *         description: Access token refreshed successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 accessToken:
   *                   type: string
   *       401:
   *         description: Invalid or missing refresh token
   */
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
  app.post("/api/register", registerUser);
  app.post("/api/refresh-token", refreshToken);
}
