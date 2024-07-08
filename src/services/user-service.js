import User from "../models/User.js";
import { Op } from "sequelize";

export const createUser = async (newUser) => {
  try {
    return await User.create(newUser);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const bulkCreate = async (users) => {
  try {
    await User.bulkCreate(users);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const getUser = async (id) => {
  try {
    return await User.findByPk(id);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const getUserByUsername = async (username) => {
  try {
    return await User.findOne({
      where: {
        username,
      },
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export const getAllUsers = async () => {
  try {
    return await User.findAll();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const getRecommendationsForUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }

    const allUsers = await User.findAll({
      attributes: {
        exclude: ["username", "password", "swipes", "createdAt", "updatedAt"],
      },
      where: {
        id: {
          [Op.ne]: user.id,
          [Op.notIn]: user.swipes,
        },
      },
    });

    const recommendations = allUsers.map((row) => {
      const commonInterests = row.interests.filter((interest) =>
        user.interests.includes(interest)
      ).length;
      const sameUniversity = row.university === user.university ? 1 : 0;

      // For each common interest +2, for the same university +3, and a random decimal
      const score = commonInterests * 2 + sameUniversity * 3 + Math.random();
      return { ...row.get(), score };
    });

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(({ score, ...rest }) => rest);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const liked = async (userId, likedUserId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.update({
      swipes: [...user.swipes, likedUserId],
    });

    return;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
