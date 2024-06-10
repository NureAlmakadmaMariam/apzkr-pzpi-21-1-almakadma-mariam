//userController.js
const userService = require('../services/UserService');

exports.getUsersByCompany = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const lastName = req.query.last_name;
        const users = await userService.getUsersByCompany(companyId, lastName);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUsersByDepartment = async (req, res) => {
    try {
        const departmentId = req.params.department_id;
        const users = await userService.getUsersByDepartment(departmentId);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        await userService.deleteUser(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { first_name, last_name, department_id, start_date } = req.body;
        const newUser = await userService.createUser({ first_name, last_name, department_id, start_date });
        res.status(201).json({
            message: 'User created successfully',
            newUser: {
                ...newUser.toJSON(),
                email: newUser.email,
                password: newUser.password,
            },
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const { role, department_id, first_name, last_name } = req.body;
        const updatedUser = await userService.updateUser(userId, { role, department_id, first_name, last_name });
        res.json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateUserPassword = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { newPassword } = req.body;
        await userService.updateUserPassword(user_id, newPassword);
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.login(email, password);
        res.json(user);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
