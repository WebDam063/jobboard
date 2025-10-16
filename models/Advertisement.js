const db = require('../config/database');

class Advertisement {
    static async create(companyId, data) {
        const [result] = await db.query(
            `INSERT INTO advertisements 
            (company_id, title, short_description, full_description, location, 
             contract_type, working_time, salary_min, salary_max, is_active) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                companyId,
                data.title,
                data.short_description,
                data.full_description,
                data.location,
                data.contract_type,
                data.working_time,
                data.salary_min,
                data.salary_max,
                data.is_active !== undefined ? data.is_active : true
            ]
        );
        return result.insertId;
    }

    static async findById(id) {
        const [rows] = await db.query(`
            SELECT a.*, c.name as company_name, c.logo_url as company_logo
            FROM advertisements a
            JOIN companies c ON a.company_id = c.id
            WHERE a.id = ?
        `, [id]);
        return rows[0];
    }

    static async getAll(limit, offset, filters = {}) {
        let query = `
            SELECT a.*, c.name as company_name, c.logo_url as company_logo
            FROM advertisements a
            JOIN companies c ON a.company_id = c.id
        `;
        const conditions = [];
        const values = [];

        if (filters.is_active !== undefined) {
            conditions.push('a.is_active = ?');
            values.push(filters.is_active);
        }

        if (filters.company_id) {
            conditions.push('a.company_id = ?');
            values.push(filters.company_id);
        }

        if (filters.search) {
            conditions.push('(a.title LIKE ? OR a.short_description LIKE ? OR c.name LIKE ?)');
            const searchTerm = `%${filters.search}%`;
            values.push(searchTerm, searchTerm, searchTerm);
        }

        if (filters.location) {
            conditions.push('a.location LIKE ?');
            values.push(`%${filters.location}%`);
        }

        if (filters.contract_type) {
            conditions.push('a.contract_type = ?');
            values.push(filters.contract_type);
        }

        if (filters.working_time) {
            conditions.push('a.working_time = ?');
            values.push(filters.working_time);
        }

        if (filters.salary_min) {
            conditions.push('a.salary_max >= ?');
            values.push(filters.salary_min);
        }

        if (filters.salary_max) {
            conditions.push('a.salary_min <= ?');
            values.push(filters.salary_max);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY a.created_at DESC LIMIT ? OFFSET ?';
        values.push(limit, offset);

        const [rows] = await db.query(query, values);
        return rows;
    }

    static async count(filters = {}) {
        let query = `
            SELECT COUNT(*) as total 
            FROM advertisements a
            JOIN companies c ON a.company_id = c.id
        `;
        const conditions = [];
        const values = [];

        if (filters.is_active !== undefined) {
            conditions.push('a.is_active = ?');
            values.push(filters.is_active);
        }

        if (filters.company_id) {
            conditions.push('a.company_id = ?');
            values.push(filters.company_id);
        }

        if (filters.search) {
            conditions.push('(a.title LIKE ? OR a.short_description LIKE ? OR c.name LIKE ?)');
            const searchTerm = `%${filters.search}%`;
            values.push(searchTerm, searchTerm, searchTerm);
        }

        if (filters.location) {
            conditions.push('a.location LIKE ?');
            values.push(`%${filters.location}%`);
        }

        if (filters.contract_type) {
            conditions.push('a.contract_type = ?');
            values.push(filters.contract_type);
        }

        if (filters.working_time) {
            conditions.push('a.working_time = ?');
            values.push(filters.working_time);
        }

        if (filters.salary_min) {
            conditions.push('a.salary_max >= ?');
            values.push(filters.salary_min);
        }

        if (filters.salary_max) {
            conditions.push('a.salary_min <= ?');
            values.push(filters.salary_max);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const [rows] = await db.query(query, values);
        return rows[0].total;
    }

    static async update(id, data) {
        const fields = [];
        const values = [];

        const allowedFields = [
            'title', 'short_description', 'full_description', 'location',
            'contract_type', 'working_time', 'salary_min', 'salary_max', 'is_active'
        ];

        allowedFields.forEach(field => {
            if (data[field] !== undefined) {
                fields.push(`${field} = ?`);
                values.push(data[field]);
            }
        });

        values.push(id);

        const [result] = await db.query(
            `UPDATE advertisements SET ${fields.join(', ')} WHERE id = ?`,
            values
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM advertisements WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Advertisement;

