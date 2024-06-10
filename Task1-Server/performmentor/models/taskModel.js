// taskModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');
const User = require('./userModel');


const Task = sequelize.define('Task', {
    task_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('open', 'in_progress', 'closed', 'frozen'),
        defaultValue: 'open',
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'tasks',
    timestamps: false,


});
module.exports = Task;


