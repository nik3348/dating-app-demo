import Host from "../models/Host.js";

export const registerHost = async (hostId, githubRepoUrl, url) => {
  try {
    await Host.create({ id: hostId, githubRepoUrl, url });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const getHost = async (hostId) => {
  try {
    return await Host.findByPk(hostId);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
