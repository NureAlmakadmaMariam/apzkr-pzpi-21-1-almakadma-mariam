//AchievementService.js
const Achievement = require('../models/achievementModel');
const User = require('../models/userModel');
const Department = require('../models/departmentModel');
const userService = require('./UserService');

exports.createAchievement = async ({ title, description, points_awarded, user_id, date_achieved }) => {
    if (!date_achieved) {
        date_achieved = new Date();
    }

    const achievement = await Achievement.create({
        title,
        description,
        points_awarded,
        date_achieved,
        user_id,
    });

    if (points_awarded) {
        const user = await User.findByPk(user_id);
        if (user) {
            user.points = user.points ? user.points + points_awarded : points_awarded;
            await user.save();
        }
    }

    return achievement;
};

exports.deleteAchievementById = async (achievementId) => {
    const achievement = await Achievement.findByPk(achievementId);
    if (!achievement) {
        throw new Error('Achievement not found');
    }

    await achievement.destroy();
    return achievement;
};

exports.getAchievementsByCompany = async (companyId, departmentId) => {
    const users = await userService.getUsersByCompany(companyId);

    const userFilter = { user_id: users.map(user => user.user_id) };

    if (departmentId) {
        const usersByDepartment = users.filter(user => user.department_id === departmentId);
        userFilter.user_id = usersByDepartment.map(user => user.user_id);
    }

    const achievements = await Achievement.findAll({
        attributes: [
            'achievement_id',
            'title',
            'description',
            'points_awarded',
            'date_achieved'
        ],
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['user_id', 'email', 'role'],
                include: [
                    {
                        model: Department,
                        as: 'department',
                        attributes: ['department_id', 'name']
                    }
                ]
            }
        ],
        where: userFilter
    });

    return achievements;
};

exports.getAchievementsByUser = async (user_id) => {
    const achievements = await Achievement.findAll({
        where: { user_id },
        attributes: ['achievement_id', 'title', 'description', 'points_awarded', 'date_achieved'],
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['user_id', 'email', 'role'],
                include: [
                    {
                        model: Department,
                        as: 'department',
                        attributes: ['department_id', 'name']
                    }
                ]
            }
        ]
    });

    return achievements;
};
