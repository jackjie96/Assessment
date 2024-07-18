const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const StreamType = sequelize.define("StreamType", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = StreamType;
