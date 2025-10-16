const db = require('../config/database');

class Company {
    static async create(userId, name, description = null, website = null, logoUrl = null) {
        const [result] = await db.query(
            'INSERT INTO companies (user_id, name, description, website, logo_url) VALUES (?, ?, ?, ?, ?)',
            [userId, name, description, website, logoUrl]
        );
        return result.insertId;
    }

    static async findById(id) {
        const [rows] = await db.query(`
            SELECT c.*, u.email, u.role, u.created_at as user_created_at
            FROM companies c
            JOIN users u ON c.user_id = u.id
            WHERE c.id = ?
        `, [id]);
        return rows[0];
    }

    static async findByUserId(userId) {
        const [rows] = await db.query('SELECT * FROM companies WHERE user_id = ?', [userId]);
        return rows[0];
    }

    static async getAll(limit, offset) {
        const [rows] = await db.query(`
            SELECT c.*, u.email
            FROM companies c
            JOIN users u ON c.user_id = u.id
            LIMIT ? OFFSET ?
        `, [limit, offset]);
        return rows;
    }

    static async count() {
        const [rows] = await db.query('SELECT COUNT(*) as total FROM companies');
        return rows[0].total;
    }

    static async update(id, data) {
        const fields = [];
        const values = [];

        if (data.name) {
            fields.push('name = ?');
            values.push(data.name);
        }
        if (data.description !== undefined) {
            fields.push('description = ?');
            values.push(data.description);
        }
        if (data.website !== undefined) {
            fields.push('website = ?');
            values.push(data.website);
        }
        if (data.logo_url !== undefined) {
            fields.push('logo_url = ?');
            values.push(data.logo_url);
        }

        values.push(id);

        const [result] = await db.query(
            `UPDATE companies SET ${fields.join(', ')} WHERE id = ?`,
            values
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM companies WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Company;

