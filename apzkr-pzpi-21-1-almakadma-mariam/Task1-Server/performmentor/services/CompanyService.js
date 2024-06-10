//CompanyService.js
const Company = require('../models/companyModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllCompanies = async () => {
    return await Company.findAll();
};

exports.registerCompany = async ({ name, email, password, address }) => {
    return await Company.create({
        name,
        email,
        password,
        address,
    });
};

exports.loginCompany = async ({ email, password }) => {
    const company = await Company.findOne({ where: { email } });

    if (!company) {
        throw new Error('Company not found');
    }

    const passwordMatch = await bcrypt.compare(password, company.password);

    if (!passwordMatch) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ companyId: company.company_id }, 'your_secret_key', { expiresIn: '1h' });

    return { companyId: company.company_id, token };
};

exports.updateCompany = async (id, { name, address }) => {
    return await Company.update({ name, address }, { where: { company_id: id } });
};

exports.getCompanyById = async (id) => {
    const company = await Company.findByPk(id, {
        attributes: { exclude: ['password'] },
    });

    if (!company) {
        throw new Error('Company not found');
    }

    return company;
};
