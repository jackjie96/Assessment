const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Customer = require("./Customer");
const StreamType = require("./StreamType");

const CampaignBooking = sequelize.define("CampaignBooking", {
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "Customers",
      key: "id",
    },
  },
  streamTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "StreamTypes",
      key: "id",
    },
  },
  budget: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  budget_balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

CampaignBooking.belongsTo(Customer, { foreignKey: "customerId" });
CampaignBooking.belongsTo(StreamType, { foreignKey: "streamTypeId" });

Customer.hasMany(CampaignBooking, { foreignKey: "customerId" });
StreamType.hasMany(CampaignBooking, { foreignKey: "streamTypeId" });

module.exports = CampaignBooking;
