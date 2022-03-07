const { DataTypes } = require('sequelize');

const { sequelize } = require('../util/database');

const Todo = sequelize.define(
  'todo',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: false,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'active'
    }
  },
  {
    timestamps: false
  }
);

module.exports = { Todo };
