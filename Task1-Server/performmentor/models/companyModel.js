// companyModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');
const bcrypt = require('bcrypt');

const Company = sequelize.define('Company', {
    company_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        set(value) {
            // Хешування пароля перед збереженням в базу даних
            const hashedPassword = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hashedPassword);
        },
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

}, {
    tableName: 'companies',
    timestamps: false,
});

module.exports = Company;