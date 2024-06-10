// companyController.js
const companyService = require('../services/CompanyService');

exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await companyService.getAllCompanies();
        if (companies.length === 0) {
            return res.status(404).json({ message: 'Список компаній порожній' });
        }
        res.status(200).json(companies);
    } catch (error) {
        console.error('Помилка при отриманні списку компаній:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.registerCompany = async (req, res) => {
    const { name, email, password, address } = req.body;

    try {
        const newCompany = await companyService.registerCompany({ name, email, password, address });
        res.status(201).json({ message: 'Компанія успішно зареєстрована', company: newCompany });
    } catch (error) {
        console.error('Помилка при реєстрації компанії:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.loginCompany = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { companyId, token } = await companyService.loginCompany({ email, password });
        res.status(200).json({ message: 'Успішний вхід', companyId, token });
    } catch (error) {
        if (error.message === 'Company not found') {
            return res.status(404).json({ message: 'Компанія з таким емейлом не знайдена' });
        }
        if (error.message === 'Invalid password') {
            return res.status(401).json({ message: 'Невірний пароль' });
        }
        console.error('Помилка при вході компанії:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.updateCompany = async (req, res) => {
    const { id } = req.params;
    const { name, address } = req.body;

    try {
        await companyService.updateCompany(id, { name, address });
        res.status(200).json({ message: 'Дані компанії успішно оновлені' });
    } catch (error) {
        console.error('Помилка при оновленні даних компанії:', error);
        res.status(500).json({ message: 'Помилка сервера', error });
    }
};

exports.getCompanyById = async (req, res) => {
    const { id } = req.params;

    try {
        const company = await companyService.getCompanyById(id);
        res.status(200).json(company);
    } catch (error) {
        if (error.message === 'Company not found') {
            return res.status(404).json({ message: 'Компанію не знайдено' });
        }
        console.error('Помилка при отриманні даних компанії:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};
