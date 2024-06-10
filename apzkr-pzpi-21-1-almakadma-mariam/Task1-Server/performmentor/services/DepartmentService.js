//DepartmentService.js
const Department = require('../models/departmentModel');
const { Op } = require('sequelize');

exports.getAllDepartments = async () => {
    return await Department.findAll();
};

exports.createDepartment = async (departmentData) => {
    const { name, description, departmentCode, contactPersonName, contactPersonEmail, contactPersonPhone, company_id } = departmentData;

    const newDepartment = await Department.create({
        name,
        description,
        department_code: departmentCode,
        contact_person_name: contactPersonName,
        contact_person_email: contactPersonEmail,
        contact_person_phone: contactPersonPhone,
        company_id
    });

    return newDepartment;
};

exports.getDepartmentsByCompanyId = async (companyId, searchParams) => {
    const { searchByDepartmentCode, searchByName, searchByContactPersonName, sortBy, sortOrder } = searchParams;

    const whereCondition = { company_id: companyId };

    if (searchByDepartmentCode) {
        whereCondition.department_code = { [Op.like]: `%${searchByDepartmentCode}%` };
    }
    if (searchByName) {
        whereCondition.name = { [Op.like]: `%${searchByName}%` };
    }
    if (searchByContactPersonName) {
        whereCondition.contact_person_name = { [Op.like]: `%${searchByContactPersonName}%` };
    }

    let order = [];
    if (sortBy) {
        order.push([sortBy, sortOrder || 'asc']);
    }

    const departments = await Department.findAll({
        where: whereCondition,
        order: order,
    });

    return departments;
};

exports.updateDepartment = async (departmentId, updateData) => {
    const { description, departmentCode, contactPersonName, contactPersonEmail, contactPersonPhone } = updateData;

    const department = await Department.findByPk(departmentId);

    if (!department) {
        throw new Error('Department not found');
    }

    const fieldsToUpdate = {
        description,
        department_code: departmentCode,
        contact_person_name: contactPersonName,
        contact_person_email: contactPersonEmail,
        contact_person_phone: contactPersonPhone
    };

    Object.entries(fieldsToUpdate).forEach(([key, value]) => {
        if (value !== undefined) {
            department[key] = value;
        }
    });
    await department.save({ timestamps: false });

    return department;
};

exports.deleteDepartment = async (departmentId) => {
    const department = await Department.findByPk(departmentId);

    if (!department) {
        throw new Error('Department not found');
    }

    await department.destroy();

    return department;
};
