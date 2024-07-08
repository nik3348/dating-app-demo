import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./src/services/sequalize-service.js";
import * as User from "./src/services/user-service.js";
import { generateUsers } from "./src/utils/user-utils.js";
import authenticateToken from "./src/middleware/authorizer.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/auth", async (req, res) => {
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

app.get("/users", async (req, res) => {
  const result = await User.getAllUsers();
  res.send(result);
});

app.get("/users/:userId", authenticateToken, async (req, res) => {
  const users = await User.getRecommendationsForUser(req.params.userId);
  res.send(users);
});

app.post("/users/:userId/like", authenticateToken, async (req, res) => {
  await User.liked(req.params.userId, req.query.id);
  res.status(201).send();
});

const init = async () => {
  try {
    await sequelize.sync({ force: true });
    await User.bulkCreate(generateUsers(100));

    console.log("Database synchronized.");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to synchronize the database:", error);
  }
};
init();
