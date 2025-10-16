const db = require('../config/database');

class Candidate {
    static async create(userId, firstName, lastName, phone = null) {
        const [result] = await db.query(
            'INSERT INTO candidates (user_id, first_name, last_name, phone) VALUES (?, ?, ?, ?)',
            [userId, firstName, lastName, phone]
        );
        return result.insertId;
    }

    static async findById(id) {
        const [rows] = await db.query(`
            SELECT c.*, u.email, u.role, u.created_at as user_created_at
            FROM candidates c
            JOIN users u ON c.user_id = u.id
            WHERE c.id = ?
        `, [id]);
        return rows[0];
    }

    static async findByUserId(userId) {
        const [rows] = await db.query('SELECT * FROM candidates WHERE user_id = ?', [userId]);
        return rows[0];
    }

    static async getAll(limit, offset) {
        const [rows] = await db.query(`
            SELECT c.*, u.email
            FROM candidates c
            JOIN users u ON c.user_id = u.id
            LIMIT ? OFFSET ?
        `, [limit, offset]);
        return rows;
    }

    static async count() {
        const [rows] = await db.query('SELECT COUNT(*) as total FROM candidates');
        return rows[0].total;
    }

    static async update(id, data) {
        const fields = [];
        const values = [];

        if (data.first_name) {
            fields.push('first_name = ?');
            values.push(data.first_name);
        }
        if (data.last_name) {
            fields.push('last_name = ?');
            values.push(data.last_name);
        }
        if (data.phone !== undefined) {
            fields.push('phone = ?');
            values.push(data.phone);
        }
        if (data.cv_url !== undefined) {
            fields.push('cv_url = ?');
            values.push(data.cv_url);
        }
        if (data.linkedin_url !== undefined) {
            fields.push('linkedin_url = ?');
            values.push(data.linkedin_url);
        }

        values.push(id);

        const [result] = await db.query(
            `UPDATE candidates SET ${fields.join(', ')} WHERE id = ?`,
            values
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM candidates WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Candidate;

