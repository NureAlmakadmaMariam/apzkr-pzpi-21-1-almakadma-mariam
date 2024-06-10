//UserService.js
const Department = require('../models/departmentModel');
const User = require('../models/userModel');
const Company = require('../models/companyModel');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const transliteration = require('transliteration');

exports.getUsersByCompany = async (companyId, lastName) => {
    const departments = await Department.findAll({ where: { company_id: companyId } });
    const departmentIds = departments.map(department => department.department_id);

    const userWhere = { department_id: departmentIds };

    if (lastName) {
        userWhere.last_name = { [Op.like]: `%${lastName}%` };
    }

    return User.findAll({
        where: userWhere,
        attributes: { exclude: ['password'] },
        include: [{ model: Department, as: 'department', attributes: ['department_id', 'name', 'department_code'] }],
    });
};

exports.getUsersByDepartment = (departmentId) => {
    return User.findAll({
        where: { department_id: departmentId },
        attributes: { exclude: ['password'] },
    });
};

exports.getAllUsers = () => {
    return User.findAll();
};

exports.deleteUser = async (userId) => {
    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error('User not found');
    }

    await user.destroy();
};

exports.createUser = async ({ first_name, last_name, department_id, start_date }) => {
    const latinFirstName = transliteration.transliterate(first_name);
    const latinLastName = transliteration.transliterate(last_name);
    const generatedEmail = `${latinFirstName.toLowerCase()}.${latinLastName.toLowerCase()}@example.com`;
    const generatedPassword = Math.random().toString(36).slice(-8);

    return User.create({
        first_name,
        last_name,
        email: generatedEmail,
        password: generatedPassword,
        department_id,
        start_date,
    });
};

exports.updateUser = async (userId, updates) => {
    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error('User not found');
    }

    Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined) {
            user[key] = value;
        }
    });

    await user.save();
    return user;
};

exports.getUserById = (userId) => {
    return User.findByPk(userId, {
        include: [
            { model: Department, as: 'department', attributes: ['department_id', 'name'] },
            { model: Department, as: 'department', include: { model: Company, as: 'company', attributes: ['company_id', 'name'] } },
        ],
        attributes: { exclude: ['password'] },
    });
};

exports.updateUserPassword = async (userId, newPassword) => {
    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error('User not found');
    }

    await user.update({ password: newPassword });
};

exports.login = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Invalid password');
    }

    return { user_id: user.user_id, role: user.role, department_id: user.department_id };
};
