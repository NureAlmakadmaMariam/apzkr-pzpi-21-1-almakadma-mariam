// reportController.js
const reportService = require('../services/ReportService');

exports.getTaskStatusReport = async (req, res) => {
    try {
        const companyId = req.params.company_id;
        const report = await reportService.getTaskStatusReport(companyId);
        res.json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
