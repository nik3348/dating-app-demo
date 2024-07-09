import * as User from "../services/user-service.js";
import jwt from "jsonwebtoken";
import express from "express";

const router = express.Router();

router.post("/auth", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("Username and password are required.");
    return;
  }

  const user = await User.getUserByUsername(username);
  if (!user || user.password !== password) {
    res.status(401).send("Invalid username or password.");
    return;
  }

  const payload = {
    userId: user.id,
    username: username,
    password: password,
  };
  const options = {
    expiresIn: "1h",
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
  res.send({ token, userId: user.id });
});

export default router;
