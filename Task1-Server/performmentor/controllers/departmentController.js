//departmentController.js
const departmentService = require('../services/DepartmentService');

exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await departmentService.getAllDepartments();
        if (departments.length === 0) {
            return res.status(404).json({ message: 'Відділ не знайдені' });
        }
        res.status(200).json(departments);
    } catch (error) {
        console.error('Помилка при отриманні відділів:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.createDepartment = async (req, res) => {
    const departmentData = req.body;

    try {
        console.log("Data received on the server:", departmentData); // Додайте цей рядок

        const newDepartment = await departmentService.createDepartment(departmentData);

        res.status(201).json({ message: 'Відділ успішно створено', department: newDepartment });
    } catch (error) {
        console.error('Помилка при створенні відділу:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.getDepartmentsByCompanyId = async (req, res) => {
    const { companyId } = req.params;
    const searchParams = req.body;

    try {
        const departments = await departmentService.getDepartmentsByCompanyId(companyId, searchParams);

        if (departments.length === 0) {
            return res.status(404).json({ message: 'Відділи не знайдені для цієї компанії або за вказаними параметрами пошуку' });
        }

        res.status(200).json(departments);
    } catch (error) {
        console.error('Помилка при отриманні відділів за company_id та пошуком за параметрами:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.updateDepartment = async (req, res) => {
    const { departmentId } = req.params;
    const updateData = req.body;

    try {
        console.log('departmentId:', departmentId);

        const updatedDepartment = await departmentService.updateDepartment(departmentId, updateData);

        res.status(200).json({ message: 'Відділ успішно оновлено', department: updatedDepartment });
    } catch (error) {
        if (error.message === 'Department not found') {
            return res.status(404).json({ message: 'Відділ не знайдено' });
        }
        console.error('Помилка при оновленні відділу:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.deleteDepartment = async (req, res) => {
    const { departmentId } = req.params;

    try {
        await departmentService.deleteDepartment(departmentId);
        res.status(200).json({ message: 'Відділ успішно видалено' });
    } catch (error) {
        if (error.message === 'Department not found') {
            return res.status(404).json({ message: 'Відділ не знайдено' });
        }
        console.error('Помилка при видаленні відділу:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

