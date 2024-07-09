import authenticateToken from "../middleware/authorizer.js";
import * as User from "../services/user-service.js";
import express from "express";

const router = express.Router();

router.get("", async (req, res) => {
  const users = await User.getAllUsers();
  res.send(users);
});

router.get("/:userId", authenticateToken, async (req, res) => {
  const users = await User.getRecommendationsForUser(req.params.userId);
  res.send(users);
});

router.post("/:userId/like", authenticateToken, async (req, res) => {
  await User.liked(req.params.userId, req.query.id);
  res.status(201).send();
});

router.post("/:userId/dislike", authenticateToken, async (req, res) => {
  await User.liked(req.params.userId, req.query.id);
  res.status(201).send();
});

export default router;
