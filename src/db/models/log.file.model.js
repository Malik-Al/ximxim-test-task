const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

exports.LogFile = sequelize.define('LogFile', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    file_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action_type:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.TIME,
        allowNull: false,
    }
  });