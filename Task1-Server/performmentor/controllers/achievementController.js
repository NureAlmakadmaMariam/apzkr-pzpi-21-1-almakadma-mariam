// achievementController.js
const achievementService = require('../services/AchievementService');

exports.createAchievement = async (req, res) => {
    try {
        const { title, description, points_awarded, user_id, date_achieved } = req.body;

        const achievement = await achievementService.createAchievement({ title, description, points_awarded, user_id, date_achieved });

        return res.status(201).json({ message: 'Achievement created successfully', achievement });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteAchievementById = async (req, res) => {
    try {
        const achievementId = req.params.achievementId;

        await achievementService.deleteAchievementById(achievementId);

        return res.status(200).json({ message: 'Achievement deleted successfully' });
    } catch (error) {
        if (error.message === 'Achievement not found') {
            return res.status(404).json({ message: 'Achievement not found' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAchievementsByCompany = async (req, res) => {
    const companyId = req.params.companyId;
    const departmentId = req.query.departmentId; // Assuming the department ID is passed as a query parameter

    try {
        const achievements = await achievementService.getAchievementsByCompany(companyId, departmentId);

        res.status(200).json({
            achievements: achievements
        });
    } catch (error) {
        console.error('Error fetching achievements:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

exports.getAchievementsByUser = async (req, res) => {
    try {
        const user_id = req.params.user_id;

        const achievements = await achievementService.getAchievementsByUser(user_id);

        if (!achievements || achievements.length === 0) {
            return res.status(404).json({ error: 'Achievements not found' });
        }

        res.json(achievements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
