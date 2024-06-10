// workHoursController.js
const workHoursService = require('../services/workHoursService');

exports.startWork = async (req, res) => {
    const { user_id } = req.body;
    try {
        const workHour = await workHoursService.startWork(user_id);
        res.status(201).json(workHour);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.startBreak = async (req, res) => {
    const { user_id } = req.body;
    try {
        const workHour = await workHoursService.startBreak(user_id);
        res.json(workHour);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.endBreak = async (req, res) => {
    const { user_id } = req.body;
    try {
        const workHour = await workHoursService.endBreak(user_id);
        res.json({ message: 'The end of the day recorded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.endWork = async (req, res) => {
    const { user_id } = req.body;
    try {
        const workHour = await workHoursService.endWork(user_id);
        res.json({ message: 'Work period ended successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAllByDepartment = async (req, res) => {
    const { department_id } = req.params;
    try {
        const workHours = await workHoursService.getAllByDepartment(department_id);
        res.json(workHours);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAllByUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const workHours = await workHoursService.getAllByUser(user_id);
        res.json(workHours);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getWorkHoursByCompany = async (req, res) => {
    const companyId = req.params.companyId;
    try {
        const workHours = await workHoursService.getWorkHoursByCompany(companyId);
        res.status(200).json({ work_hours: workHours });
    } catch (error) {
        console.error('Error fetching work hours:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

