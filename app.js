import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./src/services/sequalize-service.js";
import * as User from "./src/services/user-service.js";
import { generateUsers } from "./src/utils/user-utils.js";
import authController from "./src/controllers/authController.js";
import hostController from "./src/controllers/hostController.js";
import userController from "./src/controllers/userController.js";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", authController);
app.use("/api/users", userController);
app.use("/api", hostController);

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
