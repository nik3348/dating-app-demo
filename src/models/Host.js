import { DataTypes } from 'sequelize';
import sequelize from '../services/sequalize-service.js';

const Host = sequelize.define("Host", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  githubRepoUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Host;
