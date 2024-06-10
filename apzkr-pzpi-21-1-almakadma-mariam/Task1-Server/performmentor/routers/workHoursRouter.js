// workHoursRouter.js

const express = require('express');
const router = express.Router();
const workHoursController = require('../controllers/workHoursController');

router.post('/start', workHoursController.startWork);

router.post('/start-break', workHoursController.startBreak);
router.post('/end-break', workHoursController.endBreak);
router.post('/end', workHoursController.endWork);

router.get('/department/:department_id', workHoursController.getAllByDepartment);
router.get('/user/:user_id', workHoursController.getAllByUser);
router.get('/company/:companyId/users-with-work-hours', workHoursController.getWorkHoursByCompany);


/*
router.get('/check-overtime/:companyId', workHoursController.checkAndSendOvertimeNotifications);*/

module.exports = router;