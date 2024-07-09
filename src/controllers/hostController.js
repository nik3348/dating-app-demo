import * as Host from "../services/host-service.js";
import { v4 as uuidv4 } from "uuid";
import { exec } from "child_process";
import express from "express";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { githubRepoUrl } = req.body;
  if (!githubRepoUrl) {
    return res.status(400).json({ error: "GitHub repo URL is required" });
  }

  const hostId = uuidv4();
  const port = Math.floor(Math.random() * 1000) + 10000;
  const containerName = `service_${hostId}`;

  const dockerCommand = `
    docker run -d --name ${containerName} -p ${port}:3000 node:16 bash -c "
    git clone ${githubRepoUrl} ./app && cd ./app && npm install && npm start"
  `;

  exec(dockerCommand, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: "Failed to start service" });
    }

    const url = `localhost:${port}`;
    await Host.registerHost(hostId, githubRepoUrl, url);
    res.status(201).json({ id: hostId, url });
  });
});

router.get("/host/:id", async (req, res) => {
  const host = await Host.getHost(req.params.id);
  res.json({ url: host.url });
});

export default router;
