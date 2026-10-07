const db = require('../config/db');

const getAllExperiences = async () => {
    const [rows] = await db.query('SELECT * FROM experiences');
    return rows;
};

const getExperiencesById = async (id) => {
    const [rows] = await db.query('SELECT * FROM experiences WHERE id = ?', [id]);
    return rows[0];
};

const createExperiences = async (data) => {
    const { type, title, company, location, start_date, end_date, is_current, description } = data;
    const [result] = await db.query(
        'INSERT INTO experiences (type, title, company, location, start_date, end_date, is_current, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [type, title, company, location, start_date, end_date, is_current, description || false]
    );
    return result;
};

const updateExperiences = async (id, data) => {
    const { type, title, company, location, start_date, end_date, is_current, description } = data;
    const [result] = await db.query(
        'UPDATE experiences SET type = ?, title = ?, company = ?, location = ?, start_date = ?, end_date = ?, is_current = ?, description = ? WHERE id = ?',
        [type, title, company, location, start_date, end_date, is_current, description, id]
    );
    return result;
};

const deleteExperiences = async (id) => {
    const [result] = await db.query('DELETE FROM experiences WHERE id = ?', [id]);
    return result;
};

module.exports = {
    getAllExperiences,
    getExperiencesById,
    createExperiences,
    updateExperiences,
    deleteExperiences
};