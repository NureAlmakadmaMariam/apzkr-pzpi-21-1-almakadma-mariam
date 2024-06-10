//rewardRouter.js
const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');

router.post('/:companyId/', rewardController.createReward);
router.get('/:companyId', rewardController.getRewardsByCompany);
router.get('/department/:departmentId', rewardController.getRewardsByDepartment);

module.exports = router;