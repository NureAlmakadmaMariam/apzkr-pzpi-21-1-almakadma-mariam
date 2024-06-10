// workHoursService.js
const WorkHours = require('../models/workHoursModel');
const WorkHoursSettings = require('../models/workHoursSettingsModel')
const User = require('../models/userModel');
const Department = require('../models/departmentModel');
const userService = require('../services/UserService');
const sequelize = require('../configuration/dbConfig');

exports.startWork = async (userId) => {
    const startTime = new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'Europe/Copenhagen' });
    return WorkHours.create({ user_id: userId, date: new Date(), start_time: startTime });
};

exports.startBreak = async (userId) => {
    const workHour = await WorkHours.findOne({ where: { user_id: userId, date: new Date() } });
    if (!workHour) {
        throw new Error('Work hour not found');
    }

    const breakStartTime = new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'Europe/Copenhagen' });
    workHour.break_start_time = breakStartTime;
    await workHour.save();
    return workHour;
};

exports.endBreak = async (userId) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const workHour = await WorkHours.findOne({ where: { user_id: userId, date: currentDate } });

    if (!workHour) {
        throw new Error('Work hour not found');
    }

    if (!workHour.break_start_time || workHour.break_end_time) {
        throw new Error('Break has already ended or not started');
    }

    const breakEndTime = new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'Europe/Copenhagen' });
    workHour.break_end_time = breakEndTime;

    await workHour.save();
    return workHour;
};

exports.endWork = async (userId) => {
    const workHour = await WorkHours.findOne({ where: { user_id: userId, date: new Date() } });
    if (!workHour) {
        throw new Error('Work hour not found');
    }

    if (workHour.end_time) {
        throw new Error('Work period has already ended');
    }

    if (!workHour.start_time) {
        throw new Error('Start time not set');
    }

    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'Europe/Copenhagen' });
    workHour.end_time = currentTime;

    const startTime = new Date(`${workHour.date} ${workHour.start_time}`);
    const endTime = new Date();
    const totalWorkDurationMilliseconds = endTime - startTime;
    const totalWorkDurationMinutes = Math.floor(totalWorkDurationMilliseconds / (1000 * 60));

    if (workHour.break_start_time && workHour.break_end_time) {
        const breakStartTime = new Date(`${workHour.date} ${workHour.break_start_time}`);
        const breakEndTime = new Date(`${workHour.date} ${workHour.break_end_time}`);
        const breakDurationMilliseconds = breakEndTime - breakStartTime;
        const breakDurationMinutes = Math.floor(breakDurationMilliseconds / (1000 * 60));

        workHour.total_break_duration_minutes = breakDurationMinutes;
        workHour.total_work_duration_minutes = totalWorkDurationMinutes - breakDurationMinutes;
    } else {
        workHour.total_work_duration_minutes = totalWorkDurationMinutes;
    }

    const user = await User.findByPk(workHour.user_id, { include: { association: 'department' } });
    if (!user) {
        throw new Error('User not found');
    }

    const companyId = user?.department?.company_id;
    if (!companyId) {
        throw new Error('Company ID not found for the user');
    }

    const workHoursSettings = await WorkHoursSettings.findOne({ where: { company_id: companyId } });
    if (!workHoursSettings) {
        throw new Error('Work hours settings not found');
    }

    const { hours_per_day } = workHoursSettings;
    if (!hours_per_day) {
        throw new Error('Hours per day not set in work hours settings');
    }

    const overtimeMinutes = totalWorkDurationMinutes - (hours_per_day * 60);
    workHour.total_overtime_minutes = Math.max(overtimeMinutes, 0);

    await workHour.save();
    return workHour;
};

exports.getAllByDepartment = async (departmentId) => {
    return WorkHours.findAll({
        include: [
            {
                association: 'user',
                attributes: { exclude: ['password', 'status_id'] },
                where: { department_id: departmentId },
                include: {
                    association: 'department',
                    attributes: ['department_id', 'name'],
                    include: {
                        association: 'company',
                        attributes: ['name', 'email']
                    }
                }
            }
        ],
        order: [['date', 'ASC']]
    });
};

exports.getAllByUser = async (userId) => {
    const workHours = await WorkHours.findAll({
        where: { user_id: userId },
        order: [['date', 'DESC']],
        attributes: {
            include: [
                [sequelize.literal('total_overtime_minutes / 60'), 'total_overtime_hours']
            ]
        }
    });
    return workHours;
};


exports.getWorkHoursByCompany = async (companyId) => {
    const users = await userService.getUsersByCompany(companyId);

    return WorkHours.findAll({
        attributes: [
            'work_hours_id',
            'user_id',
            'date',
            'start_time',
            'end_time',
            'total_break_duration_minutes',
            'total_work_duration_minutes',
            'total_overtime_minutes'
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
        where: {
            user_id: users.map(user => user.user_id)
        }
    });
};





/*const WorkHours = require('../models/workHoursModel');
const WorkHoursSettings  = require('../models/workHoursSettingsModel');
const User = require('../models/userModel');

exports.endWorkPeriod = async (workHoursId) => {
    const workHour = await WorkHours.findByPk(workHoursId);
    if (!workHour) {
        throw new Error('Work hour not found');
    }

    if (workHour.end_time) {
        throw new Error('Work period has already ended');
    }

    if (!workHour.start_time) {
        throw new Error('Start time not set');
    }

    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'Europe/Copenhagen' });
    workHour.end_time = currentTime;

    const currentDate = new Date();
    const startTime = new Date(`${currentDate.toDateString()} ${workHour.start_time}`);
    const endTime = new Date(`${currentDate.toDateString()} ${currentTime}`);
    const workDurationMilliseconds = endTime - startTime;
    const totalWorkDurationMinutes = Math.floor(workDurationMilliseconds / (1000 * 60));
    workHour.total_work_duration_minutes = totalWorkDurationMinutes;

    const user = await User.findByPk(workHour.user_id, { include: { association: 'department' } });
    if (!user) {
        throw new Error('User not found');
    }

    const companyId = user?.department?.company_id;
    if (!companyId) {
        throw new Error('Company ID not found for the user');
    }

    const workHoursSettings = await WorkHoursSettings.findOne({ where: { company_id: companyId } });
    if (!workHoursSettings) {
        throw new Error('Work hours settings not found');
    }

    const { hours_per_day } = workHoursSettings;
    if (!hours_per_day) {
        throw new Error('Hours per day not set in work hours settings');
    }

    const overtimeMinutes = totalWorkDurationMinutes - (hours_per_day * 60);
    workHour.total_overtime_minutes = Math.max(overtimeMinutes, 0);

    await workHour.save();
};
*/
