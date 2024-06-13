require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'PerformMentor_kr',
    'postgres',
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'postgres',
    }
);

module.exports = sequelize;