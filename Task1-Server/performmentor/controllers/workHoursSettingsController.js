// controllers/workHoursSettingsController.js
const workHoursSettingsService = require('../services/workHoursSettingsService');

exports.getAllByCompanyId = async (req, res) => {
    const { company_id } = req.params;
    try {
        const settings = await workHoursSettingsService.getAllByCompanyId(company_id);
        res.json(settings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAll = async (req, res) => {
    try {
        const settings = await workHoursSettingsService.getAll();
        res.json(settings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateHoursSettings = async (req, res) => {
    const { setting_id } = req.params;
    try {
        const updatedSettings = await workHoursSettingsService.updateHoursSettings(setting_id, req.body);
        res.json(updatedSettings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.create = async (req, res) => {
    try {
        const newSettings = await workHoursSettingsService.create(req.body);
        res.status(201).json(newSettings);
    } catch (error) {
        if (error.message === 'Company not found') {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};